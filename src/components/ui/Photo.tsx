import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  ratio?: "4/5" | "3/2" | "1/1" | "3/4" | "16/9";
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  hover?: boolean;
};

const ratios = { "4/5": "aspect-[4/5]", "3/2": "aspect-[3/2]", "1/1": "aspect-square", "3/4": "aspect-[3/4]", "16/9": "aspect-video" };

/** Fixed-ratio image tile. Cropped with object-cover so placeholders and originals share layouts. */
export function Photo({ src, alt, ratio = "4/5", sizes = "(min-width: 1024px) 33vw, 100vw", priority, className = "", imgClassName = "", hover }: Props) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${ratios[ratio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={`object-cover ${hover ? "transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03]" : ""} ${imgClassName}`}
      />
    </div>
  );
}
