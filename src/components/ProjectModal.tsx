import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  theme: 'dark' | 'light';
  onViewFullProject?: (projectId: number) => void;
}

export function ProjectModal({ project, onClose, theme, onViewFullProject }: ProjectModalProps) {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Define project-specific full details from AboutPage experience
  const getFullDetails = () => {
    if (project.id === 1) {
      return [
        'Delivered a rapid Agile build converting a detailed Figma design into a pixel-accurate, responsive React site with continuous client feedback.',
        'Implemented full-stack features using React, EmailJS, and PostgreSQL, including API-based form submissions and mailing-list integration.',
        'Ensured cross-browser accessibility and WCAG-aligned UI consistency across all breakpoints.',
        'Migrated deployment from Netlify to Cloudflare, configuring DNS, redirects, routing, and troubleshooting propagation issues.',
        'Conducted feasibility analysis of a legacy WordPress site; rebuilt it fully in React to ensure seamless navigation and eliminate WPEngine URL exposure.',
        'Added NYE updates to promote new events at Silent H.',
        'Undertook Klaviyo Newsletter technical redesign (to fix content disparities between light and dark modes). Successfully solved issue and assumed further Klaviyo responsibilities, including for Silent H\'s sister-brand Coterie.'
      ];
    }
    
    if (project.id === 2) {
      return [
        'Redesigned and rebuilt a production React website for an urban mobility and traffic-intelligence platform, translating complex technical concepts into a clear, client-facing interface.',
        'Implemented modular React components and responsive layouts to support scalability, maintainability, and future content expansion.',
        'Integrated interactive data visualizations and map-based UI elements to communicate platform capabilities effectively.',
        'Optimized layout structure, performance, and accessibility to meet modern web standards.',
        'Collaborated with stakeholders to iterate on content hierarchy, UX clarity, and technical accuracy.'
      ];
    }
    
    if (project.id === 3) {
      return [
        'Contributed to an AI-powered detection platform (under NDA), enhancing alert workflows, timeout logic, and UI functionality.',
        'Performed Linux-based testing of alert acknowledgement systems and implemented UI updates based on senior developer requests.',
        'Documented Git repositories, enforced repo structure standards, and supported onboarding with .env configuration.'
      ];
    }
    
    if (project.id === 4) {
      return [
        'Project Description: Obtained a working Python game demo designed for Brain Computer Interface (BCI) hardware, namely the head-mounted controller. The BCI headset requires eye-tracking calibration, and the game sought to provide pedagogy-based calibration through 5 game levels (four calibrative and one hedonistic). The game, which uses pirate-themed visual stimuli, was 80% complete by the end of our contract, with four out of five levels finished—each serving as a primary testing & calibration component. Users play the game solely via a head mounted controller, with no other input sources.',
        'Initiated team velocity by converting client requirements into user stories on Jira\'s Kanban Board, and continually utilized Jira to maintain working velocity. Jira\'s servers went offline during our contract, and we therefore migrated workflow to a GitLab Issue Board to prevent delays. Continually maintained and groomed our product backlog.',
        'Served as Scrum Master in daily scrums and assisted senior developers in breaking down tasks for junior developers. Alleviated blockers for junior members using real time solutions, and helping establish permanent fixes. Utilized Sprint Reviews & Retrospectives to plan future and better structure future sprints.',
        'Served as Version Control lead (Git), including code reviews, branch merging, Git hygiene, and merge conflicts. Troubleshot push issues for teammates, providing direct solutions for one-off blockers or permanent workarounds for more repetitive issues.',
        'Conceptualized and designed game functions, animations, and bug fixes, for example global data persistence—ensuring selections in Level 1 (e.g., pirate role assignments) remained consistent across all levels, and facilitated our addition of dynamic animations to replace the previous hardcoded ones.',
        'Monitored junior developers\' Git records for progress, providing 1-on-1 coding assistance or connecting peers for collaborative problem-solving. Mentored junior developers in animation implementation, helping them locate relevant code sections, understand functionality, and navigate Git workflows.',
        'Maintained comprehensive project documentation from inception, which formed the foundation of the final Closing Documentation submitted to the client. Authored the majority of the final report, providing a clear record of the development process, work history, and future recommendations.'
      ];
    }
    
    if (project.id === 5) {
      return [
        'Project Description: Peer Review System for Academia to collect feedback from students, and said feedback was used to determine student grades. This was a simulated work environment class serving real clients.',
        'Took the lead in the creation of a PHP-based website that was dynamically populated utilizing user-uploaded/specified SQL databases. The code was pre-existing but dysfunctional and was almost totally rebuilt.',
        'As a senior full stack developer, I developed the front-end of new web pages and the associated styling of the user interface (UI). I also added new backend functionalities (such as downloading a copy of SQL tables used and created in/on the website), and ensured their functionality through rigorous integrated testing.',
        'As I was a senior developer, I also was solely responsible for merging branches in our Git repo, and therefore for the resolution of any merge conflicts. Frequently, junior developers (and another, less experienced senior developer) broke our codebase, but I was able resolve these issues through a series of calculated git reverts/rebases to recover the last commit prior to the break. I was further responsible for code reviews (before merging to develop), and the final merge from develop into main.',
        'As a secondary role, I assumed the Technical Director\'s responsibilities due to the junior-skills of the team. This entailed, among other things, decomposing larger tasks into smaller manageable subtasks that could be better handled by our Junior members.',
        'Performed cloud migration of pre-existing PHPmyAdmin database and schema. Refined schema and altered relations such that they no longer produced errors upon execution of code. Wrote the code for the migration of the schema and the data in SQL language for cloud usage. Then worked with Dalhousie University staff to upload the schema and data into Azure SQL servers, and viewed and operated tests on it using TablePlus. One of our final tasks was to deploy the website, and said website was utilized in a course (I believe).',
        'Aided in interaction with the client, especially in Weekly Stand-Ups, and with progress reports in the form of Sprint Reviews.',
        'I am familiar with scrum & agile methodologies as I have used them extensively in this environment.',
        'Gained hands-on experience with Jira, Confluence, GitHub, GitLab, and Git Flow. Our full technical stack was PHP, XAMPP, and mySQL, with some usage of JavaScript for limited functionalities.'
      ];
    }
    
    if (project.id === 6) {
      return [
        'Project Description: Created a 3D Unity game inspired by Mario and designed to accommodate Brain Computer Interfaces (BCI). The game is playable with a headset that tracks eye movement, increasing accessibility for gamers. It was in testing development for the Neurocog. Imaging Lab at Dalhousie University.',
        'We worked with Unity Game Development Platform (and C#) to create a 3D platformer game that could be used by the Neurocognitive Lab for the purpose of BCI testing. The game\'s emphasis was on collecting stimulus response to ascertain the accuracy of data collected by the headset.',
        'As a Test Engineer, I worked on enhancing the quality of existing code base, including preparing for changing game parameters and player objects, changing physics setting, overhauling hardcoded player movement system (PMS) with dynamic movement, and testing the game via negative testing of PMS (functional-testing).',
        'Acquired skills related to Git conflict resolution for mismatching (conflicting) code. This formed the foundation of my knowledge that I applied during my tenure as a Senior Developer, where I was the lead for all things related to Git (and especially merge conflicts).',
        'I resolved a bug wherein the player was unable to stay on the map (they simply fell through), as well as other more complex bugs such as the player glitching through walls upon collision, or ensuring that the flicker rate (the mechanism for tracking eye movement) was indeed flickering at the set rate.'
      ];
    }
    
    return null;
  };
  
  // Define project-specific content
  const getProjectContent = () => {
    if (project.id === 1) { // Silent H Bar & Restaurant
      return {
        description: "Delivered a production restaurant website from approved Figma designs under rapid Agile timelines, followed by iterative post-launch updates across multiple contract re-engagements.",
        role: "Independent Web Development Contractor (Full Stack)",
        timeline: "Initial delivery: 1 week, September 2025\nOngoing updates across multiple follow-up contracts",
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'EmailJS', 'PostgreSQL', 'Cloudflare'],
        achievement: "Supported high-volume customer access via a production mobile menu used daily in a live restaurant environment.",
        challenge: "Converting a detailed Figma design into a pixel-accurate, responsive React implementation while meeting aggressive delivery timelines and accommodating ongoing client-driven changes.",
        solution: "Implemented a modular React architecture with API-driven form handling, mailing-list integration, and deployment migration from Netlify to Cloudflare, ensuring maintainability, accessibility, and reliable production hosting.",
        results: [
          "Production site launched and approved under initial one-week contract",
          "Legacy WordPress site fully rebuilt in React to eliminate WPEngine exposure",
          "Cloudflare deployment completed with DNS and routing reconfiguration",
          "Post-launch feature updates delivered under separate re-engagements (e.g., NYE event content)",
          "Ongoing responsibility assumed for Klaviyo newsletter infrastructure across Silent H and sister brand Coterie"
        ]
      };
    }
    
    if (project.id === 2) { // Currus AI (MetaCiti website and Dashboard)
      return {
        description: "Supporting a live AI-driven detection platform while improving reliability of alert workflows, maintaining NDA constraints, and modernizing legacy frontend code without disrupting production systems.",
        role: "Junior Full-Stack Developer",
        timeline: "June 2025 – Present",
        technologies: ['React', 'TypeScript', 'Linux', 'Git / GitLab', 'REST APIs'],
        achievement: "Improved reliability of production alert workflows through timeout and re-notification logic\nSupported onboarding and repository standardization across active development teams\nDelivered a modernized, accessible public-facing website from approved Figma designs",
        challenge: "Supporting a live AI-driven detection platform while improving reliability of alert workflows, maintaining NDA constraints, and modernizing legacy frontend code without disrupting production systems.",
        solution: "Analyzed and tested alert timeout behavior using Linux-based debugging, implemented UI updates in response to senior developer feedback, documented repository structure and workflows, and rebuilt the public-facing website into a cleaner, more maintainable React architecture based on approved Figma prototypes.",
        results: [
          "More reliable alert re-notification when acknowledgements were missed",
          "Cleaner repository structure and improved onboarding documentation",
          "Modern, accessible public website aligned with current web standards"
        ]
      };
    }
    
    if (project.id === 3) { // Currus AI (MetaCiti website and Dashboard)
      return {
        description: "Supporting a live AI-driven detection platform while improving reliability of alert workflows, maintaining NDA constraints, and modernizing legacy frontend code without disrupting production systems.",
        role: "Junior Full-Stack Developer",
        timeline: "June 2025 – Present",
        technologies: ['React', 'TypeScript', 'Linux', 'Git / GitLab', 'REST APIs'],
        achievement: "Improved reliability of production alert workflows through timeout and re-notification logic\nSupported onboarding and repository standardization across active development teams\nDelivered a modernized, accessible public-facing website from approved Figma designs",
        challenge: "Supporting a live AI-driven detection platform while improving reliability of alert workflows, maintaining NDA constraints, and modernizing legacy frontend code without disrupting production systems.",
        solution: "Analyzed and tested alert timeout behavior using Linux-based debugging, implemented UI updates in response to senior developer feedback, documented repository structure and workflows, and rebuilt the public-facing website into a cleaner, more maintainable React architecture based on approved Figma prototypes.",
        results: [
          "More reliable alert re-notification when acknowledgements were missed",
          "Cleaner repository structure and improved onboarding documentation",
          "Modern, accessible public website aligned with current web standards"
        ]
      };
    }
    
    if (project.id === 4) { // Zeuron (BCI Calibration Game)
      return {
        description: "Leading delivery of a multi-level BCI calibration game for head-mounted eye-tracking hardware, while coordinating a mixed-experience team, maintaining development velocity, and adapting workflows mid-project due to tooling outages.",
        role: "Development Director & Team Co-Lead",
        timeline: "January 2025 – April 2025",
        technologies: ['Python', 'Git / GitLab', 'Jira', 'Game Systems Design', 'Brain–Computer Interface (BCI) Integration'],
        achievement: "Delivered main testing & BCI calibration potions of game",
        challenge: "Leading delivery of a multi-level BCI calibration game for head-mounted eye-tracking hardware, while coordinating a mixed-experience team, maintaining development velocity, and adapting workflows mid-project due to tooling outages.",
        solution: "Translated client requirements into user stories, maintained and groomed the product backlog, and served as Scrum Master during daily scrums. Led version-control strategy, code reviews, and merge conflict resolution, while designing core game systems to support persistent calibration data across multiple levels. Migrated workflow from Jira to GitLab Issue Boards to prevent delivery delays during service outages.",
        results: [
          "Four calibration levels delivered and integrated into BCI testing workflow",
          "Stable Git workflow maintained across a multi-developer team",
          "Comprehensive closing documentation submitted to support future research and development"
        ]
      };
    }
    
    if (project.id === 5) { // Peer Review System for Academia
      return {
        description: "Stabilizing and rebuilding a dysfunctional PHP-based peer review system for real academic use, while supporting a junior-heavy team, managing version control risks, and coordinating delivery within a simulated client-facing environment.",
        role: "Senior Developer (Full Stack)",
        timeline: "May 2024 – September 2024",
        technologies: ['PHP', 'MySQL / Azure SQL', 'Git (GitHub / GitLab)', 'XAMPP', 'JavaScript'],
        achievement: "Rebuilt a dysfunctional peer review system into a stable, deployable academic service\nLed cloud migration of production database schema and data to Azure SQL\nMaintained codebase stability as sole merge authority across the team",
        challenge: "Stabilizing and rebuilding a dysfunctional PHP-based peer review system for real academic use, while supporting a junior-heavy team, managing version control risks, and coordinating delivery within a simulated client-facing environment.",
        solution: "Rebuilt core frontend and backend functionality of the system, adding new UI components and backend features to support database-driven workflows. Assumed responsibility for GitFlow enforcement, code reviews, and all branch merges, resolving frequent conflicts through targeted rebases and reversions. Performed full cloud migration of the database schema and data to Azure SQL, refining relations to eliminate execution errors and validating functionality through integrated testing.",
        results: [
          "Production system deployed and used in an academic course environment",
          "Cloud-hosted database schema successfully migrated and validated",
          "Consistent release stability maintained across a multi-developer team"
        ]
      };
    }
    
    if (project.id === 6) { // BCI-Compatible 3D Platformer Game
      return {
        description: "Developing and testing a Unity-based 3D platformer designed for BCI testing, where gameplay mechanics directly affected the accuracy and reliability of eye-tracking calibration data.",
        role: "Junior Game Developer & Test Engineer",
        timeline: "January 2024 – April 2024",
        technologies: ['Unity', 'C#', 'Git', 'Brain–Computer Interface (BCI)', 'Game Physics & Movement Systems'],
        achievement: "Improved stability and accuracy of a Unity-based BCI testing game",
        challenge: "Developing and testing a Unity-based 3D platformer designed for BCI testing, where gameplay mechanics directly affected the accuracy and reliability of eye-tracking calibration data.",
        solution: "Enhanced the existing codebase by redesigning player movement and physics systems, replacing hardcoded behaviors with dynamic logic. Performed functional and negative testing to validate calibration accuracy, resolved collision and boundary issues causing players to fall through environments, and verified flicker-rate behavior critical to eye-tracking data collection. Built early expertise in Git conflict resolution through collaborative development workflows.",
        results: [
          "Stable player movement and collision behavior restored",
          "Improved reliability of BCI calibration testing scenarios",
          "Production-ready testing environment delivered to research lab",
          "Resolved player physics and collision defects affecting test validity",
          "Established foundational Git conflict-resolution practices used in later senior roles"
        ]
      };
    }
    
    // Default content for other projects
    return {
      description: "This project showcases innovative design and development techniques, combining user-centric design with cutting-edge technology to create an exceptional digital experience.",
      role: "Lead Designer & Developer",
      timeline: "3 months",
      technologies: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
      achievement: "Featured on Awwards",
      challenge: "The main challenge was creating an interface that was both visually stunning and highly functional, while maintaining optimal performance across all devices.",
      solution: "We implemented a component-based architecture with advanced animations and micro-interactions, ensuring a smooth and engaging user experience throughout.",
      results: null // Will show default metrics
    };
  };

  const content = getProjectContent();
  const fullDetails = getFullDetails();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111111] border border-gray-800 shadow-2xl`}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-14 right-5 md:top-6 md:right-6 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-hover z-10"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
            <img
              src={project.modalImage || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl md:text-4xl mb-4">{project.title || 'Project Title'}</h2>
            
            <div className="flex gap-4 mb-6">
              <button 
                className="px-6 py-2 bg-white text-black rounded-full cursor-hover flex items-center gap-2 hover:shadow-lg transition-all"
                onClick={() => {
                  // Projects 3, 4, and 6 show video dialog
                  if (project.id === 3 || project.id === 4 || project.id === 6) {
                    setShowVideoDialog(true);
                  } else {
                    if (project.id === 1) {
                      window.open('https://www.silenth.ca', '_blank');
                    }
                    if (project.id === 2) {
                      window.open('https://mciti.netlify.app/', '_blank');
                    }
                  }
                }}
              >
                <ExternalLink className="w-4 h-4" />
                {project.id === 3 || project.id === 4 || project.id === 6 ? 'Video Demo' : 'Live Demo'}
              </button>
              <button className="px-6 py-2 border border-gray-700 rounded-full cursor-hover flex items-center gap-2 hover:border-white transition-all">
                <Github className="w-4 h-4" />
                Source Code
              </button>
              {project.id === 2 && (
                <div className="ml-auto flex items-center">
                  <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full text-xs whitespace-nowrap">
                    NOTE: Client updating site post-delivery, functionality may be impacted
                  </span>
                </div>
              )}
            </div>

            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              {content.description}
            </p>

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>ROLE</h3>
                <p className="text-lg">{content.role}</p>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>TIMELINE</h3>
                <p className="text-lg whitespace-pre-line">{content.timeline}</p>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>ACHIEVEMENTS</h3>
                <p className="text-lg whitespace-pre-line">{content.achievement}</p>
              </div>
            </div>

            {/* Case study sections */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl mb-4">Challenge</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {content.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-2xl mb-4">Solution</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {content.solution}
                </p>
              </div>

              {/* Full Details Dropdown */}
              {fullDetails && (
                <div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: showFullDetails ? 'auto' : 0,
                      opacity: showFullDetails ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-4 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-[#4d9eff] mb-3">Full Details</h4>
                      <ul className="space-y-2">
                        {fullDetails.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-400 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[#4d9eff]">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setShowFullDetails(!showFullDetails)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
                  >
                    <span>{showFullDetails ? 'Show Less' : 'Show Full Details'}</span>
                    <motion.div
                      animate={{ rotate: showFullDetails ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              )}

              <div>
                <h3 className="text-2xl mb-4">Results</h3>
                {content.results ? (
                  <ul className="space-y-3">
                    {content.results.map((result, index) => (
                      <li key={index} className={`flex items-start gap-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">150%</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Engagement Increase</div>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">45%</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Faster Load Time</div>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <div className="text-3xl mb-2">98%</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>User Satisfaction</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* View Full Project Button */}
            {onViewFullProject && (
              <button
                className="mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full cursor-hover flex items-center gap-2 transition-all"
                onClick={() => onViewFullProject(project.id)}
              >
                <ArrowRight className="w-4 h-4" />
                See in Projects Page
              </button>
            )}
          </div>
        </motion.div>

        {/* Video Demo Dialog */}
        {showVideoDialog && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideoDialog(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mb-4 text-4xl">🎥</div>
                <h3 className="text-xl font-semibold mb-3 text-white">Video Coming Soon</h3>
                <p className="text-gray-400 mb-6">
                  Pending authorization from NDA signatory
                </p>
                <button
                  onClick={() => setShowVideoDialog(false)}
                  className="px-6 py-2 bg-[#4d9eff] text-white rounded-lg hover:bg-[#3d8eef] transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}