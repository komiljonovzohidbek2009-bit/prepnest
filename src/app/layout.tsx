import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PrepNest — Free SAT & IELTS Preparation",
  description:
    "PrepNest is a free SAT and IELTS preparation platform for students.",
  keywords: [
    "SAT preparation",
    "IELTS preparation",
    "SAT practice",
    "IELTS practice",
    "SAT Math",
    "SAT Reading and Writing",
    "IELTS Speaking",
    "IELTS Writing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="nav-container">
            <Link href="/" className="logo">
              Prep<span>Nest</span>
            </Link>

            <nav className="desktop-nav">
              <Link href="/sat">SAT</Link>
              <Link href="/ielts">IELTS</Link>
              <Link href="/practice">Practice</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/progress">Progress</Link>
              <Link href="/planner">Planner</Link>

              <Link href="/login" className="nav-signin">
                Sign in
              </Link>
            </nav>

            <Link href="/login" className="mobile-signin">
              Sign in
            </Link>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div>
                <Link href="/" className="footer-logo">
                  Prep<span>Nest</span>
                </Link>

                <p className="footer-description">
                  Prepare. Practice. Progress.
                </p>
              </div>

              <div className="footer-column">
                <h4>Learn</h4>
                <Link href="/sat">SAT</Link>
                <Link href="/ielts">IELTS</Link>
                <Link href="/practice">Practice</Link>
              </div>

              <div className="footer-column">
                <h4>Tools</h4>
                <Link href="/planner">Study Planner</Link>
                <Link href="/progress">Progress</Link>
                <Link href="/resources">Resources</Link>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 PrepNest</span>
              <span>Free education for students.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
