'use client'

export default function FallbackImage({
  src,
  alt,
  fallback,
  className,
}: {
  src: string
  alt: string
  fallback: string
  className: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e: any) => {
        e.target.src = fallback
      }}
    />
  )
}
