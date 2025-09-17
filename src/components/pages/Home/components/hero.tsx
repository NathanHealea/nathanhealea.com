'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
        >
          <div className="w-32 h-32 mx-auto flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">
              Hi, I'm
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nathan Healea
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Full Stack Developer & Software Engineer
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl bg-transparent"
              asChild
            >
              <a href="mailto:contact@nathanhealea.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl bg-transparent"
              asChild
            >
              <a
                href="https://linkedin.com/in/nathanhealea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl bg-transparent"
              asChild
            >
              <a
                href="https://github.com/nathanhealea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
