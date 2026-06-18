import { createFileRoute } from "@tanstack/react-router";

function fold(line: string) {
  // ICS lines mogen max 75 octets zijn; simpele wrap
  const out: string[] = [];
  let s = line;
  while (s.length > 73) {
    out.push(s.slice(0, 73));
    s = " " + s.slice(73);
  }
  out.push(s);
  return out.join("\r\n");
}

function escText(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export const Route = createFileRoute("/api/public/afspraak/ics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const title = url.searchParams.get("title") || "Reparatie-afspraak";
        const details = url.searchParams.get("details") || "";
        const location = url.searchParams.get("location") || "Telefoon Wereld Haarlem";
        const start = url.searchParams.get("start");
        const end = url.searchParams.get("end");

        if (!start || !end) {
          return new Response("Missing start/end", { status: 400 });
        }

        const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@telefoonwereldhaarlem`;
        const dtstamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

        const ics = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Telefoon Wereld Haarlem//Afspraak//NL",
          "CALSCALE:GREGORIAN",
          "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          fold(`UID:${uid}`),
          fold(`DTSTAMP:${dtstamp}`),
          fold(`DTSTART:${start}`),
          fold(`DTEND:${end}`),
          fold(`SUMMARY:${escText(title)}`),
          fold(`DESCRIPTION:${escText(details)}`),
          fold(`LOCATION:${escText(location)}`),
          "STATUS:TENTATIVE",
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\r\n");

        return new Response(ics, {
          status: 200,
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="afspraak.ics"',
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});