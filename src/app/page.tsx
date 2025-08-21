import { GitHubIcon } from '@/components/icons/github';
import { HashnodeIcon } from '@/components/icons/hashnode';
import { LinkedInSquareIcon } from '@/components/icons/linkedin';
import { Section, SectionContent } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-muted ">
      {/* Hero */}
      <Section id="hero" className="relative overflow-hidden pt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
        <SectionContent className="relative text-center flex flex-col gap-4">
          <h1>Hi, I&apos;m Nathan Healea</h1>
          <h2>Software Engineer &amp; Full Stack Developer</h2>
          <p>
            Passionate about turning ideas into practical, real-world
            applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" className="">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>

          <div className="flex justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-serif">Oregon, United States</span>
            </div>
          </div>
        </SectionContent>
      </Section>

      <Section id="about" >
        <SectionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <Image
                src="/studio-ghibli-nathan-healea-circle-full.png"
                width={1022}
                height={1022}
                alt="Profile Avatar"
                className="w-64 h-64 rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-lg"
              />
            </div>
            <Card>
              <CardContent>
                <div className="flex justify-center flex-col gap-4">
                  <h2>About Me</h2>
                  <p>TBD</p>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="">
                      <GitHubIcon className="size-8" />
                    </div>
                    <div className="">
                      <LinkedInSquareIcon className="size-12" />
                    </div>
                    <div className="h-8 w-8 fill-primary">
                      <HashnodeIcon className="size-8" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContent>
      </Section>

      {/* Skills */}

      <Section id="skills" className='bg-primary/10'>
        <SectionContent>
          <h2 className="">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Frontend */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Frontend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                <Pill>React</Pill>
                <Pill>NextJS</Pill>
                <Pill>TypeScript</Pill>
                <Pill>Tailwind</Pill>
                <Pill>DaisyUI</Pill>
                <Pill>ShadCN</Pill>
                <Pill>Material UI</Pill>
                <Pill>SASS / CSS</Pill>
                <Pill>HTML5 / HTML</Pill>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Backend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                <Pill>Drupal</Pill>
                <Pill>DotNet / C#</Pill>
                <Pill>PHP</Pill>
                <Pill>Python</Pill>
                <Pill>SQL</Pill>
                <Pill>MySQL</Pill>
                <Pill>TSQL</Pill>
                <Pill>PostgreSQL</Pill>
                <Pill>Supabase</Pill>
              </CardContent>
            </Card>

            {/* Tools & Designs */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Tools & Designs</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                <Pill>Figma</Pill>
                <Pill>Adobe XD</Pill>
                <Pill>Git</Pill>
                <Pill>GitLab</Pill>
                <Pill>GitHub</Pill>
                <Pill>Azure</Pill>
                <Pill>Google Cloud</Pill>
                <Pill>Pantheon</Pill>
              </CardContent>
            </Card>

            {/* Concepts & Methodologies */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Concepts & Methodologies</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                <Pill>Software Development Life Cycle</Pill>
                <Pill>Project Management</Pill>
                <Pill>Microservices</Pill>
                <Pill>Agile Methodologies</Pill>
                <Pill>DevOps</Pill>
                <Pill>CI / CD</Pill>
                <Pill>Test-Driven Development</Pill>
              </CardContent>
            </Card>
          </div>
        </SectionContent>
      </Section>
    </main>
  );
}
