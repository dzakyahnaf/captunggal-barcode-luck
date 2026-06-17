"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, ChevronRight, Instagram, ChevronDown } from "lucide-react";
import Image from "next/image";

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 448 512" 
    height={size} 
    width={size} 
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
  </svg>
);

interface SpinResult {
  won: boolean;
  code?: string;
  redirectUrl?: string;
  error?: string;
  alreadyPlayed?: boolean;
  scanOrder?: number;
}

export default function HomePage() {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [scanCount, setScanCount] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/scan-count", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setScanCount(data.count))
      .catch(() => {});
  }, []);

  const validatePhone = (p: string) => {
    const cleaned = p.replace(/\D/g, "");
    return cleaned.length >= 9 && cleaned.length <= 15;
  };

  const scrollToNext = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSpin = async () => {
    setError("");
    if (!validatePhone(phone)) {
      setError("Masukkan nomor WhatsApp yang valid (min. 9 digit).");
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, instagram, tiktok, phone }),
      });

      const data: SpinResult = await res.json();

      if (!res.ok) {
        if (data.alreadyPlayed) {
          setAlreadyPlayed(true);
          return;
        }
        setError(data.error || "Terjadi kesalahan. Coba lagi.");
        return;
      }

      if (data.won && data.code) {
        window.location.href = `/result?won=true&code=${data.code}&scanOrder=${data.scanOrder || ""}`;
      } else {
        // API already returns a full path like /result?won=false&redirect=..., just append scanOrder
        const url = data.redirectUrl || `/result?won=false&redirect=${encodeURIComponent("https://www.instagram.com/captunggal/")}`;
        window.location.href = `${url}&scanOrder=${data.scanOrder || ""}`;
      }
    } catch {
      setError("Koneksi gagal. Periksa internet dan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSpin();
  };

  return (
    <main
      className="relative h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      style={{
        background: "linear-gradient(160deg, #075629 0%, #054d23 40%, #043d1c 70%, #075629 100%)",
        scrollBehavior: "smooth",
      }}
    >
      {/* Background texture (Fixed to not scroll) */}
      <div className="fixed inset-0 bg-dots opacity-30 pointer-events-none" />

      {/* Subtle vignette (Fixed) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Decorative light blobs (Fixed) */}
      <div
        className="fixed top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(7,86,41,0.45), transparent)",
        }}
      />
      <div
        className="fixed bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(38,162,49,0.3), transparent)",
        }}
      />

      {/* ==================================================== */}
      {/* SECTION 1: Logo & Rules */}
      {/* ==================================================== */}
      <section className="relative z-10 w-full min-h-[100dvh] snap-start flex flex-col items-center justify-center p-6 animate-fade-in-up">
        <div
          style={{
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "0 1.5rem",
          }}
        >
          {/* ===== LOGO ===== */}
          <div style={{ marginBottom: "0.25rem" }}>
            <Image
              src="/images/logo-cap-tunggal.png"
              alt="Cap Tunggal"
              width={120}
              height={120}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ===== TAGLINE ===== */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: 500,
                lineHeight: 1.4,
                marginBottom: "0.25rem",
              }}
            >
              Minyak Gosok Tradisional <br /> Warisan Indonesia
            </p>
            {scanCount !== null && scanCount > 0 && (
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  textShadow: "0 0 10px rgba(38,162,49,0.3)",
                  margin: "2.5rem 0 4rem",
                }}
              >
                <span style={{ fontWeight: 700 }}>CONGRATULATIONS! </span>
                KAMU ADALAH ORANG KE-
                {scanCount.toLocaleString("id-ID")} YANG SUDAH SCAN QR INI.
              </p>
            )}
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "1.15rem",
                fontWeight: 400,
              }}
            >
              Menangkan{" "}
              <span
                style={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                EMAS GRATIS
              </span>{" "}
              dari Minyak Gosok Cap Tunggal!
            </p>
          </div>

          {/* ===== RULES ===== */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "0.875rem",
              padding: "1.25rem 1.5rem",
              width: "100%",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
              }}
            >
              Syarat:
            </p>
            <ol
              style={{
                color: "#333333",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                paddingLeft: "1.25rem",
                listStyleType: "decimal",
                margin: 0,
              }}
            >
              <li>
                Follow Instagram{" "}
                <strong style={{ color: "#1a1a1a" }}>@captunggal</strong> dan TikTok{" "}
                <strong style={{ color: "#1a1a1a" }}>@minyakgosokcaptunggal</strong>
              </li>
              <li>
                Masukkan nama lengkap, username Instagram, username TikTok dan nomor WhatsApp
                aktif untuk ikut berpartisipasi.
              </li>
              <li>Tunggu pengumuman pemenang di Instagram @captunggal dan TikTok @minyakgosokcaptunggal.</li>
            </ol>
          </div>

          {/* SCROLL DOWN INDICATOR */}
          <div
            onClick={scrollToNext}
            className="mt-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 15px rgba(255,255,255,0.3)",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Scroll ke bawah
            </span>
            <div
              className="animate-bounce"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
              }}
            >
              <ChevronDown size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 2: Form & CTA */}
      {/* ==================================================== */}
      <section
        ref={section2Ref}
        className="relative z-10 w-full min-h-[100dvh] snap-start flex flex-col items-center justify-center p-6"
      >
        <div
          style={{
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "0 1.5rem",
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "1.5rem",
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            {alreadyPlayed ? (
              <>
                Oops! Kamu sudah
                <br />
                <span
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 0 20px rgba(255,255,255,0.4)",
                  }}
                >
                  berpartisipasi.
                </span>
              </>
            ) : (
              <>
                Coba Keberuntunganmu,
                <br />
                <span
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 0 20px rgba(255,255,255,0.4)",
                  }}
                >
                  EMAS GRATIS Menunggu!
                </span>
              </>
            )}
          </h2>

          {/* ===== FORM CARD ===== */}
          <div
            className="glass-card-strong flex flex-col"
            style={{
              width: "100%",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              gap: "1.25rem",
            }}
          >
            {alreadyPlayed ? (
              <AlreadyPlayedState />
            ) : (
              <>
                {/* CTAs Wrapper */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                  {/* Instagram CTA */}
                  <a
                    href="https://www.instagram.com/captunggal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-scale"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.625rem",
                      width: "100%",
                      padding: "1rem 1.5rem",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #833ab4, #e1306c, #f56040)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(225,48,108,0.3)",
                      textDecoration: "none",
                      textAlign: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <Instagram size={20} />
                    <span>Follow @captunggal</span>
                  </a>

                  {/* TikTok CTA */}
                  <a
                    href="https://www.tiktok.com/@minyakgosokcaptunggal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-scale"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.625rem",
                      width: "100%",
                      padding: "1rem 1.5rem",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      background: "#000000",
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 242, 234, 0.15), 0 0 10px rgba(254, 44, 85, 0.15)",
                      textDecoration: "none",
                      textAlign: "center",
                      transition: "transform 0.2s",
                    }}
                  >
                    <TiktokIcon size={20} />
                    <span>Follow @minyakgosokcaptunggal</span>
                  </a>
                </div>

                {/* Input section wrapper */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Name input */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      htmlFor="name-input"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      className="input-field"
                      placeholder="Masukkan nama kamu"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={isLoading}
                      autoComplete="name"
                    />
                  </div>

                  {/* Instagram username input */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      htmlFor="instagram-input"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Username Instagram
                    </label>
                    <input
                      id="instagram-input"
                      type="text"
                      className="input-field"
                      placeholder="Contoh: @captunggal"
                      value={instagram}
                      onChange={(e) => {
                        setInstagram(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </div>

                  {/* TikTok username input */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      htmlFor="tiktok-input"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Username TikTok
                    </label>
                    <input
                      id="tiktok-input"
                      type="text"
                      className="input-field"
                      placeholder="Contoh: @minyakgosokcaptunggal"
                      value={tiktok}
                      onChange={(e) => {
                        setTiktok(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </div>

                  {/* Phone input */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      htmlFor="phone-input"
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Nomor WhatsApp
                    </label>
                    <input
                      ref={inputRef}
                      id="phone-input"
                      type="tel"
                      inputMode="numeric"
                      className="input-field"
                      placeholder="Contoh: 081234567890"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (error) setError("");
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      maxLength={16}
                      autoComplete="tel"
                    />
                    {error && (
                      <p
                        style={{
                          color: "#fca5a5",
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <span>⚠</span> {error}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="spin-btn"
                  onClick={handleSpin}
                  disabled={
                    isLoading ||
                    !phone.trim() ||
                    !name.trim() ||
                    !instagram.trim()
                  }
                  className="hover-scale"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "1rem 1.5rem",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: 800,
                    background: "#FFFFFF",
                    color: "#075629",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity:
                      !phone.trim() ||
                      !name.trim() ||
                      !instagram.trim() ||
                      isLoading
                        ? 0.6
                        : 1,
                    boxShadow: "0 4px 15px rgba(255,255,255,0.25)",
                    transition: "all 0.2s",
                    border: "none",
                  }}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="spinner"
                        style={{
                          width: "1.25rem",
                          height: "1.25rem",
                          borderWidth: "2px",
                          borderColor: "#075629",
                          borderRightColor: "transparent",
                        }}
                      />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Now</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* ===== BE PART OF IT ===== */}
          {/* <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8rem",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            Be part of it
          </p> */}
        </div>
      </section>
    </main>
  );
}

function AlreadyPlayedState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.875rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        ⏰
      </div>
      <div>
        <h2 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700 }}>
          Setiap nomor hanya memiliki 1 kesempatan untuk mengikuti undian.
        </h2>
        <p
          style={{
            color: "#FFFFFF",
            fontSize: "0.875rem",
            marginTop: "0.75rem",
            lineHeight: 1.5,
          }}
        >
          Pantengin terus Instagram{" "}
          <strong style={{ color: "#FFFFFF" }}>@captunggal</strong> , pemenang
          akan diundi 1 minggu sebelum Grand Opening{" "}
        </p>
      </div>
      <a
        href="https://www.instagram.com/captunggal/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-scale"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          background: "linear-gradient(135deg, #833ab4, #e1306c)",
          color: "#fff",
          boxShadow: "0 4px 24px rgba(225,48,108,0.3)",
          textDecoration: "none",
          transition: "transform 0.2s",
        }}
      >
        <Instagram size={16} />
        <span>Follow @captunggal</span>
      </a>
    </div>
  );
}
