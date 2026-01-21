import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BubbleMenu from './components/BubbleMenu';
// import { HelloCard } from './components/HelloCard';
import { ProfileCard } from './components/ProfileCard';
import { InfoCube } from './components/InfoCube';
import { SkillMatrix } from './components/SkillMatrix';
import { ActivityTimeline } from './components/ActivityTimeline';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ExperienceMap } from './components/ExperienceMap';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { AnimatedThemeToggler } from './components/AnimatedThemeToggler';
import { ProjectModal } from './components/ProjectModal';
import { CaseStudyPage } from './components/CaseStudyPage';
import { ProjectsPage } from './components/ProjectsPage';
import { AboutPage } from './components/AboutPage';
import { Home } from './pages/Home';
import { StatsBar } from './components/StatsBar';
import { ContactModal } from './components/ContactModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { trackPageView } from './utils/analytics';
import './styles/globals.css';

// Import images for ProfileCard
import iconPattern from 'figma:asset/1c106d8af8bb3cd1b97b128c08f0b37f00ed9a89.png';
import subjectImage from 'figma:asset/a001169128c5bca6a9577aec9121ffc7ea0a096c.png';
import miniAvatar from 'figma:asset/2cf5a99dc9fa1fb0c8cd1786327a5c2628d36126.png';
import grainTexture from 'figma:asset/57d9067b26665fb6aaa11e8cac6523c5fb7a5da4.png';
import cvFile from 'figma:asset/a772e554a7dad7ee8839521a8db6af8472cb9160.png';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentPage, setCurrentPage] = useState<string>('Dashboard');
  const [scrollToProjectId, setScrollToProjectId] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleViewFullProject = (projectId: number) => {
    setSelectedProject(null); // Close modal
    setCurrentPage('Projects'); // Navigate to Projects page
    setScrollToProjectId(projectId); // Set which project to scroll to
  };

  useEffect(() => {
    // Loading screen
    setTimeout(() => setLoading(false), 2500);
  }, []);

  // Suppress Three.js duplicate import warning (harmless bundler message)
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalLog = console.log;
    
    console.warn = (...args) => {
      const message = args[0]?.toString?.() || '';
      if (message.includes('Multiple instances of Three') || 
          message.includes('THREE.')) {
        return; // Suppress Three.js warnings
      }
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      const message = args[0]?.toString?.() || '';
      // Only suppress background analytics tracking errors, not dashboard errors
      if (message.includes('Error in analytics track endpoint') || 
          message.includes('Failed to track page view')) {
        return;
      }
      originalError.apply(console, args);
    };

    console.log = (...args) => {
      const message = args[0]?.toString?.() || '';
      if (message.includes('Multiple instances of Three') || 
          message.includes('WARNING: Multiple instances')) {
        return; // Suppress Three.js logs
      }
      originalLog.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
      console.log = originalLog;
    };
  }, []);

  // Track page views when the page changes
  useEffect(() => {
    if (!loading) {
      const path = currentPage === 'Dashboard' ? '/' : `/${currentPage.toLowerCase().replace(/\s+/g, '-')}`;
      trackPageView(path);
    }
  }, [currentPage, loading]);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Entrance animations for cards
        gsap.fromTo(
          '.dashboard-card',
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  // Keyboard navigation
  useEffect(() => {
    let ctrlKPressed = false;
    let ctrlKTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
      
      // Secret keyboard shortcut to access analytics: Ctrl/Cmd + K, then A
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        ctrlKPressed = true;
        // Reset after 2 seconds
        clearTimeout(ctrlKTimeout);
        ctrlKTimeout = setTimeout(() => {
          ctrlKPressed = false;
        }, 2000);
      } else if (ctrlKPressed && e.key === 'a') {
        e.preventDefault();
        setCurrentPage('Analytics');
        ctrlKPressed = false;
        clearTimeout(ctrlKTimeout);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(ctrlKTimeout);
    };
  }, [selectedProject]);

  // Reduced motion support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div 
      ref={containerRef} 
      className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} relative overflow-hidden transition-colors duration-500`}
    >
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground theme={theme} />
      <AnimatedThemeToggler theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      
      {/* BubbleMenu Navigation */}
      <BubbleMenu
        items={[
          {
            label: 'home',
            href: '#home',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
            onClick: () => setCurrentPage('Dashboard')
          },
          {
            label: 'projects',
            href: '#projects',
            ariaLabel: 'Projects',
            rotation: 5,
            hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' },
            onClick: () => setCurrentPage('Projects')
          },
          {
            label: 'about',
            href: '#about',
            ariaLabel: 'About',
            rotation: -3,
            hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
            onClick: () => setCurrentPage('About')
          },
          {
            label: 'contact',
            href: '#contact',
            ariaLabel: 'Contact',
            rotation: 8,
            hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
            onClick: () => {
              setCurrentPage('Dashboard');
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }
        ]}
        menuAriaLabel="Toggle navigation menu"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
      
      <div className={`relative z-10 ${
        currentPage === 'Projects' || currentPage === 'About' || currentPage === 'Home' 
          ? '' 
          : 'p-4 md:p-6'
      }`}>
        {currentPage === 'Analytics' ? (
          <AnalyticsDashboard />
        ) : currentPage === 'Case Study' ? (
          <CaseStudyPage theme={theme} onBack={() => setCurrentPage('Dashboard')} />
        ) : currentPage === 'Projects' ? (
          <ProjectsPage theme={theme} onBack={() => setCurrentPage('Dashboard')} scrollToProjectId={scrollToProjectId} />
        ) : currentPage === 'About' ? (
          <AboutPage theme={theme} onBack={() => setCurrentPage('Dashboard')} onNavigate={setCurrentPage} />
        ) : currentPage === 'Home' ? (
          <Home theme={theme} onNavigate={setCurrentPage} />
        ) : (
          <>
            <div className="max-w-[1600px] mx-auto mt-2" id="dashboard">
              {/* Section Header */}
              <div className="mb-6 px-4">
                <h2 className="text-white/30 text-sm tracking-wide">
                  Profile Overview
                </h2>
                <p className="text-white/20 text-[10px] tracking-wide mt-0.5">interact to explore</p>
              </div>
              
              {/* Bento Box Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-[280px] mb-4">
                {/* ProfileCard - takes double height (row-span-2) */}
                <div className="dashboard-card lg:row-span-2">
                  <ProfileCard
                    iconPattern={iconPattern}
                    subjectImage={subjectImage}
                    miniAvatar={miniAvatar}
                    grainUrl={grainTexture}
                    onContactClick={() => setShowContactModal(true)}
                    onViewCVClick={() => {
                      // Create a temporary link to download the CV
                      const link = document.createElement('a');
                      link.href = cvFile;
                      link.download = 'Zayd_Alnuweiri_CV.png';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    onNameClick={() => setCurrentPage('About')}
                  />
                </div>
                
                {/* InfoCube - single height */}
                <div className="dashboard-card">
                  <InfoCube theme={theme} />
                </div>
                
                {/* SkillMatrix - single height */}
                <div className="dashboard-card">
                  <SkillMatrix theme={theme} />
                </div>
                
                {/* ProjectsGrid - single height */}
                <div className="dashboard-card">
                  <ProjectsGrid 
                    theme={theme} 
                    onProjectClick={setSelectedProject} 
                    onProjectsClick={() => setCurrentPage('Projects')}
                  />
                </div>
                
                {/* ExperienceMap - single height */}
                <div className="dashboard-card">
                  <ExperienceMap theme={theme} />
                </div>
              </div>
              
              {/* Stats Bar - aligned with ProfileCard */}
              <div className="mb-4">
                <StatsBar theme={theme} />
              </div>
              
              {/* Contact */}
              <Contact theme={theme} />
            </div>
          </>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          theme={theme}
          onViewFullProject={handleViewFullProject}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        theme={theme}
      />
    </div>
  );
}