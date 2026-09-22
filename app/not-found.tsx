import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-khmer-serif mb-2 text-6xl font-bold text-primary">៤០៤</h1>
      <p className="mb-2 text-xl font-medium">រកមិនឃើញទំព័រ</p>
      <p className="mb-8 text-muted">Page not found</p>
      <Link href="/">
        <Button variant="primary" glow>
          ត្រឡប់ទៅទំព័រដើម
        </Button>
      </Link>
    </div>
  );
}
