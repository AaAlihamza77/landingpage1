"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3rem)", color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Privacy Policy</h1>
        <p style={{ color: "#8697C4", fontSize: 13, fontFamily: "monospace", marginBottom: 48 }}>Last Updated: July 15, 2026</p>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 15, lineHeight: 1.7, color: "#ADBBDA" }}>
          
          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>1. Information We Collect</h2>
            <p>We collect information directly from you when you request a consultation, input details into our ROI calculator, or correspond with us via email or WhatsApp. This may include your name, email address, phone number, clinic details, and average treatment values.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>2. How We Use Your Information</h2>
            <p>Your details are processed to customize your patient journey demonstration, calculate potential clinic revenue recovery, deliver automated notification tests, and improve our services. We do not sell or lease your personal data to third parties.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>3. Integration & Third-Party Platforms</h2>
            <p>Our platform connects with third-party software (such as WhatsApp Business API, Stripe, and Google Reviews) to execute automated workflows. All data transit is encrypted in accordance with industry security standards and GDPR guidelines.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>4. Cookies and Analytics</h2>
            <p>We use essential cookies and minor analytics tools to measure website traffic, monitor load speed, and optimize your navigation experience on our site.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>5. Contact Us</h2>
            <p>For questions or requests regarding your personal data under the General Data Protection Regulation (GDPR), please contact us at <a href="mailto:info@autoxverse.com" style={{ color: "#7091E6", textDecoration: "none" }}>info@autoxverse.com</a>.</p>
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
