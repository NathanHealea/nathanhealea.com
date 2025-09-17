"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <Card className="border-0 shadow-lg bg-card">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">About Me</h2>
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">📸</span>
                </div>
              </div>

              <div className="space-y-6 text-center max-w-2xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm Nathan. Full Stack Developer & Software Engineer in Oregon. Here's what I actually do: I take
                  complex business requirements and turn them into scalable software solutions.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Not just "make it work" - actually architect systems that perform at scale while being maintainable.
                  Most developers can code. Most architects can't implement. I do both.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  I've built enterprise solutions for banking, healthcare, and education sectors because I actually
                  understand both the technical and business sides. My 8+ years of experience prove it.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  The result? Software that doesn't just meet requirements - it exceeds expectations and drives business
                  value.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
