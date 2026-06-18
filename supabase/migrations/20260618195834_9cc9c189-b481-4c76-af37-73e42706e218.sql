
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_at TIMESTAMPTZ NOT NULL UNIQUE,
  naam TEXT NOT NULL,
  email TEXT NOT NULL,
  telefoon TEXT NOT NULL,
  apparaat TEXT,
  merk TEXT,
  model TEXT,
  reparatie TEXT NOT NULL,
  prijs TEXT,
  opmerking TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Service role: volledige toegang voor admin/edge function gebruik
GRANT ALL ON public.bookings TO service_role;

-- Anon: mag INSERT (afspraak maken) en alleen kolom slot_at lezen (bezette tijden)
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT (slot_at) ON public.bookings TO anon;

-- Authenticated: zelfde minimale toegang als anon (geen ingelogde gebruikers in deze app)
GRANT INSERT ON public.bookings TO authenticated;
GRANT SELECT (slot_at) ON public.bookings TO authenticated;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Iedereen mag bezette tijdstippen lezen (kolom-rechten beperken tot slot_at)
CREATE POLICY "Anyone can read slots"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Iedereen mag een afspraak maken voor een toekomstig tijdstip
CREATE POLICY "Anyone can create future bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    slot_at > now()
    AND length(naam) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(telefoon) BETWEEN 1 AND 50
    AND length(reparatie) BETWEEN 1 AND 200
  );

CREATE INDEX bookings_slot_at_idx ON public.bookings (slot_at);
