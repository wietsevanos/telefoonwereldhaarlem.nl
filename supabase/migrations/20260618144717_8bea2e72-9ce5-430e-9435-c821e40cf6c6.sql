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

CREATE INDEX bookings_slot_at_idx ON public.bookings (slot_at);

GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Geen client-side policies: alleen service_role (backend) mag erbij.
-- De publieke /api/public/slots route gebruikt service_role en geeft alleen tijdstippen terug.