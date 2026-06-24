'use client';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Code, Users, Zap, ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const projects = [
    {
      title: "Process Automation Suite",
      description: "A comprehensive system that transformed manual workflows into streamlined digital processes, reducing operation time by 70% while maintaining user-friendly interfaces.",
      tags: ["React", "Node.js", "PostgreSQL", "Docker"],
      link: "#",
      immediate: "Automated critical daily tasks",
      longTerm: "Scalable workflow engine for future processes"
    },
    {
      title: "Customer Analytics Dashboard",
      description: "Built an intuitive analytics platform that empowers non-technical users to gain insights from complex data, featuring real-time updates and customizable visualizations.",
      tags: ["Next.js", "D3.js", "Python", "FastAPI"],
      link: "#",
      immediate: "Clear visibility into key metrics",
      longTerm: "Self-service analytics reducing IT dependency"
    },
    {
      title: "Multi-Platform Integration Tool",
      description: "Developed a unified interface connecting disparate systems, allowing seamless data flow between platforms while maintaining security and performance standards.",
      tags: ["TypeScript", "GraphQL", "Redis", "AWS"],
      link: "#",
      immediate: "Connected isolated systems",
      longTerm: "Extensible architecture for future integrations"
    }
  ];

  const skills = [
    { category: "Frontend", tech: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", tech: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"] },
    { category: "Cloud & DevOps", tech: ["AWS", "Docker", "CI/CD", "Monitoring", "Security"] },
    { category: "Design & UX", tech: ["Figma", "User Research", "Accessibility", "Performance"] }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-900'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? darkMode 
            ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-700/50' 
            : 'bg-white/90 backdrop-blur-lg border-b border-slate-200/50'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nathan Healea
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-lg">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4 py-4 rounded-lg ${
              darkMode ? 'bg-slate-800/90' : 'bg-white/90'
            } backdrop-blur-lg`}>
              <div className="flex flex-col space-y-4 px-4">
                <a href="#about" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#projects" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#skills" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Hi There, 
              <br />
              I'm Nathan Healea
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Full Stack Engineer • Eugene, Oregon
            </p>
            <p className="text-lg opacity-75 max-w-3xl mx-auto leading-relaxed">
              I bridge immediate solutions with long-term vision, creating systems that empower everyday users. 
              Technology should simplify processes, not complicate them.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#projects"
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? 'border-slate-600 hover:bg-slate-800'
                  : 'border-slate-300 hover:bg-white'
              }`}
            >
              Let's Connect
            </a>
          </div>

          {/* Philosophy Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className={`p-6 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-slate-200/50'
            }`}>
              <Code className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="font-bold mb-2">Immediate + Long-term</h3>
              <p className="text-sm opacity-80">Solve today's problem while building tomorrow's foundation</p>
            </div>
            <div className={`p-6 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-slate-200/50'
            }`}>
              <Users className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="font-bold mb-2">User-Empowered</h3>
              <p className="text-sm opacity-80">Technology should empower, not overwhelm everyday users</p>
            </div>
            <div className={`p-6 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-slate-200/50'
            }`}>
              <Zap className="w-8 h-8 text-green-400 mb-4 mx-auto" />
              <h3 className="font-bold mb-2">Swiss Army Knife</h3>
              <p className="text-sm opacity-80">Adaptable across technologies, quick to learn what's needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center opacity-75 mb-12 max-w-2xl mx-auto">
            Each project demonstrates my dual approach: solving immediate needs while building scalable foundations
          </p>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 group ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70' 
                    : 'bg-white/70 border-slate-200/50 hover:bg-white/90'
                }`}
              >
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="opacity-80 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs font-semibold text-blue-400 mb-1">IMMEDIATE SOLUTION</div>
                  <div className="text-sm opacity-75 mb-2">{project.immediate}</div>
                  <div className="text-xs font-semibold text-green-400 mb-1">LONG-TERM VISION</div>
                  <div className="text-sm opacity-75">{project.longTerm}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 text-xs rounded-full ${
                        darkMode 
                          ? 'bg-slate-700 text-slate-300' 
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-semibold text-sm group-hover:translate-x-1 transform duration-300"
                >
                  View Project <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 ${
        darkMode ? 'bg-slate-900/50' : 'bg-slate-50/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Technology Stack</h2>
          <p className="text-center opacity-75 mb-12 max-w-2xl mx-auto">
            My swiss army knife approach means proficiency across the full stack, 
            with the ability to quickly adapt to new technologies as needed
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-lg border ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-slate-200/50'
                }`}
              >
                <h3 className="font-bold mb-4 text-lg">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.tech.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        darkMode 
                          ? 'bg-slate-700/50' 
                          : 'bg-slate-100'
                      }`}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-lg opacity-75 mb-8 max-w-2xl mx-auto">
            Looking for a developer who can bridge immediate needs with long-term vision? 
            I'd love to discuss how we can empower your users through thoughtful technology.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/yourusername"
              className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Mail size={24} />
            </a>
          </div>

          <a
            href="mailto:your.email@example.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Start a Conversation
          </a>

          <div className="mt-8 text-sm opacity-60">
            <p>Available for remote work or local opportunities in Eugene, Oregon</p>
            <p>Open to both full-time positions and freelance projects</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;