"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Instagram, Coffee, Gift, Ticket, ChevronRight } from "lucide-react";

function ResultContent() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "https://www.instagram.com/captunggal/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className="relative min-h-[100dvh] overflow-x-hidden flex flex-col items-center justify-center p-6"
      style={{
        background: "linear-gradient(160deg, #075629 0%, #054d23 40%, #043d1c 70%, #075629 100%)",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-0 -left-20 w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(7,86,41,0.5), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 -right-20 w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(38,162,49,0.4), transparent)",
        }}
      />

      {/* Content wrapper */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center animate-fade-in-up md:h-full"
        style={{ maxWidth: "400px", gap: "1.25rem" }}
      >
        {/* Header Icon */}
        {/* <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            marginBottom: "-0.5rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🎉</span>
        </div> */}

        {/* Title */}
        <div
          className="text-center"
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <h1
            className="font-heading"
            style={{
              color: "#FFFFFF",
              fontSize: "3.0rem",
              lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Berhasil Terdaftar!
          </h1>
          <p className="font-heading" style={{ color: "rgba(255,255,255,0.8)", fontSize: "2.0rem" }}>
            Hadiah yang bisa kamu dapatkan:
          </p>
        </div>

        {/* Prizes Card */}
        <div
          className="glass-card-strong w-full"
          style={{
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#F2F2F2",
                padding: "0.4rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Coffee size={20} />
            </div>
            <div>
              <p
                style={{
                  color: "#F2F2F2",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                }}
              >
                Menangkan EMAS GRATIS
              </p>
              {/* <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.75rem",
                  marginTop: "0.125rem",
                }}
              >
                Enjoy your everyday ritual with us
              </p> */}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              width: "100%",
            }}
          />

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#F2F2F2",
                padding: "0.4rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Gift size={20} />
            </div>
            <div>
              <p
                style={{
                  color: "#F2F2F2",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                }}
              >
                Ratusan Merchandise CAP TUNGGAL
              </p>
              {/* <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.75rem",
                  marginTop: "0.125rem",
                }}
              >
                Exclusive Cap Tunggal merchandise
              </p> */}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              width: "100%",
            }}
          />

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#F2F2F2",
                padding: "0.4rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Ticket size={20} />
            </div>
            <div>
              <p
                style={{
                  color: "#F2F2F2",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                }}
              >
                Voucher Eksklusif CAP TUNGGAL
              </p>
              {/* <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.75rem",
                  marginTop: "0.125rem",
                }}
              >
                Special discount for your next visit
              </p> */}
            </div>
          </div>
        </div>

        {/* Syarat dan Ketentuan */}
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.75rem",
            fontStyle: "italic",
            textAlign: "center",
            width: "100%",
          }}
        >
          *Syarat dan Ketentuan Berlaku
        </p>

        {/* Announcement Info */}
        <div
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.875rem",
            padding: "1rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            Pantengin terus Instagram{" "}
            <strong style={{ color: "#F2F2F2" }}>@captunggal</strong> ,
            pemenang akan diundi 1 minggu sebelum Grand Opening
          </p>
        </div>

        {/* Action Button */}
        <a
          href="https://www.instagram.com/captunggal/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.875rem 1.5rem",
            borderRadius: "0.75rem",
            fontSize: "0.95rem",
            fontWeight: 800,
            background: "#FFFFFF",
            color: "#075629",
            boxShadow: "0 4px 15px rgba(255,255,255,0.25)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          className="hover-scale"
        >
          <Instagram size={18} />
          <span>Ke Instagram ({countdown}s)</span>
          <ChevronRight size={18} style={{ marginLeft: "auto" }} />
        </a>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
