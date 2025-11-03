"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCarouselProps {
  images: {
    url: string;
    alt: string;
  }[];
  className?: string;
}

export function ProductCarousel({ images, className }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const goToPrevious = React.useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsAnimating(false), 400) // Slower transition
  }, [images.length, isAnimating])

  const goToNext = React.useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => setIsAnimating(false), 400) // Slower transition
  }, [images.length, isAnimating])

  const goToSlide = React.useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400) // Slower transition
  }, [isAnimating])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious()
      } else if (event.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={cn("relative group", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <div className="absolute inset-0 transition-all duration-400 ease-out">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            priority
            className={cn(
              "object-contain transition-all duration-400 ease-out",
              isAnimating 
                ? "scale-[0.97] opacity-95" 
                : "scale-100 opacity-100 transform-gpu"
            )}
          />
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={goToPrevious}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={goToNext}
            disabled={isAnimating}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
          
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  index === currentIndex 
                    ? "bg-white scale-125 transform-gpu" 
                    : "bg-white/50 hover:bg-white/75"
                )}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
} 