import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden bg-paper px-6 py-24 text-center sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
          <Compass className="h-[22px] w-[22px] text-gold-dark" strokeWidth={1.6} />
        </div>
        <p className="mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
          404
        </p>
        <h1
          className="mt-4 font-heading font-bold tracking-tight text-midnight"
          style={{ fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)", lineHeight: 1.04 }}
        >
          Page not found
        </h1>
        <div
          className="mx-auto mt-5 h-px w-16"
          style={{
            background:
              "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
          }}
        />
        <p className="mx-auto mt-6 max-w-md text-lg text-midnight/65">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-midnight"
          >
            <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
              Contact us
            </span>
            <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
