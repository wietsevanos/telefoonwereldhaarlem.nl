import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildCalendarLinks(opts: {
  origin: string;
  start: Date;
  title: string;
  details: string;
}) {
  const start = opts.start;
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const location = "Telefoon Wereld Haarlem, Generaal Cronjéstraat, Haarlem";
  const dates = `${toICSDate(start)}/${toICSDate(end)}`;
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(opts.title)}&dates=${dates}&details=${encodeURIComponent(opts.details)}&location=${encodeURIComponent(location)}`;
  const ics = `${opts.origin}/api/public/afspraak/ics?title=${encodeURIComponent(opts.title)}&details=${encodeURIComponent(opts.details)}&start=${toICSDate(start)}&end=${toICSDate(end)}&location=${encodeURIComponent(location)}`;
  return { google, ics };
}

export const Route = createFileRoute("/api/public/afspraak")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            device = "",
            brand = "",
            model = "",
            repair = "",
            price = "",
            naam = "",
            email = "",
            telefoon = "",
            opmerking = "",
            slot_at = "",
          } = body ?? {};

          if (!naam || !email || !telefoon || !repair || !slot_at) {
            return new Response(JSON.stringify({ error: "missing_fields" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          const slotDate = new Date(slot_at);
          if (isNaN(slotDate.getTime()) || slotDate.getTime() < Date.now() - 60_000) {
            return new Response(JSON.stringify({ error: "invalid_slot" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          // Probeer het tijdslot vast te leggen — uniciteit voorkomt dubbele boekingen.
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error: insertError } = await supabaseAdmin.from("bookings").insert({
            slot_at: slotDate.toISOString(),
            naam,
            email,
            telefoon,
            apparaat: device,
            merk: brand,
            model,
            reparatie: repair,
            prijs: price,
            opmerking,
          });
          if (insertError) {
            const code = (insertError as { code?: string }).code;
            if (code === "23505") {
              return new Response(JSON.stringify({ error: "slot_taken" }), {
                status: 409,
                headers: { "Content-Type": "application/json", ...CORS },
              });
            }
            console.error("booking insert error", insertError);
            return new Response(JSON.stringify({ error: "booking_failed" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
            return new Response(JSON.stringify({ error: "email_not_configured" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          const slotLabel = slotDate.toLocaleString("nl-NL", {
            weekday: "long", day: "numeric", month: "long",
            hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam",
          });

          const html = `
            <h2>Nieuwe reparatie-afspraak</h2>
            <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
              <tr><td><b>Datum & tijd</b></td><td>${esc(slotLabel)}</td></tr>
              <tr><td><b>Naam</b></td><td>${esc(naam)}</td></tr>
              <tr><td><b>E-mail</b></td><td>${esc(email)}</td></tr>
              <tr><td><b>Telefoon</b></td><td>${esc(telefoon)}</td></tr>
              <tr><td><b>Apparaat</b></td><td>${esc(device)}</td></tr>
              <tr><td><b>Merk</b></td><td>${esc(brand)}</td></tr>
              <tr><td><b>Model</b></td><td>${esc(model)}</td></tr>
              <tr><td><b>Reparatie</b></td><td>${esc(repair)}</td></tr>
              <tr><td><b>Indicatieve prijs</b></td><td>${esc(price)}</td></tr>
              <tr><td valign="top"><b>Opmerking</b></td><td>${esc(opmerking).replace(/\n/g, "<br/>")}</td></tr>
            </table>
          `;

          const sendEmail = (payload: Record<string, unknown>) =>
            fetch("https://connector-gateway.lovable.dev/resend/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "X-Connection-Api-Key": RESEND_API_KEY,
              },
              body: JSON.stringify(payload),
            });

          const res = await sendEmail({
            from: "Telefoon Wereld Haarlem <onboarding@resend.dev>",
            to: ["wietsevanos@gmail.com"],
            reply_to: email,
            subject: `Nieuwe afspraak: ${repair} — ${brand} ${model}`.trim(),
            html,
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("resend error", res.status, text);
            return new Response(JSON.stringify({ error: "send_failed" }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }

          // Bevestigingsmail naar de klant (mag falen zonder de hele aanvraag te breken)
          const firstName = String(naam).split(" ")[0] || "klant";
          const origin = new URL(request.url).origin;
          const calTitle = `Reparatie-afspraak: ${repair} (${brand} ${model})`.trim();
          const calDetails = `Reparatie-afspraak bij Telefoon Wereld Haarlem.\n\nApparaat: ${device}\nMerk: ${brand}\nModel: ${model}\nReparatie: ${repair}${price ? `\nIndicatieve prijs: ${price}` : ""}`;
          const cal = buildCalendarLinks({ origin, start: slotDate, title: calTitle, details: calDetails });

          const confirmHtml = `
            <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:560px;margin:0 auto;padding:24px">
              <h2 style="margin:0 0 12px">Bedankt voor uw aanvraag, ${esc(firstName)}!</h2>
              <p>Uw afspraak is ingepland op <b>${esc(slotLabel)}</b>. We zien u graag in de winkel; bij vragen of wijzigingen kunt u altijd even bellen.</p>
              <h3 style="margin:24px 0 8px;font-size:15px">Uw aanvraag</h3>
              <table cellpadding="6" style="font-size:14px;border-collapse:collapse">
                <tr><td><b>Datum & tijd</b></td><td>${esc(slotLabel)}</td></tr>
                <tr><td><b>Apparaat</b></td><td>${esc(device)}</td></tr>
                <tr><td><b>Merk</b></td><td>${esc(brand)}</td></tr>
                <tr><td><b>Model</b></td><td>${esc(model)}</td></tr>
                <tr><td><b>Reparatie</b></td><td>${esc(repair)}</td></tr>
                ${price ? `<tr><td><b>Indicatieve prijs</b></td><td>${esc(price)}</td></tr>` : ""}
                ${opmerking ? `<tr><td valign="top"><b>Opmerking</b></td><td>${esc(opmerking).replace(/\n/g, "<br/>")}</td></tr>` : ""}
              </table>
              <h3 style="margin:28px 0 8px;font-size:15px">Zet vast in uw agenda</h3>
              <p style="margin:0">
                <a href="${cal.google}" style="display:inline-block;background:#1a73e8;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;margin:4px 6px 4px 0">Toevoegen aan Google Agenda</a>
                <a href="${cal.ics}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;margin:4px 0">Apple / Outlook (.ics)</a>
              </p>
              <p style="margin-top:24px">Heeft u tussentijds een vraag? Bel ons gerust op <a href="tel:+31235517048">023 551 7048</a>.</p>
              <p style="margin-top:24px;color:#666;font-size:13px">Met vriendelijke groet,<br/>Telefoon Wereld Haarlem</p>
            </div>
          `;

          const confirmRes = await sendEmail({
            from: "Telefoon Wereld Haarlem <onboarding@resend.dev>",
            to: [email],
            reply_to: "wietsevanos@gmail.com",
            subject: "Bevestiging van uw reparatie-aanvraag — Telefoon Wereld Haarlem",
            html: confirmHtml,
          });
          if (!confirmRes.ok) {
            console.error("resend confirmation error", confirmRes.status, await confirmRes.text());
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        } catch (e) {
          console.error("afspraak handler error", e);
          return new Response(JSON.stringify({ error: "server_error" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }
      },
    },
  },
});
