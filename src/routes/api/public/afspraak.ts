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
          } = body ?? {};

          if (!naam || !email || !telefoon || !repair) {
            return new Response(JSON.stringify({ error: "missing_fields" }), {
              status: 400,
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

          const html = `
            <h2>Nieuwe reparatie-afspraak</h2>
            <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
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

          const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": RESEND_API_KEY,
            },
            body: JSON.stringify({
              from: "Telefoon Wereld Haarlem <onboarding@resend.dev>",
              to: ["wietsevanos@gmail.com"],
              reply_to: email,
              subject: `Nieuwe afspraak: ${repair} — ${brand} ${model}`.trim(),
              html,
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("resend error", res.status, text);
            return new Response(JSON.stringify({ error: "send_failed" }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...CORS },
            });
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