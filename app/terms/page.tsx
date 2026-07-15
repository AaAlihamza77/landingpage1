"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div style={{ background: "#0B0D19", color: "#EDE8F5", minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        
        {/* Back to Home Link */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7091E6", textDecoration: "none", fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> BACK TO HOME
          </Link>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3rem)", color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Terms & Conditions</h1>
        <p style={{ color: "#8697C4", fontSize: 13, fontFamily: "monospace", marginBottom: 48 }}>Last Updated: July 15, 2026</p>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 15, lineHeight: 1.7, color: "#ADBBDA" }}>
          
          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>1. Agreement to Terms</h2>
            <p>By accessing or using the AutoXverse website and services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>2. Scope of Services</h2>
            <p>AutoXverse provides a patient journey operating system featuring automated WhatsApp notifications, Google review growth, and lead capture templates. We offer estimate calculations via our ROI tools for directional planning, which do not constitute guaranteed financial outcomes.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>3. User Conduct & Clinic Responsibility</h2>
            <p>Clinics are solely responsible for verifying the accuracy of the messages and patient consents collected through our tools. You agree to utilize the platform in compliance with local marketing laws (including GDPR and PECR regulations).</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>4. Limitation of Liability</h2>
            <p>AutoXverse shall not be held liable for any indirect, incidental, or consequential damages resulting from connection drops in third-party APIs (Stripe, WhatsApp, Google Reviews) or software integrations.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>5. Contact and Queries</h2>
            <p>If you have any questions or require support regarding our services, please email us at <a href="mailto:info@autoxverse.com" style={{ color: "#7091E6", textDecoration: "none" }}>info@autoxverse.com</a>.</p>
          </section>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, textAlign: "center", fontSize: 12, color: "#8697C4" }}>
          &copy; 2025 AutoXverse. All rights reserved.
        </div>

      </div>
    </div>
  );
}
