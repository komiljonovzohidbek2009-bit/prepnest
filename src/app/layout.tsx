import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PrepNest — Free SAT & IELTS Preparation",
  description:
    "Free SAT and IELTS preparation platform for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <Link href="/" className="logo">
            Prep<span>Nest</span>
          </Link>

          <nav>
            <Link href="/sat">SAT</Link>
            <Link href="/ielts">IELTS</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/progress">Progress</Link>

            <Link href="/login" className="signin-btn">
              Sign in
            </Link>
          </nav>
        </header>

        {children}

        <footer>
          <div className="footer-logo">
            Prep<span>Nest</span>
          </div>

          <p>Prepare. Practice. Progress.</p>

          <div className="footer-links">
            <Link href="/sat">SAT</Link>
            <Link href="/ielts">IELTS</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/resources">Resources</Link>
          </div>

          <small>© 2026 PrepNest. Free education for everyone.</small>
        </footer>
      </body>
    </html>
  );
}
