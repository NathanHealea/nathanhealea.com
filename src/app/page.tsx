import { Section, SectionContent } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-muted ">
      {/* Hero */}
      <Section id="hero" className="relative overflow-hidden pt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
        <SectionContent className="relative text-center">
          <div className="mb-8">
            <Image
              src="/studio-ghibli-nathan-healea-circle-full.png"
              width={1022}
              height={1022}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-lg"
            />
            <h1 className="text-5xl font-bold text-foreground mb-4 font-sans">
              Nathan Healea
            </h1>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
              {/* TBD */}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="default" size="lg" className="">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>

          <div className="flex justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-serif">Oregon, United States</span>
            </div>
          </div>
        </SectionContent>
      </Section>
    </main>
  );
}
