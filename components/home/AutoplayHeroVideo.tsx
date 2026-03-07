export default function AutoplayHeroVideo() {
  const src =
    "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/85836e811a0dc245bad0e3996aa99695/iframe" +
    "?autoplay=true&muted=true&loop=true&preload=true&controls=false" +
    "&poster=https%3A%2F%2Fcustomer-wlq98rw65iepfe8g.cloudflarestream.com%2F85836e811a0dc245bad0e3996aa99695%2Fthumbnails%2Fthumbnail.jpg"

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">
            Our Story
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-midnight tracking-tight">
            Trusted. Local. Exceptional.
          </h2>
        </div>

        {/* Video */}
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden aspect-video bg-midnight"
            style={{
              boxShadow:
                "0 24px 64px rgba(11,26,44,0.18), 0 4px 16px rgba(11,26,44,0.10)",
              outline: "1px solid rgba(11,26,44,0.08)",
            }}
          >
            <iframe
              src={src}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
              title="Birchtree Financial promotional video"
              style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
