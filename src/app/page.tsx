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

      <Section id="about">
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

      <Section id="skills" className="bg-primary/10">
        <SectionContent>
          <h2 className="">Skills & Expertise</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Frontend */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Frontend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>ReactJS</Pill>
                <Pill>NextJS</Pill>
                <Pill>VueJS</Pill>
                <Pill>jQuery</Pill>
                <Pill>Bootstrap</Pill>
                <Pill>TailwindCSS</Pill>
                <Pill>Material UI</Pill>
                <Pill>KendoUI</Pill>
                <Pill>TypeScript</Pill>
                <Pill>Javascript</Pill>
                <Pill>SCSS/SASS</Pill>
                <Pill>CSS</Pill>
                <Pill>HTML</Pill>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Backend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>NodeJS</Pill>
                <Pill>Drupal</Pill>
                <Pill>PHP</Pill>
                <Pill>C#</Pill>
                <Pill>.NET Framework</Pill>
                <Pill>.NET Core</Pill>
                <Pill>Python</Pill>
              </CardContent>
            </Card>

            {/* Database */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Database</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>MSSQL</Pill>
                <Pill>PostgreSQL</Pill>
                <Pill>CosmosDB</Pill>
                <Pill>DynamoDB</Pill>
                <Pill>Microsoft Dataverse</Pill>
                <Pill>MySQL</Pill>
                <Pill>Oracle PL/SQL</Pill>
              </CardContent>
            </Card>

            {/* Devops & Cloud */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>DevOps & Cloud</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>Azure</Pill>
                <Pill>AWS XD</Pill>
                <Pill>Pantheon</Pill>
                <Pill>Microsoft IIS</Pill>
                <Pill>Docker</Pill>
                <Pill>Rancher</Pill>
                <Pill>Vagrant/VirtualBox</Pill>
                <Pill>Azure DevOps</Pill>
                <Pill>Octopus</Pill>
                <Pill>Bamboo</Pill>
                <Pill>TFS</Pill>
              </CardContent>
            </Card>

            {/* Tools & Workflows */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Tools & Workflows</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>Jira</Pill>
                <Pill>Confluence</Pill>
                <Pill>bitbucket</Pill>
                <Pill>GitHub</Pill>
                <Pill>Git</Pill>
                <Pill>Team Dynamics</Pill>
                <Pill>Workfront</Pill>
                <Pill>XRM Toolbox</Pill>
                <Pill>SQL Server Management Studio</Pill>
                <Pill>SonarQube</Pill>
                <Pill>Jest</Pill>
              </CardContent>
            </Card>

            {/* Tools & Workflows */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Concepts & Methodologies</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Pill>
                  Agile/Scrum (sprint planning, story estimation, code reviews)
                </Pill>
                <Pill>Test Driven Development (TDD)</Pill>
                <Pill>
                  CI/CD pipelines (Azure DevOps, Octopus, Bamboo, Docker)
                </Pill>
                <Pill>
                  Code quality & security (refactoring, DRY principle, SonarQube
                  vulnerability scanning)
                </Pill>
                <Pill>Accessibility compliance (WCAG AA standards)</Pill>
                <Pill>
                  Change management (formal review board participation)
                </Pill>
                <Pill>
                  Data governance & compliance (CLIA, retention policies)
                </Pill>
                <Pill>
                  System migrations & upgrades (Drupal 7/9 → 10, Aegir →
                  Pantheon, NodeJS upgrades)
                </Pill>
                <Pill>
                  Cross-team collaboration & documentation (Confluence,
                  onboarding guides, knowledge capture)
                </Pill>
              </CardContent>
            </Card>
          </div>
        </SectionContent>
      </Section>
    </main>
  );
}
