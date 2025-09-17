import { Contact } from 'lucide-react';
import { About } from './components/about';
import { Experience } from './components/experience';
import { Hero } from './components/hero';
import { Projects } from './components/projects';
import { Skills } from './components/skills';
import { Footer } from '../../layout/footer';




export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}