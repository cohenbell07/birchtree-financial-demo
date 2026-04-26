/**
 * HeroBackground — server-rendered, paint-only.
 *
 * Previously this component subscribed to scroll, ran four large blurred blobs
 * (60–100px blur) plus three parallax orbs, and pinned each as a GPU layer via
 * will-change. On mobile that combination is the single biggest jank source on
 * the home page. Replacing it with a static, server-rendered gradient mesh +
 * two CSS-animated blobs (paused on coarse-pointer devices via globals.css)
 * removes the scroll subscriber entirely, drops the layer count from ~7 to 2,
 * and ships zero JS for the hero background.
 */
export default function HeroBackground() {
  return (
    <>
      {/* Deep base — near-black with warmth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #050c16 0%, #0B1A2C 25%, #0e1f34 50%, #081525 75%, #060e1a 100%)',
        }}
      />

      {/* Aurora mesh — two animated layers, paint-only on mobile */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[30%] left-[10%] w-[80%] h-[70%] rounded-full aurora-blob-1"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(21, 36, 57, 0.55) 0%, rgba(21, 36, 57, 0.18) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[15%] w-[65%] h-[65%] rounded-full aurora-blob-3"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(15, 28, 46, 0.5) 0%, rgba(15, 28, 46, 0.15) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Atmospheric vignette — deep corners */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(5, 12, 22, 0.5) 100%)',
        }}
      />

      {/* Subtle grid pattern — financial DNA */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(215, 195, 138, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215, 195, 138, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gold accent glow — single static radial, no blur, no animation */}
      <div
        aria-hidden
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(215, 195, 138, 0.05) 0%, transparent 60%)',
        }}
      />

      {/* Grain overlay for texture depth */}
      <div aria-hidden className="absolute inset-0 grain-overlay pointer-events-none" />
    </>
  )
}
