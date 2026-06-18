// Edge Function: send-afspraak
// Roept Resend aan (via Lovable connector gateway) om twee mails te sturen:
//   1) notificatie naar de winkel
//   2) bevestiging naar de klant met agenda-knoppen
//
// De daadwerkelijke booking is al door de browser in de bookings-tabel
// gezet (uniciteit op slot_at voorkomt dubbele boekingen). Deze functie
// hoeft alleen mails te versturen.

// deno-lint-ignore-file no-explicit-any

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOP_EMAIL = "wietsevanos@gmail.com";
const FROM_ADDRESS = "Telefoon Wereld Haarlem <onboarding@resend.dev>";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildGoogleLink(start: Date, title: string, details: string, location: string): string {
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const dates = `${toICSDate(start)}/${toICSDate(end)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

function buildICS(start: Date, title: string, details: string, location: string): string {
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const uid = `${toICSDate(start)}-${Math.random().toString(36).slice(2, 10)}@telefoonwereldhaarlem`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Telefoon Wereld Haarlem//Afspraak//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${title.replace(/\n/g, " ")}`,
    `DESCRIPTION:${details.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }

  try {
    const body = await req.json();
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
    if (isNaN(slotDate.getTime())) {
      return new Response(JSON.stringify({ error: "invalid_slot" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...CORS },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("missing email credentials");
      return new Response(JSON.stringify({ error: "email_not_configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS },
      });
    }

    const slotLabel = slotDate.toLocaleString("nl-NL", {
      weekday: "long", day: "numeric", month: "long",
      hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam",
    });

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

    // 1) Notificatie naar de winkel
    const shopHtml = `
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
      </table>`;

    const shopRes = await sendEmail({
      from: FROM_ADDRESS,
      to: [SHOP_EMAIL],
      reply_to: email,
      subject: `Nieuwe afspraak: ${repair} — ${brand} ${model}`.trim(),
      html: shopHtml,
    });
    if (!shopRes.ok) {
      const text = await shopRes.text();
      console.error("resend shop error", shopRes.status, text);
      return new Response(JSON.stringify({ error: "send_failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...CORS },
      });
    }

    // 2) Bevestiging naar de klant met agenda-links
    const firstName = String(naam).split(" ")[0] || "klant";
    const location = "Telefoon Wereld Haarlem, Generaal Cronjéstraat, Haarlem";
    const calTitle = `Reparatie-afspraak: ${repair} (${brand} ${model})`.trim();
    const calDetails = `Reparatie-afspraak bij Telefoon Wereld Haarlem.\n\nApparaat: ${device}\nMerk: ${brand}\nModel: ${model}\nReparatie: ${repair}${price ? `\nIndicatieve prijs: ${price}` : ""}`;
    const googleUrl = buildGoogleLink(slotDate, calTitle, calDetails, location);
    const icsContent = buildICS(slotDate, calTitle, calDetails, location);
    const icsDataUri = `data:text/calendar;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(icsContent)))}`;

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
          <a href="${googleUrl}" style="display:inline-block;background:#1a73e8;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;margin:4px 6px 4px 0">Toevoegen aan Google Agenda</a>
        </p>
        <p style="margin-top:24px">Heeft u tussentijds een vraag? Bel ons gerust op <a href="tel:+31235517048">023 551 7048</a>.</p>
        <p style="margin-top:24px;color:#666;font-size:13px">Met vriendelijke groet,<br/>Telefoon Wereld Haarlem</p>
      </div>`;

    const confirmRes = await sendEmail({
      from: FROM_ADDRESS,
      to: [email],
      reply_to: SHOP_EMAIL,
      subject: "Bevestiging van uw reparatie-aanvraag — Telefoon Wereld Haarlem",
      html: confirmHtml,
    });
    if (!confirmRes.ok) {
      console.error("resend confirmation error", confirmRes.status, await confirmRes.text());
      // niet-fataal: winkel-mail is al verstuurd
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  } catch (e: any) {
    console.error("send-afspraak error", e?.message ?? e);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }
});