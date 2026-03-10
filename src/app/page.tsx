"use client";

import { useState, useRef, useEffect } from "react";
import { Smartphone, ChevronRight, Instagram, ChevronDown } from "lucide-react";
import Image from "next/image";

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
        body: JSON.stringify({ name, phone }),
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
        window.location.href = `/result?won=false&redirect=${encodeURIComponent(data.redirectUrl || "https://instagram.com/rakkencoffee")}&scanOrder=${data.scanOrder || ""}`;
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
        background:
          "linear-gradient(180deg, #7a0e15 0%, #A8131E 40%, #B5161F 70%, #c41d28 100%)",
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
            "radial-gradient(circle, rgba(200,30,40,0.35), transparent)",
        }}
      />
      <div
        className="fixed bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,19,30,0.3), transparent)",
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
          <div style={{ marginBottom: "1.75rem" }}>
            <Image
              src="/images/logo-rakken.png"
              alt="Rakken Coffee"
              width={340}
              height={340}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ===== TAGLINE ===== */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p
              style={{
                color: "#F2F2F2",
                fontSize: "1.1rem",
                fontWeight: 700,
                lineHeight: 1.4,
                marginBottom: "0.25rem",
              }}
            >
              Your New Everyday Ritual in Sips and Bites
            </p>
            {scanCount !== null && scanCount > 0 && (
              <p
                style={{
                  color: "#fde68a",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textShadow: "0 0 10px rgba(252,211,77,0.3)",
                  margin: "0.5rem 0",
                }}
              >
                🎉 Sudah {scanCount.toLocaleString("id-ID")} orang yang scan QR
                ini!
              </p>
            )}
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.95rem",
                fontWeight: 400,
              }}
            >
              Menangkan Free Coffee selama 1 Tahun!
            </p>
          </div>

          {/* ===== RULES ===== */}
          <div
            style={{
              background: "rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.875rem",
              padding: "1.25rem 1.5rem",
              width: "100%",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#F2F2F2",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
              }}
            >
              Syarat:
            </p>
            <ol
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                paddingLeft: "1.25rem",
                listStyleType: "decimal",
                margin: 0,
              }}
            >
              <li>
                Follow Instagram{" "}
                <strong style={{ color: "#F2F2F2" }}>@rakkencoffee</strong>{" "}
                sebagai syarat untuk berkesempatan memenangkan Free Coffee for a
                Year.
              </li>
              <li>
                Masukkan nama dan nomor WhatsApp aktif untuk ikut
                berpartisipasi.
              </li>
              <li>Tunggu pengumuman pemenang di Instagram @rakkencoffee.</li>
            </ol>
          </div>

          {/* SCROLL DOWN INDICATOR */}
          <div
            onClick={scrollToNext}
            className="mt-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              color: "#fde68a",
              textShadow: "0 0 15px rgba(252,211,77,0.6)",
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
              Scroll kebawah
            </span>
            <div
              className="animate-bounce"
              style={{ filter: "drop-shadow(0 0 8px rgba(252, 211, 77, 0.8))" }}
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
            Coba Keberuntunganmu
            <br />
            <span
              style={{
                color: "#fde68a",
                textShadow: "0 0 20px rgba(252,211,77,0.4)",
              }}
            >
              Sekarang!
            </span>
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
                        color: "rgba(255,255,255,0.75)",
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
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Smartphone size={15} style={{ color: "#F2F2F2" }} />
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
                  disabled={isLoading || !phone.trim() || !name.trim()}
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
                    color: "#A8131E",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity:
                      !phone.trim() || !name.trim() || isLoading ? 0.6 : 1,
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
                          borderColor: "#A8131E",
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

                {/* Instagram CTA */}
                <a
                  href="https://instagram.com/rakkencoffee"
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
                  <span>Follow @rakkencoffee</span>
                </a>
              </>
            )}
          </div>

          {/* ===== WINNER ANNOUNCEMENT ===== */}
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.875rem",
              padding: "1rem",
              textAlign: "center",
              width: "100%",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#fde68a",
                fontSize: "0.85rem",
                fontWeight: 600,
                textShadow: "0 0 15px rgba(252,211,77,0.3)",
              }}
            >
              🏆 Gratis Kopi Setahun Menunggu.
            </p>
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
        <h2 style={{ color: "#F2F2F2", fontSize: "1.125rem", fontWeight: 700 }}>
          Sudah Berpartisipasi
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
            lineHeight: 1.5,
          }}
        >
          Nomor ini sudah pernah mengikuti undian.
          <br />
          Satu nomor,{" "}
          <strong style={{ color: "#F2F2F2" }}>satu kesempatan</strong>.
        </p>
      </div>
      <a
        href="https://instagram.com/rakkencoffee"
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
        <span>Follow @rakkencoffee</span>
      </a>
    </div>
  );
}
