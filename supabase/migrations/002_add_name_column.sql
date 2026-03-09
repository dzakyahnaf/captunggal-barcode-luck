-- =============================================
-- Migration: Add name column to scan_entries
-- =============================================

ALTER TABLE scan_entries ADD COLUMN IF NOT EXISTS name TEXT;
