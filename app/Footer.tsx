import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-2 bg-gray-900 text-gray-400 text-sm flex justify-center items-center">
      <nav className="flex flex-wrap gap-4">
        <Link href="/legal/terms" className="hover:text-white transition">Terms</Link>
        <span className="opacity-50">|</span>
        <Link href="/legal/privacy" className="hover:text-white transition">Privacy</Link>
        <span className="opacity-50">|</span>
        <Link href="/legal/shipping" className="hover:text-white transition">Shipping</Link>
        <span className="opacity-50">|</span>
        <Link href="/legal/contact" className="hover:text-white transition">Contact</Link>
        <span className="opacity-50">|</span>
        <Link href="/legal/refunds" className="hover:text-white transition">Refunds</Link>
      </nav>
    </footer>
  );
}
