-- =============================================
-- Migration: Add instagram column to scan_entries
-- =============================================

ALTER TABLE scan_entries ADD COLUMN IF NOT EXISTS instagram TEXT;
