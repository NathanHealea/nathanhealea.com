"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Contact() {
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
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <Card className="border-0 shadow-lg bg-card">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Let's Work Together</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to bring your next project to life? I'm always interested in discussing new opportunities and
                collaborating on innovative solutions.
              </p>

              <div className="space-y-4">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8" asChild>
                  <a href="mailto:nathan@example.com">Get in Touch</a>
                </Button>

                <p className="text-sm text-muted-foreground">
                  Or connect with me on{" "}
                  <a
                    href="https://linkedin.com/in/nathanhealea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
