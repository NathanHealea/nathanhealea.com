"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
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

  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: ["React", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "Bootstrap", "Material UI", "SASS/SCSS"],
      icon: "🎨",
    },
    {
      title: "Backend Technologies",
      skills: ["C#", ".NET Core", ".NET Framework", "Node.js", "Express.js", "Python", "PHP"],
      icon: "⚙️",
    },
    {
      title: "Databases & Cloud",
      skills: ["SQL Server", "MySQL", "PostgreSQL", "CosmosDB", "Azure", "AWS", "Docker"],
      icon: "☁️",
    },
    {
      title: "Tools & Methodologies",
      skills: ["Git", "Azure DevOps", "Jira", "TDD", "Agile", "CI/CD", "REST APIs", "Microservices"],
      icon: "🛠️",
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Technical Skills</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit built through 8+ years of full-stack development across diverse industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className={`group relative overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 delay-${index * 100} ${
                  isVisible ? "animate-slide-in-left opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{category.icon}</div>
                    <CardTitle className="text-xl text-primary group-hover:text-secondary transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className={`transform transition-all duration-300 delay-${skillIndex * 50}`}
                        style={{
                          animationDelay: isVisible ? `${index * 200 + skillIndex * 50}ms` : "0ms",
                        }}
                      >
                        <Badge
                          variant="secondary"
                          className="w-full justify-center py-2 text-sm font-medium bg-muted text-foreground border-border hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                        >
                          {skill}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
