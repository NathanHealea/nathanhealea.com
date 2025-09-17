"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Users, Calendar } from "lucide-react"

export function Projects() {
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

  const featuredProject = {
    title: "Enterprise Banking Platform",
    description:
      "Led the development of a comprehensive online banking platform serving thousands of users. Implemented modern React architecture with Redux state management and integrated with legacy banking systems.",
    technologies: ["React", "Redux", "C#", ".NET Core", "Azure", "SQL Server"],
    image: "/modern-banking-dashboard.png",
    github: "#",
    demo: "#",
    stats: {
      users: "10K+",
      uptime: "99.9%",
      year: "2023",
    },
  }

  const otherProjects = [
    {
      title: "Healthcare Data Migration Tool",
      description:
        "Developed a NodeJS application to migrate COVID research data, ensuring CLIA compliance and university data retention policies.",
      technologies: ["Node.js", "SQL", "Microsoft Dataverse"],
      image: "/healthcare-data-dashboard.jpg",
      github: "#",
      demo: "#",
      highlight: "CLIA Compliant",
    },
    {
      title: "University Website Migration",
      description:
        "Managed migration of 70+ Drupal websites from Aegir to Pantheon, creating workflows and status reporting systems.",
      technologies: ["Drupal", "PHP", "Pantheon", "Jira"],
      image: "/university-website-interface.jpg",
      github: "#",
      demo: "#",
      highlight: "70+ Sites",
    },
    {
      title: "Serverless Credit Union App",
      description:
        "Architected the first public-facing serverless application for a Pacific Northwest credit union using Microsoft Azure.",
      technologies: ["React", "Azure Functions", "C#", "Serverless"],
      image: "/credit-union-mobile-app.jpg",
      github: "#",
      demo: "#",
      highlight: "First Serverless",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-muted/10 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing impactful solutions across banking, healthcare, and education sectors
            </p>
          </div>

          <Card className="mb-16 overflow-hidden group border-0 shadow-2xl bg-card/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 relative overflow-hidden">
                <img
                  src={featuredProject.image || "/placeholder.svg"}
                  alt={featuredProject.title}
                  className="w-full h-full min-h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {featuredProject.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{featuredProject.description}</CardDescription>
                </CardHeader>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-sm font-semibold text-primary">{featuredProject.stats.users}</div>
                    <div className="text-xs text-muted-foreground">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <div className="text-sm font-semibold text-primary">{featuredProject.stats.uptime}</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="text-sm font-semibold text-primary">{featuredProject.stats.year}</div>
                    <div className="text-xs text-muted-foreground">Year</div>
                  </div>
                </div>

                <CardContent className="p-0">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-muted text-foreground border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a href={featuredProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <Card
                key={project.title}
                className={`group relative overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 delay-${index * 100}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-accent/90 text-accent-foreground text-xs font-medium">
                      {project.highlight}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-border text-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    </Button>
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
