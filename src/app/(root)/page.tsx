import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const redirect = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||'vi';location.replace(/^en/i.test(l)?'/en/':'/vi/');})();`;

export default function RootPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-10 p-6 text-indigo">
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <Logo size="lg" />
      <div className="flex gap-6 text-sm">
        <Link href="/vi/" className="link-u">Tiếng Việt</Link>
        <Link href="/en/" className="link-u">English</Link>
      </div>
    </main>
  );
}
