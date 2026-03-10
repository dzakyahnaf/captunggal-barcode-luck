import React from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeGenerator() {
  // Masukkan link yang ingin diubah menjadi QR Code
  const qrData = "http://rakkencoffee.com/";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        Scan untuk ke Rakken Coffee
      </h2>
      
      {/* Container QR Code dengan background putih agar selalu bisa di-scan meskipun di dark mode */}
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%", padding: "16px", backgroundColor: "white", borderRadius: "8px" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrData}
          viewBox={`0 0 256 256`}
        />
      </div>
      
      <p style={{ marginTop: '16px', color: 'gray' }}>
        {qrData}
      </p>
    </div>
  );
}
