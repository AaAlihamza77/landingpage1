"use client";

import { useState, type ElementType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowRight, BarChart3, Bell, Bot, CalendarDays, Check,
  ChevronDown, Clock3, Database, DollarSign, Facebook, FileText,
  Headphones, HeartPulse, Instagram, LayoutDashboard, Linkedin, Menu,
  MessageCircle, Phone, Play, ReceiptText, Search, Send, ShieldCheck,
  Sparkles, Star, TrendingUp, Users, X, Youtube,
} from "lucide-react";

/* ============================================================
   DATA — unchanged from original
   ============================================================ */

const navigation = [
  { label: "Outcomes", href: "#outcomes" },
  { label: "Platform", href: "#platform" },
  { label: "ROI", href: "#roi" },
  { label: "Stories", href: "#stories" },
];

type Feature = {
  id: number; title: string; description: string;
  outcomes: string[]; details: string[];
  icon: ElementType; tint: "blue" | "emerald" | "amber" | "cyan" | "purple";
};

const features: Feature[] = [
  { id: 1, title: "Appointment reminders", description: "Timely reminders that help each chair stay full.", outcomes: ["Fewer no-shows", "More attendance", "Less chasing"], details: ["WhatsApp", "SMS", "Email", "Voice calls"], icon: CalendarDays, tint: "blue" },
  { id: 2, title: "Every lead, organised", description: "Capture every enquiry into one clean patient record.", outcomes: ["No lost leads", "Full patient history", "Faster follow-up"], details: ["Website", "Google", "Social", "Phone calls"], icon: Database, tint: "emerald" },
  { id: 3, title: "Review requests", description: "Ask happy patients at the moment they are most likely to respond.", outcomes: ["More Google reviews", "Higher ranking", "More trust"], details: ["Post-appointment", "Personalised", "Brand-safe"], icon: Star, tint: "amber" },
  { id: 4, title: "Review follow-ups", description: "Gentle, automatic reminders turn silence into social proof.", outcomes: ["Higher review rate", "More 5-star reviews", "No manual work"], details: ["Smart timing", "Reply aware", "Auto stop rules"], icon: Send, tint: "blue" },
  { id: 5, title: "Patient reactivation", description: "Bring inactive patients back before their lifetime value disappears.", outcomes: ["More repeat visits", "Higher lifetime value", "Fuller books"], details: ["Recall prompts", "Birthday offers", "Seasonal campaigns"], icon: HeartPulse, tint: "emerald" },
  { id: 6, title: "WhatsApp reception", description: "Give patients a prompt, useful answer at any hour.", outcomes: ["24/7 replies", "More bookings", "Less desk workload"], details: ["FAQs", "Booking", "Lead capture", "Staff handoff"], icon: MessageCircle, tint: "cyan" },
  { id: 7, title: "Review monitor", description: "Know what patients say and respond before a small issue grows.", outcomes: ["Protect reputation", "Faster responses", "Clearer trends"], details: ["Rating alerts", "Reply drafts", "Sentiment trends"], icon: Bell, tint: "amber" },
  { id: 8, title: "Invoice automation", description: "Keep billing moving without adding another admin queue.", outcomes: ["Less paperwork", "Faster payment", "Professional billing"], details: ["Invoices", "Receipts", "Payment reminders"], icon: ReceiptText, tint: "emerald" },
  { id: 9, title: "Voice receptionist", description: "Answer every phone call with a helpful, on-brand voice.", outcomes: ["No missed calls", "Always available", "More time for care"], details: ["Bookings", "Treatment FAQs", "Urgent call routing"], icon: Phone, tint: "blue" },
  { id: 10, title: "Local growth content", description: "Build useful treatment and location content that attracts enquiries.", outcomes: ["More visibility", "More visitors", "More enquiries"], details: ["Treatment pages", "FAQs", "Local pages", "Weekly blogs"], icon: Search, tint: "purple" },
  { id: 11, title: "Cancellation recovery", description: "Turn a cancelled appointment into a fast rebooking opportunity.", outcomes: ["Recover revenue", "Fill openings", "Reduce revenue leaks"], details: ["Instant response", "New time options", "Waitlist prompts"], icon: Clock3, tint: "amber" },
  { id: 12, title: "Treatment follow-ups", description: "Stay present after consultations without your team chasing every lead.", outcomes: ["More treatment uptake", "Higher case value", "Timely follow-through"], details: ["Implants", "Whitening", "Braces", "Root canals"], icon: TrendingUp, tint: "blue" },
  { id: 13, title: "Recall system", description: "Keep checkups and cleanings returning on a reliable rhythm.", outcomes: ["Recurring revenue", "More retention", "Healthier schedules"], details: ["Checkups", "Hygiene", "Routine care"], icon: CalendarDays, tint: "emerald" },
  { id: 14, title: "Staff knowledge assistant", description: "Give your team instant answers from your own clinic playbook.", outcomes: ["Faster training", "Fewer interruptions", "Consistent service"], details: ["Policies", "Pricing", "Insurance", "Procedures"], icon: Headphones, tint: "purple" },
  { id: 15, title: "Revenue intelligence", description: "See the patient actions and revenue levers worth acting on next.", outcomes: ["Better decisions", "Clear growth", "Measurable ROI"], details: ["Revenue", "Retention", "Reviews", "AI insights"], icon: BarChart3, tint: "cyan" },
];

const problems = [
  { title: "Patients forget appointments", consequence: "Empty chairs. Lost revenue.", icon: CalendarDays, tint: "blue" },
  { title: "The front desk repeats itself", consequence: "Lower productivity. Slower replies.", icon: Headphones, tint: "purple" },
  { title: "Happy patients leave quietly", consequence: "Weaker reputation. Fewer new bookings.", icon: Star, tint: "amber" },
  { title: "Past patients drift away", consequence: "Lost lifetime value. Less predictable revenue.", icon: HeartPulse, tint: "emerald" },
  { title: "Leads arrive everywhere", consequence: "A scattered database. Missed follow-up.", icon: Database, tint: "cyan" },
  { title: "After-hours calls go unanswered", consequence: "Lost patients before the morning starts.", icon: Phone, tint: "blue" },
];

const workFlow = [
  "Patient contacts clinic", "Lead captured", "Appointment booked", "Reminder sent",
  "Appointment completed", "Invoice generated", "Review requested", "Review followed up",
  "Patient added to CRM", "Birthday offer sent", "Recall reminder", "Patient books again",
];

const faqs = [
  { question: "How does the system work?", answer: "We map the moments that lose your clinic revenue, then connect the right automations to your existing patient journey. Your team gets clear visibility without extra admin." },
  { question: "Does it integrate with our practice software?", answer: "The operating system is designed around the tools your clinic already uses. During your consultation, we confirm the best connection path for your current setup." },
  { question: "Does it work with WhatsApp and can patients reply?", answer: "Yes. Patients can reply naturally, ask questions, confirm appointments, and be passed to a team member whenever a human touch is needed." },
  { question: "Is it GDPR compliant?", answer: "Your workflow is configured with consent, data minimisation, permission controls, and a review process designed for UK clinic operations. We discuss your specific data requirements before launch." },
  { question: "How long does setup take?", answer: "A focused first workflow can be live quickly. A complete operating system is phased around your priorities so your team sees value without a disruptive changeover." },
  { question: "How much support do we receive?", answer: "You get a clear implementation plan, optimisation support, and a partner who keeps the workflows aligned with your clinic's goals as they evolve." },
];

const testimonials = [
  { quote: "Our missed appointments dropped by 42%. The diary feels far more protected now.", name: "Practice Director", clinic: "Private dental clinic, Manchester" },
  { quote: "We collect reviews automatically now, and the quality of our Google profile has visibly improved.", name: "Clinic Manager", clinic: "Cosmetic dentistry group, London" },
  { quote: "The receptionist workflow has changed the way patients experience us outside opening hours.", name: "Operations Lead", clinic: "Multi-site dental practice, Leeds" },
  { quote: "Revenue increased without hiring more front desk staff. That was the outcome we needed.", name: "Principal Dentist", clinic: "Independent dental clinic, Bristol" },
];

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const C = {
  bg: "#0B0D19", // Deep metallic dark indigo
  bgSecondary: "#15192E", // Steel dark blue
  blue: "#7091E6", // Metallic Periwinkle
  purple: "#3D52A0", // Metallic Deep Indigo
  cyan: "#ADBBDA", // Metallic Silver Lavender
  emerald: "#8697C4", // Steel blue
  amber: "#EDE8F5", // Ghosted White
  text: "#EDE8F5", // Clean ghosted white
  textMuted: "#ADBBDA", // Silver lavender
  textDim: "#8697C4", // Steel blue
  glassBg: "rgba(237,232,245,0.03)", // Based on EDE8F5
  glassBorder: "rgba(173,187,218,0.12)", // Based on ADBBDA
};

/* Font stacks: General Sans/PP Neue Montreal headline, Inter body, IBM Plex Mono labels, Instrument Serif accent. */
const F = {
  headline: '"General Sans", "PP Neue Montreal", var(--font-inter), Inter, system-ui, sans-serif',
  inter: "var(--font-inter), Inter, system-ui, sans-serif",
  mono: 'var(--font-ibm-plex-mono), "IBM Plex Mono", monospace',
  serif: 'var(--font-instrument-serif), "Cormorant Garamond", Canela, serif',
};

// Convenience aliases
const Fh = F.headline;
const Fb = F.inter;
const Fd = F.mono;
const Fa = F.serif;

const tintMap = {
  blue:    { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  text: "#3B82F6" },    // Vibrant Blue
  emerald: { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  text: "#10B981" },    // Vibrant Green
  amber:   { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  text: "#F59E0B" },    // Vibrant Amber
  cyan:    { bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.3)",   text: "#06B6D4" },    // Vibrant Cyan
  purple:  { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)", text: "#7C3AED" },    // Vibrant Purple
};

/* ============================================================
   SHARED STYLES (inline — 100% reliable, no Tailwind dependency)
   ============================================================ */
const S = {
  section: (bg = C.bg): React.CSSProperties => ({
    background: bg, padding: "80px 0", width: "100%",
  }),
  container: (): React.CSSProperties => ({
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
  }),
  heading1: (): React.CSSProperties => ({
    fontFamily: Fh,
    fontWeight: 700, lineHeight: 1.06, letterSpacing: "0",
    color: C.text, fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
    margin: 0,
  }),
  heading2: (): React.CSSProperties => ({
    fontFamily: Fh,
    fontWeight: 700, lineHeight: 1.08, letterSpacing: "0",
    color: C.text, fontSize: "clamp(2rem, 4vw, 3.2rem)",
    margin: "0 0 20px",
  }),
  stat: (): React.CSSProperties => ({
    fontFamily: Fh,
    fontWeight: 700, lineHeight: 1, letterSpacing: "0",
    color: C.text, fontSize: "clamp(2rem, 4vw, 2.8rem)",
  }),
  bodyLg: (): React.CSSProperties => ({
    fontFamily: Fb,
    fontSize: "1.1rem", lineHeight: 1.7, color: C.textMuted,
    margin: 0,
  }),
  bodySm: (): React.CSSProperties => ({
    fontFamily: Fb,
    fontSize: "0.875rem", lineHeight: 1.6, color: C.textMuted,
  }),
  label: (): React.CSSProperties => ({
    fontFamily: Fd,
    fontSize: "0.65rem", letterSpacing: "0",
    textTransform: "uppercase" as const, color: C.blue, fontWeight: 600,
  }),
  accent: (): React.CSSProperties => ({
    fontFamily: Fa,
    fontSize: "0.95rem", letterSpacing: "0",
    color: C.text, fontWeight: 500,
  }),
  card: (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: C.glassBg, border: `1px solid ${C.glassBorder}`,
    borderRadius: 16, padding: 20,
    transition: "transform 0.25s ease, border-color 0.25s ease",
    ...extra,
  }),
  btnPrimary: (): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "linear-gradient(135deg, #3D52A0, #7091E6)",
    color: "#fff", fontFamily: Fb,
    fontWeight: 600, fontSize: "0.9rem", padding: "12px 24px",
    borderRadius: 9999, border: "none", cursor: "pointer",
    textDecoration: "none", whiteSpace: "nowrap" as const,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }),
  btnGhost: (): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(255,255,255,0.06)",
    color: C.text, fontFamily: Fb,
    fontWeight: 600, fontSize: "0.9rem", padding: "12px 24px",
    borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer", textDecoration: "none",
    whiteSpace: "nowrap" as const,
    transition: "transform 0.2s ease, background 0.2s ease",
  }),
};

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */
function Eyebrow({ children, color = C.blue }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 16 }}>
      <span style={{ width: 24, height: 1, background: color, display: "inline-block", opacity: 0.5 }} />
      <span style={{ fontFamily: Fd, fontSize: "0.65rem", letterSpacing: "0", color, textTransform: "uppercase" as const, fontWeight: 600 }}>{children}</span>
      <span style={{ width: 24, height: 1, background: color, display: "inline-block", opacity: 0.5 }} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 56px" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={S.heading2()}>{title}</h2>
      {body && <p style={S.bodyLg()}>{body}</p>}
    </div>
  );
}

function CTAButton({ href = "#consultation", children = "Book Free Consultation", variant = "primary", large = false }: { href?: string; children?: string; variant?: "primary" | "ghost" | "white"; large?: boolean }) {
  const base = variant === "primary" ? S.btnPrimary() : S.btnGhost();
  const size = large ? { padding: "14px 32px", fontSize: "1rem" } : {};
  const whiteOverride = variant === "white" ? { background: "#EDE8F5", color: "#3D52A0", fontWeight: 700 } : {};
  return (
    <a href={href} style={{ ...base, ...size, ...whiteOverride }}>
      {children} <ArrowRight style={{ width: 16, height: 16 }} />
    </a>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header style={{ position: "fixed", top: 16, left: 0, right: 0, zIndex: 100, padding: "0 16px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999,
          padding: "10px 20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}>
          {/* Logo */}
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <AutoXverseLogo style={{ width: 28, height: 28 }} />
            <span style={{ fontFamily: Fh, fontWeight: 700, fontSize: 15, color: "#fff" }}>AutoXverse</span>
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav-links" style={{ display: "flex", gap: 28 }}>
            {navigation.map(n => (
              <a key={n.href} href={n.href} style={{ fontFamily: Fb, fontSize: 14, fontWeight: 500, color: C.textMuted, textDecoration: "none" }}>{n.label}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-nav-cta">
            <CTAButton>Book Free Consultation</CTAButton>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: 4
            }}
          >
            {menuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ marginTop: 8, background: "rgba(13,20,33,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 12 }}>
              {navigation.map(n => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "10px 16px", color: C.textMuted, fontFamily: Fb, fontSize: 14, textDecoration: "none", borderRadius: 8 }}>
                  {n.label}
                </a>
              ))}
              <div style={{ marginTop: 12, padding: "0 8px 4px" }}>
                <CTAButton large>Book Free Consultation</CTAButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function Hero() {
  return (
    <section id="top" style={{ position: "relative", background: C.bg, paddingTop: 140, paddingBottom: 80, overflow: "hidden" }}>
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 60% at 20% 40%, rgba(112,145,230,0.13) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 30%, rgba(61,82,160,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 50% 80%, rgba(173,187,218,0.08) 0%, transparent 70%)" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px" }} />

      <div style={{ ...S.container(), position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 9999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 32 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.cyan, display: "inline-block", animation: "pulse 2s ease infinite" }} />
          <span style={{ fontFamily: Fd, fontSize: 11, letterSpacing: "0", color: C.textMuted }}>The dental clinic operating system</span>
        </div>

        {/* Headline */}
        <h1 style={{ ...S.heading1(), marginBottom: 24, maxWidth: 900, margin: "0 auto 24px" }}>
          Turn more patients into{" "}
          <span style={{ background: "linear-gradient(135deg, #3D52A0, #7091E6, #ADBBDA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            loyal patients
          </span>
          , automatically.
        </h1>

        {/* Subheadline */}
        <p style={{ ...S.bodyLg(), maxWidth: 640, margin: "0 auto 40px" }}>
          Recover lost revenue, reduce no-shows, increase repeat visits, collect more 5-star reviews, and give your reception room to breathe with one complete operating system.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <CTAButton large>Book Free Consultation</CTAButton>
          <a href="#dashboard" style={{ ...S.btnGhost(), padding: "14px 32px", fontSize: "1rem" }}>
            <Play style={{ width: 16, height: 16 }} /> Watch live demo
          </a>
        </div>

        {/* Trust line */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }}>
          <ShieldCheck style={{ width: 14, height: 14, color: C.emerald }} />
          <span style={{ fontFamily: Fd, fontSize: 11, color: C.textDim, letterSpacing: "0" }}>Built for UK private practices. Every missed appointment costs money.</span>
        </div>

        {/* Hero Dashboard Mock */}
        <HeroDashboardMock />
      </div>
    </section>
  );
}

function HeroDashboardMock() {
  const badgeReminder = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(21, 25, 46, 0.55)", border: "1px solid rgba(112, 145, 230, 0.35)", backdropFilter: "blur(16px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
      <CalendarDays style={{ width: 14, height: 14, color: "#06B6D4", flexShrink: 0 }} />
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#fff" }}>Reminder sent</div>
        <div style={{ fontFamily: Fb, fontSize: 10, color: C.textMuted }}>Appointment confirmed</div>
      </div>
    </div>
  );

  const badgeReview = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(21, 25, 46, 0.55)", border: "1px solid rgba(245, 158, 11, 0.35)", backdropFilter: "blur(16px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
      <Star style={{ width: 14, height: 14, color: "#F59E0B", flexShrink: 0 }} />
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#fff" }}>New 5-star review</div>
        <div style={{ fontFamily: Fb, fontSize: 10, color: C.textMuted }}>Google profile improved</div>
      </div>
    </div>
  );

  const badgeLead = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(21, 25, 46, 0.55)", border: "1px solid rgba(37, 211, 102, 0.35)", backdropFilter: "blur(16px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
      <MessageCircle style={{ width: 14, height: 14, color: "#25D366", flexShrink: 0 }} />
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#fff" }}>Lead captured</div>
        <div style={{ fontFamily: Fb, fontSize: 10, color: C.textMuted }}>WhatsApp reply sent</div>
      </div>
    </div>
  );

  const badgeVoice = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(21, 25, 46, 0.55)", border: "1px solid rgba(139, 92, 246, 0.35)", backdropFilter: "blur(16px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
      <Phone style={{ width: 14, height: 14, color: "#8B5CF6", flexShrink: 0 }} />
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#fff" }}>Booking recovered</div>
        <div style={{ fontFamily: Fb, fontSize: 10, color: C.textMuted }}>AI receptionist confirmed</div>
      </div>
    </div>
  );

  return (
    <div className="hero-mockup-wrapper" style={{ position: "relative", marginTop: 72, maxWidth: 960, margin: "72px auto 0", perspective: "1500px", transformStyle: "preserve-3d" }}>
      
      {/* Dashboard card container */}
      <div className="hero-mockup-container" style={{ borderRadius: 20, overflow: "hidden", background: "rgba(21, 25, 46, 0.65)", border: "1px solid rgba(173, 187, 218, 0.16)", backdropFilter: "blur(24px)", transform: "rotateX(10deg) rotateY(-4deg) rotateZ(1deg)", transformStyle: "preserve-3d", boxShadow: "0 40px 100px -10px rgba(7, 9, 17, 0.85), 0 20px 50px -15px rgba(112, 145, 230, 0.25)" }}>
        
        {/* Top window bar */}
        <div style={{ padding: "12px 20px", background: "rgba(11, 13, 25, 0.92)", borderBottom: "1px solid rgba(173, 187, 218, 0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald }} />
            <span style={{ fontFamily: Fd, fontSize: 10, color: C.emerald }}>Live — Oak Dental</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="hero-mockup-body" style={{ display: "grid", gridTemplateColumns: "160px 1fr", minHeight: 340 }}>
          
          {/* Sidebar */}
          <div className="hero-mockup-sidebar" style={{ padding: 16, background: "rgba(11, 13, 25, 0.95)", borderRight: "1px solid rgba(173, 187, 218, 0.08)", display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              [LayoutDashboard, "Overview", true],
              [CalendarDays, "Appointments", false],
              [Users, "Patients", false],
              [MessageCircle, "Inbox", false],
              [Phone, "Voice", false],
              [ReceiptText, "Invoices", false],
              [BarChart3, "Reports", false],
            ].map(([Icon, label, active], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: active ? "rgba(112, 145, 230, 0.15)" : "transparent" }}>
                {/* @ts-ignore */}
                <Icon style={{ width: 14, height: 14, color: active ? C.blue : C.textDim, flexShrink: 0 }} />
                <span style={{ fontFamily: Fb, fontSize: 11, color: active ? C.blue : C.textDim, fontWeight: active ? 600 : 400 }}>{label as string}</span>
              </div>
            ))}
            
            {/* Systems Live widget */}
            <div className="hero-mockup-sidebar-info" style={{ marginTop: "auto", padding: 10, borderRadius: 10, background: "rgba(112, 145, 230, 0.08)", border: "1px solid rgba(112, 145, 230, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald }} />
                <span style={{ fontFamily: Fb, fontSize: 10, fontWeight: 600, color: C.emerald }}>Systems live</span>
              </div>
              <p style={{ fontFamily: Fb, fontSize: 10, color: "rgba(173, 187, 218, 0.78)", lineHeight: 1.4, textAlign: "left" }}>Protecting your patient journey 24/7.</p>
            </div>
          </div>

          {/* Main content */}
          <div style={{ padding: 20, background: C.bgSecondary }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: Fh, fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Your clinic, in motion</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 9999, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }} className="hamburger-btn">
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.emerald }} />
                <span style={{ fontFamily: Fb, fontSize: 9, color: C.emerald, fontWeight: 600 }}>Active</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="hero-mockup-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Revenue protected", value: "£12.4k", color: "#3B82F6", Icon: DollarSign },
                { label: "Appointments", value: "186", color: "#10B981", Icon: CalendarDays },
                { label: "No-shows", value: "3.2%", color: "#F59E0B", Icon: Activity },
                { label: "New reviews", value: "+38", color: "#06B6D4", Icon: Star },
              ].map(item => (
                <div key={item.label} style={{ background: "rgba(237, 232, 245, 0.05)", border: "1px solid rgba(173, 187, 218, 0.08)", borderRadius: 10, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontFamily: Fd, fontSize: 9, color: C.textDim, textTransform: "uppercase" as const, letterSpacing: "0", textAlign: "left" }}>{item.label}</div>
                    <item.Icon style={{ width: 12, height: 12, color: item.color }} />
                  </div>
                  <div style={{ fontFamily: Fh, fontSize: 20, fontWeight: 700, color: "#fff", textAlign: "left" }}>{item.value}</div>
                  <div style={{ fontFamily: Fb, fontSize: 10, color: "#10B981", marginTop: 4, textAlign: "left" }}>↑ 18.6%</div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="hero-mockup-chart-row" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 10 }}>
              <div style={{ background: "rgba(237, 232, 245, 0.035)", border: "1px solid rgba(173, 187, 218, 0.06)", borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: Fb, fontSize: 12, fontWeight: 600, color: "#fff" }}>Revenue recovery</span>
                  <span style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#10B981" }}>+24.8%</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 70 }}>
                  {[42,54,48,67,62,82,72,88,76,96,84,100].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 11 ? "#10B981" : `rgba(59, 130, 246, ${0.35 + i*0.05})` }} />
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(237, 232, 245, 0.035)", border: "1px solid rgba(173, 187, 218, 0.06)", borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: Fb, fontSize: 12, fontWeight: 600, color: "#fff" }}>Patient pulse</span>
                  <Bot style={{ width: 14, height: 14, color: "#3B82F6" }} />
                </div>
                {[["WhatsApp replies","42","82%","#3B82F6"],["Booked by AI","17","58%","#10B981"],["Review requests","29","70%","#7C3AED"]].map(([label,val,pct,color]) => (
                  <div key={label as string} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: Fb, fontSize: 10, color: C.textDim }}>{label}</span>
                      <span style={{ fontFamily: Fb, fontSize: 10, fontWeight: 600, color: "#fff" }}>{val}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)" }}>
                      <div style={{ height: "100%", width: pct as string, borderRadius: 2, background: color as string }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW: Absolute floating badges */}
      <div className="hero-floating-badges-desktop" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", left: -150, top: 60, transform: "translate3d(0, 0, 100px)" }}>
          {badgeReminder}
        </div>
        <div style={{ position: "absolute", right: -150, top: 130, transform: "translate3d(0, 0, 120px)" }}>
          {badgeReview}
        </div>
        <div style={{ position: "absolute", left: -170, top: 230, transform: "translate3d(0, 0, 90px)" }}>
          {badgeLead}
        </div>
        <div style={{ position: "absolute", right: -170, top: 290, transform: "translate3d(0, 0, 110px)" }}>
          {badgeVoice}
        </div>
      </div>

      {/* MOBILE VIEW: Stacked badges below mockup so they aren't lost */}
      <div className="hero-floating-badges-mobile" style={{ display: "none" }}>
        {badgeReminder}
        {badgeReview}
        {badgeLead}
        {badgeVoice}
      </div>

    </div>
  );
}

/* ============================================================
   BRAND SVG ICONS
   ============================================================ */
function GoogleLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

function WhatsappLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.91c0 1.748.458 3.45 1.321 4.956L2 23l6.285-1.647a9.837 9.837 0 0 0 4.707 1.202h.004c5.456 0 9.905-4.45 9.91-9.914a9.831 9.831 0 0 0-2.905-6.733zM11.992 20.12h-.003a8.163 8.163 0 0 1-4.167-1.15l-.299-.178-3.722.977.994-3.63-.195-.31a8.152 8.152 0 0 1-1.251-4.322c.004-4.507 3.676-8.177 8.188-8.177a8.147 8.147 0 0 1 5.79 2.4 8.145 8.145 0 0 1 2.399 5.795c-.005 4.512-3.678 8.18-8.19 8.18zM16.48 13.914c-.246-.123-1.455-.717-1.68-.8a.423.423 0 0 0-.555.123c-.158.238-.616.772-.756.93-.14.156-.28.176-.526.053a7.39 7.39 0 0 1-1.954-1.205 8.15 8.15 0 0 1-1.353-1.683c-.14-.239-.015-.368.107-.49.11-.11.246-.285.37-.428a1.69 1.69 0 0 0 .247-.403.457.457 0 0 0-.022-.428c-.063-.122-.556-1.341-.762-1.833-.2-.482-.395-.417-.555-.425l-.472-.008a.91.91 0 0 0-.66.308c-.227.247-.869.85-.869 2.072 0 1.223.89 2.405.99 2.541.1.135 1.75 2.673 4.24 3.746.593.255 1.056.407 1.417.521.597.19 1.14.162 1.57.098.478-.07 1.456-.595 1.66-1.171.206-.576.206-1.07.145-1.171-.06-.103-.223-.165-.47-.288z" fill="#25D366" />
    </svg>
  );
}

function MetaLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.436 6.75c-1.95 0-3.52 1.35-3.53 3.06-.01-1.71-1.58-3.06-3.53-3.06C7.84 6.75 5.75 8.8 5.75 11.33c0 2.54 2.09 4.58 4.62 4.58 1.95 0 3.52-1.35 3.53-3.06.01 1.71 1.58 3.06 3.53 3.06 2.53 0 4.62-2.04 4.62-4.58 0-2.53-2.09-4.58-4.62-4.58zm-7.05 7.37c-1.39 0-2.52-1.12-2.52-2.5s1.13-2.5 2.52-2.5c1.29 0 2.37.97 2.5 2.22H10.38z" fill="#0866FF" />
    </svg>
  );
}

function StripeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13.962 10.435c0-1.004-.75-1.423-1.977-1.423-1.282 0-2.482.355-3.415.823l-.683-3.326c1.17-.468 2.65-.77 4.293-.77 4.148 0 6.643 1.923 6.643 5.485 0 4.708-5.69 5.378-5.69 6.843 0 .586.518.87 1.347.87 1.385 0 2.87-.493 3.86-.995l.707 3.3c-1.18.57-2.923.903-4.836.903-4.14 0-6.84-1.85-6.84-5.32 0-4.808 5.753-5.46 5.753-6.84-.002-.27-.247-.55-.747-.55-.6 0-1.5.25-2.22.61l-.64-3.12a6.38 6.38 0 0 1 3.12-.76c2.463 0 3.753 1.15 3.753 2.92v.36z" fill="#635BFF" />
    </svg>
  );
}

function OpenAiLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M21.3 10.155c.41-1.087.33-2.316-.22-3.303C20.4 5.655 19.11 4.9 17.72 4.9c-.35 0-.7.106-1.03.24C16 4.103 14.86 3.47 13.62 3.47c-.9 0-1.74.37-2.35 1.02a4.42 4.42 0 0 0-2.29-1.12c-1.39 0-2.68.755-3.36 1.954-.55.987-.63 2.216-.22 3.303-.7.68-1.11 1.63-1.11 2.66 0 1.39.75 2.68 1.95 3.36.33.134.68.24 1.03.24.08 0 .16 0 .24-.01A4.47 4.47 0 0 0 10.38 16.5c1.24 0 2.38-.63 3.03-1.68a4.41 4.41 0 0 0 2.29 1.12c1.39 0 2.68-.75 3.36-1.95.55-.99.63-2.22.22-3.3.7-.68 1.11-1.63 1.11-2.66 0-1.39-.75-2.68-1.95-3.36.08-.135.15-.27.21-.41-.33-.134-.68-.24-1.03-.24z" fill="#10A37F" />
    </svg>
  );
}

function MicrosoftLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 23 23" {...props}>
      <rect x="0" y="0" width="10" height="10" fill="#F25022" />
      <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
      <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
      <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function AutoXverseLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/autoxverse_logo_transparent.png"
      alt="AutoXverse Logo"
      {...props}
    />
  );
}

function LogoStrip() {
  const logos = [
    { label: "Google", Icon: GoogleLogo },
    { label: "WhatsApp", Icon: WhatsappLogo },
    { label: "Meta", Icon: MetaLogo },
    { label: "Stripe", Icon: StripeLogo },
    { label: "OpenAI", Icon: OpenAiLogo },
    { label: "Microsoft", Icon: MicrosoftLogo },
  ];
  return (
    <section style={{ ...S.section(C.bgSecondary), padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={S.container()}>
        <p style={{ ...S.label(), textAlign: "center", marginBottom: 24 }}>Designed around the patient channels you already use</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", justifyContent: "center", alignItems: "center" }}>
          {logos.map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.8 }}>
              <l.Icon style={{ width: 18, height: 18 }} />
              <span style={{ fontFamily: Fd, fontSize: 15, fontWeight: 600, color: "#fff" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   OUTCOMES STATS
   ============================================================ */
/* ============================================================
   NEWTON'S CRADLE ANIMATION COMPONENT
   ============================================================ */
/* ============================================================
   OUTCOMES STATS - WAVY THREAD & BALLS LAYOUT
   ============================================================ */
function Outcomes() {
  const stats = [
    { stat: "99.9%", label: "Platform uptime", color: "#06B6D4", left: "12.5%", top: 95, grad: "linear-gradient(135deg, #06B6D4, #7091E6)" },
    { stat: "24/7", label: "Patient support", color: "#3B82F6", left: "37.5%", top: 305, grad: "linear-gradient(135deg, #3B82F6, #8697C4)" },
    { stat: "Thousands", label: "Automated conversations", color: "#10B981", left: "62.5%", top: 95, grad: "linear-gradient(135deg, #10B981, #ADBBDA)" },
    { stat: "Millions", label: "Messages processed", color: "#7C3AED", left: "87.5%", top: 305, grad: "linear-gradient(135deg, #7C3AED, #EDE8F5)" }
  ];
  return (
    <section id="outcomes" style={S.section()}>
      <div style={S.container()}>
        <SectionHeader eyebrow="The outcome, not the workload" title="A calmer clinic with a stronger revenue engine" body="Every workflow is designed to move a patient forward, protect time at the desk, or make your clinic easier to choose." />
        
        {/* DESKTOP VIEW: Horizontal Wavy Thread and Circles */}
        <div className="desktop-thread-stats" style={{ position: "relative", width: "100%", height: 400, marginBottom: 40, overflow: "visible" }}>
          {/* Glowing Animated SVG Wavy Path */}
          <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            {/* Background Dashed Guide Thread */}
            <path
              d="M -50 200 C 75 60, 225 60, 300 200 C 375 340, 525 340, 600 200 C 675 60, 825 60, 900 200 C 975 340, 1125 340, 1250 200"
              stroke="rgba(112, 145, 230, 0.16)"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
            {/* Glowing Flow Thread */}
            <path
              d="M -50 200 C 75 60, 225 60, 300 200 C 375 340, 525 340, 600 200 C 675 60, 825 60, 900 200 C 975 340, 1125 340, 1250 200"
              stroke="url(#thread-flow-glow)"
              strokeWidth="3"
              strokeLinecap="round"
              className="thread-flow-path"
            />
            <defs>
              <linearGradient id="thread-flow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="33%" stopColor="#3B82F6" />
                <stop offset="66%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          {/* Circles (Balls) Placed Exactly on the Wave Coordinates */}
          {stats.map(item => (
            <div key={item.label} className="stats-ball-c" style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              width: 155,
              height: 155,
              borderRadius: "50%",
              background: "rgba(11, 13, 25, 0.82)",
              border: "2px solid rgba(173, 187, 218, 0.15)",
              boxShadow: `0 12px 35px rgba(5, 7, 15, 0.75), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 15px ${item.color}15`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              zIndex: 2,
              cursor: "pointer",
              "--hover-color": item.color,
              "--glow-color": `${item.color}45`
            } as React.CSSProperties}>
              
              {/* Stat Value */}
              <div style={{
                fontFamily: Fd,
                fontWeight: 700,
                fontSize: item.stat === "Thousands" ? 20 : 25,
                background: item.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 6,
                letterSpacing: "0",
                textAlign: "center"
              }}>{item.stat}</div>

              {/* Label */}
              <div style={{
                fontFamily: Fb,
                fontSize: 10,
                fontWeight: 500,
                color: C.textDim,
                textAlign: "center",
                lineHeight: 1.3,
                maxWidth: 120
              }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW: Vertical Thread and Circles */}
        <div className="mobile-thread-stats" style={{ display: "none", flexDirection: "column", alignItems: "center", position: "relative", padding: "30px 0", marginBottom: 32 }}>
          {/* Vertical Center Thread with flowing neon dash */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, bottom: 0, width: 30, zIndex: 0 }}>
            <svg width="30" height="100%" style={{ position: "absolute", inset: 0 }} fill="none" preserveAspectRatio="none">
              <line x1="15" y1="0" x2="15" y2="100%" stroke="rgba(112, 145, 230, 0.12)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="15" y1="0" x2="15" y2="100%" stroke="url(#mobile-vertical-flow-glow)" strokeWidth="3" className="vertical-thread-path" />
              <defs>
                <linearGradient id="mobile-vertical-flow-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="33%" stopColor="#3B82F6" />
                  <stop offset="66%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Circles (Balls) stacked vertically */}
          {stats.map(item => (
            <div key={item.label} className="stats-ball-c-mobile" style={{
              position: "relative",
              width: 155,
              height: 155,
              borderRadius: "50%",
              background: "rgba(11, 13, 25, 0.82)",
              border: "2px solid rgba(173, 187, 218, 0.15)",
              boxShadow: `0 12px 35px rgba(5, 7, 15, 0.75), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 15px ${item.color}15`,
              margin: "20px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              zIndex: 2,
              cursor: "pointer",
              "--hover-color": item.color,
              "--glow-color": `${item.color}45`
            } as React.CSSProperties}>
              
              {/* Stat Value */}
              <div style={{
                fontFamily: Fd,
                fontWeight: 700,
                fontSize: item.stat === "Thousands" ? 20 : 25,
                background: item.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 6,
                letterSpacing: "0",
                textAlign: "center"
              }}>{item.stat}</div>

              {/* Label */}
              <div style={{
                fontFamily: Fb,
                fontSize: 10,
                fontWeight: 500,
                color: C.textDim,
                textAlign: "center",
                lineHeight: 1.3,
                maxWidth: 120
              }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <CTAButton>See What Your Clinic Could Recover</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROBLEMS SECTION
   ============================================================ */
function Problems() {
  return (
    <section style={{ ...S.section(C.bgSecondary), position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(61,82,160,0.1) 0%, transparent 60%)" }} />
      <div style={{ ...S.container(), position: "relative", zIndex: 1 }}>
        <div className="responsive-two-col" style={{ alignItems: "start" }}>
          {/* Left text */}
          <div>
            <p style={{ ...S.label(), color: C.purple, marginBottom: 16 }}>Revenue leaks</p>
            <h2 style={{ ...S.heading2(), marginBottom: 20 }}>
              Your clinic is losing money{" "}
              <span style={{ background: "linear-gradient(135deg,#3D52A0,#7091E6,#ADBBDA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>every single day</span>
            </h2>
            <p style={{ ...S.bodyLg(), marginBottom: 32 }}>Not because your team is not working hard. Because the patient journey has too many places for revenue to quietly fall out.</p>
            <CTAButton>Stop the Revenue Leaks</CTAButton>
          </div>

          {/* Right: problem cards */}
          <div className="responsive-cards-grid">
            {problems.map(p => {
              const t = tintMap[p.tint as keyof typeof tintMap];
              const Icon = p.icon;
              return (
                <div key={p.title} className="bento-card" style={{ ...S.card({ borderLeft: `2px solid ${t.border}` }) }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: t.bg, display: "grid", placeItems: "center", marginBottom: 12 }}>
                    <Icon style={{ width: 16, height: 16, color: t.text }} />
                  </div>
                  <h3 style={{ fontFamily: Fh, fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontFamily: Fb, fontSize: 12, color: C.textDim, lineHeight: 1.5 }}>{p.consequence}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PLATFORM BENTO GRID
   ============================================================ */
function Platform() {
  const [activeCategory, setActiveCategory] = useState<"bookings" | "growth" | "operations">("bookings");

  const categories = [
    { id: "bookings", label: "Bookings & Retention", desc: "Keep chairs filled and reactivate quiet patient records automatically." },
    { id: "growth", label: "Reputation & Growth", desc: "Capture every inbound enquiry and automate Google review collection." },
    { id: "operations", label: "Clinic Operations", desc: "Automate billing sequences and equip your team with knowledge tools." }
  ];

  const filteredFeatures = features.filter(f => {
    if (activeCategory === "bookings") return [1, 5, 6, 9, 11, 13].includes(f.id);
    if (activeCategory === "growth") return [2, 3, 4, 7, 10].includes(f.id);
    return [8, 12, 14, 15].includes(f.id);
  });

  return (
    <section id="platform" style={S.section()}>
      <div style={S.container()}>
        <SectionHeader eyebrow="Meet the platform" title="One operating system. More patient momentum." body="Explore all 15 connected workflows designed to keep every patient moving toward the next right action." />
        
        {/* Category Tabs Header */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {categories.map(c => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id as any)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 9999,
                  background: isActive ? "linear-gradient(135deg, #3D52A0, #7091E6)" : "rgba(255,255,255,0.04)",
                  border: isActive ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : C.textMuted,
                  fontFamily: Fb,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 8px 20px rgba(112, 145, 230, 0.2)" : "none",
                  transition: "all 0.25s ease"
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Tab Description */}
        <p style={{ textAlign: "center", fontFamily: Fb, fontSize: 13, color: C.textDim, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px", minHeight: 20 }}>
          {categories.find(c => c.id === activeCategory)?.desc}
        </p>

        {/* Dynamic Bento Grid */}
        <div className={`platform-features-grid ${activeCategory === "growth" ? "grid-3-col" : ""}`} style={{ gap: 12, marginBottom: 32 }}>
          {filteredFeatures.map(f => {
            const t = tintMap[f.tint];
            const Icon = f.icon;
            // Symmetrical bento sizes:
            // - In Growth tab (5 items), Card 1 (ID 2) is wide.
            // - In Operations tab (4 items), Card 4 (ID 15) is wide.
            const wide = (activeCategory === "growth" && f.id === 2) || (activeCategory === "operations" && f.id === 15);
            
            return (
              <div key={f.id} className="bento-card" style={{
                ...S.card({
                  gridColumn: wide ? "span 2" : "span 1",
                  borderLeft: `2px solid ${t.border}`
                }),
                position: "relative",
                textAlign: "left",
                minHeight: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: t.bg, display: "grid", placeItems: "center" }}>
                      <Icon style={{ width: 16, height: 16, color: t.text }} />
                    </div>
                    <span style={{ fontFamily: Fd, fontSize: 9, color: C.textDim, letterSpacing: "0" }}>{String(f.id).padStart(2,"0")}</span>
                  </div>
                  <h3 style={{ fontFamily: Fh, fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>{f.title}</h3>
                  <p style={{ fontFamily: Fb, fontSize: 11, color: C.textDim, lineHeight: 1.5 }}>{f.description}</p>
                </div>
                {f.outcomes && f.outcomes.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {f.outcomes.map(o => (
                      <span key={o} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 9999, background: t.bg, fontFamily: Fb, fontSize: 9, color: t.text }}>
                        <Check style={{ width: 10, height: 10 }} />{o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <CTAButton>Design My Clinic Workflows</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS
   ============================================================ */
function HowItWorks() {
  return (
    <section style={S.section(C.bgSecondary)}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader eyebrow="How it works" title="A patient journey that keeps creating value" body="The system handles the repeatable steps so that care can happen more consistently." />
        
        {/* DESKTOP TIMELINE (Alternating layout) */}
        <div className="desktop-timeline" style={{ position: "relative", perspective: "1200px", transformStyle: "preserve-3d", padding: "20px 0" }}>
          
          {/* Animated Center Vertical Flow Thread */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, bottom: 0, width: 30, zIndex: 0 }}>
            <svg width="30" height="100%" style={{ position: "absolute", inset: 0 }} fill="none" preserveAspectRatio="none">
              <line x1="15" y1="0" x2="15" y2="100%" stroke="rgba(112, 145, 230, 0.12)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="15" y1="0" x2="15" y2="100%" stroke="url(#vertical-flow-glow)" strokeWidth="3" className="vertical-thread-path" />
              <defs>
                <linearGradient id="vertical-flow-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="33%" stopColor="#3B82F6" />
                  <stop offset="66%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
            {workFlow.map((step, i) => {
              const isLeft = i % 2 === 1;
              const color = i % 4 === 0 ? "#06B6D4" : i % 4 === 1 ? "#3B82F6" : i % 4 === 2 ? "#10B981" : "#7C3AED";
              
              return (
                <div key={step} className="timeline-item-row" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d"
                }}>
                  {/* Left Column: Card on Odd Steps */}
                  <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 32, opacity: isLeft ? 1 : 0, pointerEvents: isLeft ? "auto" : "none" }}>
                    {isLeft && (
                      <div className="timeline-3d-item bento-card" style={{
                        width: "100%",
                        maxWidth: 340,
                        padding: "16px 20px",
                        borderRadius: 14,
                        background: "rgba(21, 25, 46, 0.55)",
                        border: "1px solid rgba(173, 187, 218, 0.12)",
                        borderRight: `3px solid ${color}`,
                        boxShadow: "0 10px 25px -5px rgba(7, 9, 17, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}>
                        <span style={{ fontFamily: Fb, fontSize: 13, fontWeight: 600, color: "#fff" }}>{step}</span>
                        {i < workFlow.length - 1 ? <ArrowRight style={{ width: 14, height: 14, color: color, flexShrink: 0 }} /> : <span style={{ fontFamily: Fd, fontSize: 9, color: color, padding: "2px 8px", borderRadius: 9999, background: `${color}15` }}>Loop</span>}
                      </div>
                    )}
                  </div>

                  {/* Center Thread Ball Node */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
                    background: "rgba(11, 13, 25, 0.9)",
                    border: `2px solid ${color}45`,
                    fontFamily: Fd, fontSize: 11, fontWeight: 700, color: color,
                    position: "relative", zIndex: 2,
                    boxShadow: `0 5px 15px rgba(0,0,0,0.6), 0 0 12px ${color}20`
                  }}>
                    {String(i + 1).padStart(2,"0")}
                  </div>

                  {/* Right Column: Card on Even Steps */}
                  <div style={{ flex: 1, display: "flex", justifyContent: "flex-start", paddingLeft: 32, opacity: !isLeft ? 1 : 0, pointerEvents: !isLeft ? "auto" : "none" }}>
                    {!isLeft && (
                      <div className="timeline-3d-item bento-card" style={{
                        width: "100%",
                        maxWidth: 340,
                        padding: "16px 20px",
                        borderRadius: 14,
                        background: "rgba(21, 25, 46, 0.55)",
                        border: "1px solid rgba(173, 187, 218, 0.12)",
                        borderLeft: `3px solid ${color}`,
                        boxShadow: "0 10px 25px -5px rgba(7, 9, 17, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}>
                        <span style={{ fontFamily: Fb, fontSize: 13, fontWeight: 600, color: "#fff" }}>{step}</span>
                        {i < workFlow.length - 1 ? <ArrowRight style={{ width: 14, height: 14, color: color, flexShrink: 0 }} /> : <span style={{ fontFamily: Fd, fontSize: 9, color: color, padding: "2px 8px", borderRadius: 9999, background: `${color}15` }}>Loop</span>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE TIMELINE (Stacked layout) */}
        <div className="mobile-timeline" style={{ display: "none", position: "relative", perspective: "1200px", transformStyle: "preserve-3d" }}>
          {/* Vertical Left Line */}
          <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #06B6D4, #3B82F6, #10B981, #7C3AED)", opacity: 0.3 }} />
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {workFlow.map((step, i) => {
              const color = i % 4 === 0 ? "#06B6D4" : i % 4 === 1 ? "#3B82F6" : i % 4 === 2 ? "#10B981" : "#7C3AED";
              return (
                <div key={step} className="timeline-3d-item" style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  cursor: "pointer",
                  position: "relative"
                }}>
                  {/* Left Circle Node */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center",
                    background: "rgba(11, 13, 25, 0.9)",
                    border: `2px solid ${color}40`,
                    fontFamily: Fd, fontSize: 10, color: color,
                    position: "relative", zIndex: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
                  }}>
                    {String(i + 1).padStart(2,"0")}
                  </div>

                  {/* Right Card */}
                  <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderRadius: 12,
                    background: "rgba(21, 25, 46, 0.55)",
                    border: "1px solid rgba(173, 187, 218, 0.12)",
                    borderLeft: `3px solid ${color}`,
                    boxShadow: "0 10px 25px -5px rgba(7, 9, 17, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                  }}>
                    <span style={{ fontFamily: Fb, fontSize: 13, fontWeight: 600, color: "#fff" }}>{step}</span>
                    {i < workFlow.length - 1 ? <ArrowRight style={{ width: 14, height: 14, color: color, flexShrink: 0 }} /> : <span style={{ fontFamily: Fd, fontSize: 9, color: color, padding: "2px 8px", borderRadius: 9999, background: `${color}15` }}>Loop</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 32, fontFamily: Fb, fontSize: 13, fontWeight: 600, color: C.emerald }}>Then it repeats, automatically, patient by patient.</p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <CTAButton>Map My Patient Journey</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ROI CALCULATOR
   ============================================================ */
function RoiCalculator() {
  const [appointments, setAppointments] = useState(220);
  const [treatmentValue, setTreatmentValue] = useState(180);
  const [noShowRate, setNoShowRate] = useState(12);
  const [reviewCount, setReviewCount] = useState(86);

  const lost = Math.round(appointments * treatmentValue * (noShowRate / 100));
  const recovered = Math.round(lost * 0.42);
  const additionalReviews = Math.max(8, Math.round(appointments * 0.18 - reviewCount * 0.01));
  const additionalPatients = Math.round(additionalReviews * 0.42);
  const annualGrowth = Math.round((recovered + additionalPatients * treatmentValue) * 12);
  const fmt = (v: number) => new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",maximumFractionDigits:0}).format(v);

  const sliderLabelStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: Fb, fontSize: 12, fontWeight: 600 };

  return (
    <section id="roi" style={S.section(C.bgSecondary)}>
      <div style={S.container()}>
        <SectionHeader eyebrow="ROI calculator" title="Turn missed moments into a growth plan" body="Drag the sliders below to estimate the hidden opportunities inside your current patient list." />
        <div className="roi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          
          {/* Sliders Input Panel */}
          <div style={{ padding: "40px 32px", background: "rgba(13,20,33,0.9)", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <h3 style={{ fontFamily: Fh, fontWeight: 400, fontSize: 26, color: "#fff", marginBottom: 8, lineHeight: 1.1 }}>What could your clinic recover?</h3>
              <p style={{ ...S.bodySm(), marginBottom: 8 }}>Drag the handles to test different clinical scales and values.</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Appointments Slider */}
              <div style={sliderLabelStyle}>
                <span style={{ color: C.textMuted }}>Monthly appointments</span>
                <span style={{ fontFamily: Fd, color: "#06B6D4", fontSize: 14, fontWeight: 700 }}>{appointments}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={appointments}
                onChange={e => setAppointments(+e.target.value)}
                className="premium-range-slider"
                style={{ "--slider-color": "#06B6D4" } as any}
              />

              {/* Treatment Value Slider */}
              <div style={sliderLabelStyle}>
                <span style={{ color: C.textMuted }}>Average treatment value</span>
                <span style={{ fontFamily: Fd, color: "#3B82F6", fontSize: 14, fontWeight: 700 }}>£{treatmentValue}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={treatmentValue}
                onChange={e => setTreatmentValue(+e.target.value)}
                className="premium-range-slider"
                style={{ "--slider-color": "#3B82F6" } as any}
              />

              {/* No Show Rate Slider */}
              <div style={sliderLabelStyle}>
                <span style={{ color: C.textMuted }}>No-show rate</span>
                <span style={{ fontFamily: Fd, color: "#10B981", fontSize: 14, fontWeight: 700 }}>{noShowRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={noShowRate}
                onChange={e => setNoShowRate(+e.target.value)}
                className="premium-range-slider"
                style={{ "--slider-color": "#10B981" } as any}
              />

              {/* Current Reviews Slider */}
              <div style={sliderLabelStyle}>
                <span style={{ color: C.textMuted }}>Current Google review count</span>
                <span style={{ fontFamily: Fd, color: "#7C3AED", fontSize: 14, fontWeight: 700 }}>{reviewCount}</span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="5"
                value={reviewCount}
                onChange={e => setReviewCount(+e.target.value)}
                className="premium-range-slider"
                style={{ "--slider-color": "#7C3AED" } as any}
              />
            </div>
          </div>

          {/* Results Display Panel */}
          <div style={{ padding: "40px 32px", background: "#020812", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: C.blue, opacity: 0.15, filter: "blur(60px)" }} />
            <div style={{ position: "relative" }}>
              <p style={{ ...S.label(), marginBottom: 12 }}>Estimated annual opportunity</p>
              <div style={{ fontFamily: Fd, fontWeight: 700, fontSize: "3.2rem", color: "#fff", marginBottom: 8, letterSpacing: "0", lineHeight: 1 }}>{fmt(annualGrowth)}</div>
              <p style={{ ...S.bodySm(), marginBottom: 24, maxWidth: 320 }}>Total recovered revenue and review-led new acquisitions.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                {[
                  { label: "Monthly revenue lost", value: fmt(lost), color: "#3D52A0" },
                  { label: "Monthly recovered", value: fmt(recovered), color: C.emerald },
                  { label: "Additional reviews", value: `+${additionalReviews}`, color: C.amber },
                  { label: "Additional patients", value: `+${additionalPatients}`, color: C.blue },
                ].map(item => (
                  <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontFamily: Fb, fontSize: 11, color: C.textDim, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontFamily: Fd, fontSize: 20, fontWeight: 700, color: item.color, letterSpacing: "0" }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <CTAButton>Build My Recovery Plan</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
/* ============================================================
   GOOGLE REVIEWS TRUST PROFILE DASHBOARD
   ============================================================ */
function GoogleTrustDashboard() {
  return (
    <div className="bento-card" style={{
      background: "rgba(21, 25, 46, 0.55)",
      border: "1px solid rgba(173, 187, 218, 0.12)",
      borderRadius: 24,
      padding: 32,
      boxShadow: "0 20px 50px -10px rgba(7, 9, 17, 0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      position: "relative",
      overflow: "hidden",
      textAlign: "left"
    }}>
      {/* Decorative radial blur glow */}
      <div style={{ position: "absolute", right: -30, top: -30, width: 140, height: 140, borderRadius: "50%", background: "#F59E0B", opacity: 0.12, filter: "blur(45px)" }} />
      
      {/* Google Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GoogleLogo style={{ width: 18, height: 18 }} />
          <span style={{ fontFamily: Fb, fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Google Business Profile</span>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 9999, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", fontFamily: Fd, fontSize: 9, color: "#10B981" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", display: "inline-block" }} /> Auto-Collect Active
        </span>
      </div>

      {/* Trust score metrics */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: Fh, fontSize: "3.2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>4.9</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
            {[0,1,2,3,4].map(i => <Star key={i} style={{ width: 13, height: 13, fill: "#F59E0B", color: "#F59E0B" }} />)}
          </div>
          <span style={{ fontFamily: Fb, fontSize: 11, color: C.textDim }}>Based on 428 patient ratings</span>
        </div>
      </div>

      {/* Growth Chart Mockup */}
      <div style={{ background: "rgba(11, 13, 25, 0.5)", border: "1px solid rgba(173, 187, 218, 0.08)", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: Fb, fontSize: 11, fontWeight: 600, color: C.textMuted }}>Review Growth</span>
          <span style={{ fontFamily: Fd, fontSize: 11, fontWeight: 700, color: "#10B981" }}>+397% volume</span>
        </div>
        
        {/* Simple Growth SVG chart */}
        <div style={{ height: 80, width: "100%", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 75 Q 50 70, 100 55 T 200 30 T 300 8 L 300 80 L 0 80 Z"
              fill="url(#chart-grad)"
            />
            <path
              d="M 0 75 Q 50 70, 100 55 T 200 30 T 300 8"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="300" cy="8" r="4" fill="#fff" stroke="#F59E0B" strokeWidth="2" />
          </svg>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: Fd, fontSize: 9, color: C.textDim, marginTop: 8 }}>
          <span>Before Stitch (86 reviews)</span>
          <span>Today (428 reviews)</span>
        </div>
      </div>

      <p style={{ fontFamily: Fb, fontSize: 12, color: C.textMuted, lineHeight: 1.45 }}>
        Sends Google review invites automatically when treatment finishes, generating consistent 5-star ratings without manual templates.
      </p>
    </div>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  return (
    <section id="stories" style={S.section()}>
      <div style={S.container()}>
        <SectionHeader eyebrow="Clinic stories" title="The work should feel lighter. The numbers should speak louder." body="Built for clinic leaders who want a more reliable route from first enquiry to next appointment." />
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, alignItems: "stretch" }}>
          
          {/* Left Column: Google Reviews Badge Dashboard */}
          <GoogleTrustDashboard />

          {/* Right Column: Staggered testimonial cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {testimonials.map((t, idx) => {
              const color = idx % 4 === 0 ? "#06B6D4" : idx % 4 === 1 ? "#3B82F6" : idx % 4 === 2 ? "#10B981" : "#7C3AED";
              return (
                <div key={t.quote} className="timeline-3d-item bento-card" style={{
                  background: "rgba(21, 25, 46, 0.55)",
                  border: "1px solid rgba(173, 187, 218, 0.12)",
                  borderLeft: `4px solid ${color}`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  boxShadow: "0 8px 25px -5px rgba(7, 9, 17, 0.45)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s ease"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[0,1,2,3,4].map(i => <Star key={i} style={{ width: 11, height: 11, fill: "#F59E0B", color: "#F59E0B" }} />)}
                    </div>
                    <span style={{ fontFamily: Fd, fontSize: 9, color: color, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Verified Outcome</span>
                  </div>
                  
                  <blockquote style={{ fontFamily: Fb, fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.5, marginBottom: 12 }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontFamily: Fb, fontSize: 11, fontWeight: 700, color: "#fff" }}>{t.name}</span>
                      <span style={{ fontFamily: Fb, fontSize: 11, color: C.textDim, marginLeft: 6 }}>— {t.clinic}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <CTAButton>Talk Through Your Clinic Goals</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={S.section(C.bgSecondary)}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader eyebrow="Questions, answered" title="Straight answers before you decide" />
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
          {faqs.map((faq, i) => (
            <div key={faq.question} style={{ borderBottom: i < faqs.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: Fb, fontSize: 14, fontWeight: 600, color: "#fff" }}>{faq.question}</span>
                <ChevronDown style={{ width: 16, height: 16, color: C.blue, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
                    <p style={{ padding: "0 24px 20px", fontFamily: Fb, fontSize: 13, lineHeight: 1.7, color: C.textMuted }}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <CTAButton>Ask Us About Your Setup</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA() {
  return (
    <section id="consultation" style={{ ...S.section(), position: "relative", overflow: "hidden", padding: "100px 0" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(112,145,230,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 20%, rgba(61,82,160,0.1) 0%, transparent 60%)" }} />
      <div style={{ ...S.container(), position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "grid", placeItems: "center", margin: "0 auto 24px" }}>
          <Sparkles style={{ width: 28, height: 28, color: "#fff" }} />
        </div>
        <h2 style={{ ...S.heading1(), marginBottom: 20, maxWidth: 700, margin: "0 auto 20px", fontSize: "clamp(2.2rem,5vw,3.6rem)" }}>
          Ready to grow your clinic with more consistency?
        </h2>
        <p style={{ ...S.bodyLg(), maxWidth: 600, margin: "0 auto 36px" }}>
          Stop losing patients, reduce staff workload, and build a more dependable path to monthly revenue with one complete operating system.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <CTAButton variant="white" href="mailto:info@autoxverse.com?subject=Free%20Consultation" large>Book My Free Consultation</CTAButton>
          <a href="#dashboard" style={{ ...S.btnGhost(), padding: "14px 32px", fontSize: "1rem" }}>
            <Play style={{ width: 16, height: 16 }} /> Watch live demo
          </a>
        </div>
        <p style={{ fontFamily: Fb, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>No hard sell. Just a clear view of where your clinic can recover time and revenue.</p>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const socials: [ElementType, string][] = [[Linkedin,"LinkedIn"],[Instagram,"Instagram"],[Facebook,"Facebook"],[Youtube,"YouTube"]];
  return (
    <footer style={{ background: "#050810", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "80px 0 40px" }}>
      <div style={S.container()}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 64 }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <AutoXverseLogo style={{ width: 28, height: 28, color: "#a78bfa" }} />
              <span style={{ fontFamily: Fh, fontWeight: 700, fontSize: 15, color: "#fff" }}>AutoXverse</span>
            </div>
            <p style={{ fontFamily: Fb, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 0 }}>
              The patient operating system for dental clinics ready to grow without adding unnecessary admin.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <p style={{ ...S.label(), color: C.textDim, marginBottom: 16 }}>Platform</p>
            {[
              { label: "Solutions", href: "#platform" },
              { label: "ROI Calculator", href: "#roi" },
              { label: "Clinic Stories", href: "#stories" }
            ].map(l => (
              <div key={l.label} style={{ marginBottom: 12 }}>
                <a href={l.href} style={{ fontFamily: Fb, fontSize: 13, color: C.textDim, textDecoration: "none" }}>{l.label}</a>
              </div>
            ))}
          </div>

          {/* Legal Pages */}
          <div>
            <p style={{ ...S.label(), color: C.textDim, marginBottom: 16 }}>Legal & Support</p>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Support", href: "mailto:info@autoxverse.com" }
            ].map(l => (
              <div key={l.label} style={{ marginBottom: 12 }}>
                <a href={l.href} style={{ fontFamily: Fb, fontSize: 13, color: C.textDim, textDecoration: "none" }}>{l.label}</a>
              </div>
            ))}
          </div>

          {/* Contact & Socials */}
          <div>
            <p style={{ ...S.label(), color: C.textDim, marginBottom: 16 }}>Contact Us</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Send style={{ width: 14, height: 14, color: C.blue, flexShrink: 0 }} />
              <a href="mailto:info@autoxverse.com" style={{ fontFamily: Fb, fontSize: 13, color: C.textDim, textDecoration: "none" }}>
                info@autoxverse.com
              </a>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(([Icon, label]) => (
                <a key={label} href="#" aria-label={label} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: C.textDim, display: "grid", placeItems: "center" }}>
                  <Icon style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontFamily: Fb, fontSize: 12, color: C.textDim, margin: 0 }}>
            &copy; 2025 AutoXverse. Built for modern dental clinics.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/privacy" style={{ fontFamily: Fb, fontSize: 12, color: C.textDim, textDecoration: "none" }}>Privacy</a>
            <a href="/terms" style={{ fontFamily: Fb, fontSize: 12, color: C.textDim, textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export function LandingPage() {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: Fb, overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <LogoStrip />
      <Outcomes />
      <Problems />
      <Platform />
      <HowItWorks />
      <RoiCalculator />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
