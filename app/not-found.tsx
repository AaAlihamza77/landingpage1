import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#0B0D19", color: "#EDE8F5", fontFamily: "sans-serif", textAlign: "center", padding: "24px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "16px", color: "#3B82F6" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "24px" }}>Page Not Found</h2>
      <p style={{ color: "#8697C4", marginBottom: "32px", maxWidth: "400px", lineHeight: "1.6" }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" style={{ padding: "12px 24px", borderRadius: "9999px", background: "linear-gradient(135deg, #3D52A0, #7091E6)", color: "#fff", textDecoration: "none", fontWeight: "600" }}>
        Go Back Home
      </Link>
    </div>
  );
}
