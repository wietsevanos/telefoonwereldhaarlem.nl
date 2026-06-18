import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/slots")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const from = url.searchParams.get("from");
          const to = url.searchParams.get("to");
          if (!from || !to) {
            return new Response(JSON.stringify({ error: "missing_range" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin
            .from("bookings")
            .select("slot_at")
            .gte("slot_at", from)
            .lte("slot_at", to);
          if (error) {
            console.error("slots query error", error);
            return new Response(JSON.stringify({ error: "query_failed" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }
          return new Response(
            JSON.stringify({ taken: (data ?? []).map((r) => r.slot_at) }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
                ...CORS,
              },
            },
          );
        } catch (e) {
          console.error("slots handler error", e);
          return new Response(JSON.stringify({ error: "server_error" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }
      },
    },
  },
});