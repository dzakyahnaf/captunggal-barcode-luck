-- =============================================
-- Migration: Add qr_scans table to track page visits
-- =============================================

CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_qr_scans_created_at ON qr_scans(created_at);

ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;
