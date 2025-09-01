import Link from "next/link";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-text">&copy; 2025 Rass Homes. All rights reserved.</div>
        <div className="footer-links">
          <Link href="#" className="footer-link">Privacy Policy</Link>
          <Link href="#" className="footer-link">Terms of Service</Link>
          <Link href="#" className="footer-link">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
