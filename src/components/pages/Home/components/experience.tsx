"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

export function Experience() {
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

  const experiences = [
    {
      title: "Analyst Programmer II",
      company: "University of Oregon",
      period: "Jan 2023 - Present",
      location: "Eugene, Oregon",
      description:
        "Leading Drupal development and website migrations. Managed migration of 70+ websites from Aegir to Pantheon. Created migration workflows and provided technical expertise in archiving COVID research data.",
      technologies: ["Drupal", "PHP", "Node.js", "C#", "MySQL", "Jira", "Microsoft Power Apps"],
    },
    {
      title: "Software Engineer III",
      company: "Providence Health Plan",
      period: "Nov 2022 - Jan 2023",
      location: "Remote",
      description:
        "Reduced development complexity by introducing new technology stack. Created centralized error display application and implemented new insurance card displays within HealthTrio CMS.",
      technologies: ["TypeScript", "Angular", "React", "Next.js", "C#", "AWS", "Auth0"],
    },
    {
      title: "Software Developer",
      company: "Maps Credit Union",
      period: "Mar 2022 - Oct 2022",
      location: "Salem, Oregon",
      description:
        "Led refactor of legacy React components implementing DRY principles. Expanded Online Banking features using Test Driven Development and deployed applications to Azure.",
      technologies: ["React", "C#", ".NET Framework", "Azure", "CosmosDB", "Bootstrap"],
    },
    {
      title: "Software Engineer II",
      company: "American Express",
      period: "Sep 2020 - Aug 2021",
      location: "Phoenix, Arizona",
      description:
        "Maintained enterprise software by expanding features and enhancing code maintainability. Led NodeJS upgrade for enterprise software and expanded Adhoc report querying interface.",
      technologies: ["React", "Jest", "C#", ".NET Core", "TypeScript", "Docker", "PostgreSQL"],
    },
    {
      title: "Software Developer II",
      company: "Northwest Community Credit Union",
      period: "Oct 2019 - Sep 2020",
      location: "Eugene, Oregon",
      description:
        "Developed applications for internal business units and member-facing products. Led deployment of applications into Microsoft Azure and brought modern JavaScript frameworks to the team.",
      technologies: ["React", "Redux", "C#", ".NET Core", "Node.js", "Azure", "Material UI"],
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Professional Experience</h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={`${exp.company}-${exp.period}`}
                className={`transition-all duration-700 delay-${index * 100} hover:shadow-lg ${
                  isVisible ? "animate-slide-in-left opacity-100" : "opacity-0"
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-secondary">{exp.company}</CardDescription>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
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
