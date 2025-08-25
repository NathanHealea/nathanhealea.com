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
import { ExternalLink, Mail, MapPin, Phone, Pi } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-muted ">
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
            <Button variant="default" size="lg">
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
                    <div>
                      <GitHubIcon className="size-8" />
                    </div>
                    <div>
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

      <Section id="skills" className="bg-primary/10">
        <SectionContent>
          <h2>Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend */}
            <Card className="grow h-full">
              <CardHeader>
                <CardTitle>
                  <h3>Frontend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <div>
                  <h4>Langauges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>TypeScript</Pill>
                    <Pill>JavaScript</Pill>
                    <Pill>SCSS/SASS</Pill>
                    <Pill>CSS</Pill>
                    <Pill>HTML</Pill>
                  </div>
                </div>
                <div>
                  <h4>Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>ReactJS</Pill>
                    <Pill>NextJS</Pill>
                    <Pill>VueJS</Pill>
                    <Pill>jQuery</Pill>
                    <Pill>Bootstrap</Pill>
                    <Pill>TailwindCSS</Pill>
                    <Pill>DaisyUI</Pill>
                    <Pill>Material UI</Pill>
                    <Pill>Kendo UI</Pill>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="grow h-full">
              <CardHeader>
                <CardTitle>
                  <h3>Backend</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <div>
                  <h4>Langauges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>C#</Pill>
                    <Pill>.NET Framework</Pill>
                    <Pill>.NET Core</Pill>
                    <Pill>NodeJS</Pill>
                    <Pill>PHP</Pill>
                    <Pill>Python</Pill>
                    <Pill>ExpressJS</Pill>
                  </div>
                </div>
                <div>
                  <h4>Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>MySQL</Pill>
                    <Pill>SQL</Pill>
                    <Pill>Microsoft SQL Server</Pill>
                    <Pill>PostgreSQL</Pill>
                    <Pill>CostmosDB</Pill>
                    <Pill>Oracle Pl/SQL</Pill>
                    <Pill>AWS DynamoDB</Pill>
                    <Pill>Miscrosft Database</Pill>
                    <Pill>Supabase</Pill>
                  </div>
                </div>
                <div>
                  <h4>Content Management Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Drupal</Pill>
                    <Pill>Wordpress</Pill>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database */}
            <Card className=" col-span-1 md:col-span-2 grow h-full w-full">
              <CardHeader>
                <CardTitle>
                  <h3>Technologies &amp; Skills</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <div>
                  <h4>DevOps &amp; Cloud</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Azure</Pill>
                    <Pill>Azure DevOps</Pill>
                    <Pill>AWS</Pill>
                    <Pill>Docker</Pill>
                    <Pill>Docker Swarm</Pill>
                    <Pill>Octopuse</Pill>
                    <Pill>Jenkins</Pill>
                    <Pill>IIS</Pill>
                  </div>
                </div>
                <div>
                  <h4>Project &amp; Worklow Management</h4>
                  <div className="flex flex-wrap gap-2`">
                    <Pill>Jira</Pill>
                    <Pill>Confluence</Pill>
                    <Pill>BitBucket</Pill>
                    <Pill>GitHub</Pill>
                    <Pill>Git</Pill>
                    <Pill>TFS</Pill>
                    <Pill>SonarQube</Pill>
                    <Pill>Bamboo</Pill>
                  </div>
                </div>
                <div>
                  <h4>Microsoft Ecosystem</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Microsoft Power Apps</Pill>
                    <Pill>Microsoft SQL Server Management Studio</Pill>
                    <Pill>XRM TookBox</Pill>
                    <Pill>Team Dynamics</Pill>
                    <Pill>Docker Swarm</Pill>
                    <Pill>Octopuse</Pill>
                    <Pill>Jenkins</Pill>
                    <Pill>IIS</Pill>
                  </div>
                </div>
                <div>
                  <h4>Other</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>AuthO</Pill>
                    <Pill>Vagrant</Pill>
                    <Pill>Birtrual Box</Pill>
                    <Pill>Google Maps API</Pill>
                    <Pill>Swagger</Pill>
                    <Pill>Team Foundation Server (TFS)</Pill>
                  </div>
                </div>
                <div>
                  <h4>Methodologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Agile</Pill>
                    <Pill>Scrum</Pill>
                    <Pill>Kanban</Pill>
                    <Pill>Waterfall</Pill>
                    <Pill>Test-Driven Development (TDD)</Pill>
                    <Pill>Change Management</Pill>
                    <Pill>REST API</Pill>
                    <Pill>Microservices</Pill>
                    <Pill>Software Development Life Cycle</Pill>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContent>
      </Section>
    </main>
  );
}
