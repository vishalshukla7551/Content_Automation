import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 text-center bg-gray-100">
      <Link href="/legal/terms" className="mx-2 text-blue-600 hover:underline">Terms & Conditions</Link> | 
      <Link href="/legal/privacy" className="mx-2 text-blue-600 hover:underline">Privacy Policy</Link> | 
      <Link href="/legal/shipping" className="mx-2 text-blue-600 hover:underline">Shipping Policy</Link> | 
      <Link href="/legal/contact" className="mx-2 text-blue-600 hover:underline">Contact Us</Link> | 
      <Link href="/legal/refunds" className="mx-2 text-blue-600 hover:underline">Cancellation & Refunds</Link>
    </footer>
  );
}
