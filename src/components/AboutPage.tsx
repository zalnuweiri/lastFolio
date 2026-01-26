import { motion } from 'motion/react';
import ColorBends from './ColorBends';
import { User, Code, Heart, Zap, Award, Coffee, Briefcase, Calendar, MapPin, GraduationCap, Layers, Database, Terminal, Palette, Download, Mail, Linkedin, Github, ExternalLink, TrendingUp, Target, BookOpen, ChevronDown, ChevronUp, Search, Play } from 'lucide-react';
import React from 'react';
import profileImage from 'figma:asset/1b614c1c36fe408dce982a8e7d6847c05e2614ac.png';
import dalShield from 'figma:asset/7a3b34109acfde89359d9edb240579b0309ff09f.png';
import { CompactAudioPlayer } from './CompactAudioPlayer';
import cvFile from 'figma:asset/a772e554a7dad7ee8839521a8db6af8472cb9160.png';

interface AboutPageProps {
  theme: 'light' | 'dark';
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function AboutPage({ theme, onBack, onNavigate }: AboutPageProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([]);
  const [skillSearch, setSkillSearch] = React.useState('');
  const [expandedExperience, setExpandedExperience] = React.useState<number[]>([]);
  const [showVideoDialog, setShowVideoDialog] = React.useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const [showZeuronVideo, setShowZeuronVideo] = React.useState(false);
  const [showZeuronJuniorVideo, setShowZeuronJuniorVideo] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const zeuronVideoRef = React.useRef<HTMLVideoElement>(null);
  const zeuronJuniorVideoRef = React.useRef<HTMLVideoElement>(null);
  // NEW FEATURE 1: State for tracking which video is currently selected (Admin or Student view)
  const [selectedVideoView, setSelectedVideoView] = React.useState<'admin' | 'student'>('admin');
  // NEW FEATURE 3: State for tracking video playback speed
  const [playbackSpeed, setPlaybackSpeed] = React.useState<number>(1);
  const [zeuronPlaybackSpeed, setZeuronPlaybackSpeed] = React.useState<number>(1);
  const [zeuronJuniorPlaybackSpeed, setZeuronJuniorPlaybackSpeed] = React.useState<number>(1);

  const homeStats = [
    { value: '5+', label: 'Years Production Software' },
    { value: '6', label: 'Industries Served' },
    { value: '6', label: 'Projects Shipped to Market' },
  ];

  const quickFacts = [
    { icon: MapPin, label: 'Location', value: 'Toronto, ON' },
    { icon: Briefcase, label: 'Availability', value: 'Open to Opportunities', isAvailable: true },
    { icon: Linkedin, label: 'LinkedIn', value: '/zayd-alnuweiri', link: 'https://www.linkedin.com/in/zayd-alnuweiri/' },
    { icon: Code, label: 'Currently', value: 'Working on a Web Dev Contract' },
    { icon: Github, label: 'GitHub', value: '/zalnuweiri', link: 'https://github.com/zalnuweiri' },
    { icon: Mail, label: 'Email', value: 'zhmalnuweiri@gmail.com', link: 'mailto:zhmalnuweiri@gmail.com' },
  ];

  const techStack = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Motion', 'Redux', 'React Query'],
    backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Intellij IDE', 'Postman', 'CI/CD'],
  };

  const coreStrengths = [
    { label: 'Full-Stack Development' },
    { label: 'Performance Optimization' },
    { label: 'User-Centric Design' },
    { label: 'Team Collaboration' },
  ];

  const currently = {
    working: 'AI Dashboard & Product Site for Currus AI/MetaCiti',
    learning: 'WebGL, Three.js, and advanced animation techniques',
    exploring: 'AI/ML integration in web applications',
    openTo: 'Full-time roles, contract work, and exciting collaborations'
  };

  const experience = [
    {
      title: 'Web Development Contractor (Fullstack)',
      company: 'Silent H Bar/Restaurant',
      location: 'Toronto, Canada',
      period: 'September 2025 - December 2025',
      description: 'Delivered a rapid Agile build converting a detailed Figma design into a pixel-accurate, responsive React site with continuous client feedback.',
      demoLink: 'https://www.silenth.ca',
      highlights: [
        'Implemented full-stack features using React, EmailJS, and PostgreSQL',
        'Migrated deployment from Netlify to Cloudflare with DNS configuration',
        'Rebuilt legacy WordPress site fully in React',
        'Redesigned Klaviyo Newsletter technical architecture'
      ],
      fullDetails: [
        'Delivered a rapid Agile build converting a detailed Figma design into a pixel-accurate, responsive React site with continuous client feedback.',
        'Implemented full-stack features using React, EmailJS, and PostgreSQL, including API-based form submissions and mailing-list integration.',
        'Ensured cross-browser accessibility and WCAG-aligned UI consistency across all breakpoints.',
        'Migrated deployment from Netlify to Cloudflare, configuring DNS, redirects, routing, and troubleshooting propagation issues.',
        'Conducted feasibility analysis of a legacy WordPress site; rebuilt it fully in React to ensure seamless navigation and eliminate WPEngine URL exposure.',
        'Added NYE updates to promote new events at Silent H.',
        'Undertook Klaviyo Newsletter technical redesign (to fix content disparities between light and dark modes). Successfully solved issue and assumed further Klaviyo responsibilities, including for Silent H\'s sister-brand Coterie.'
      ]
    },
    {
      title: 'Junior Developer (Fullstack)',
      company: 'Currus AI',
      location: 'Toronto, Canada',
      period: 'June 2025 - Current',
      description: 'Contributed to an AI-powered detection platform (under NDA), enhancing alert workflows, timeout logic, and UI functionality.',
      demoLink: 'https://mciti.netlify.app/',
      highlights: [
        'Performed Linux-based testing of alert acknowledgement systems',
        'Documented Git repositories and enforced repo structure standards',
        'Redesigned and rebuilt company website from Figma prototype'
      ],
      fullDetails: [
        'Contributed to an AI-powered detection platform (under NDA), enhancing alert workflows, timeout logic, and UI functionality.',
        'Performed Linux-based testing of alert acknowledgement systems and implemented UI updates based on senior developer requests.',
        'Documented Git repositories, enforced repo structure standards, and supported onboarding with .env configuration.',
        'Redesigned and rebuilt the company\'s website from an approved Figma prototype into a modern, accessible React architecture.'
      ]
    },
    {
      title: 'Development Director and Team Co-Lead',
      company: 'Zeuron',
      location: 'Halifax, Canada',
      period: 'January 2025 - April 2025',
      description: 'Led open-source BCI game development project with Python/Unity, delivering 80% complete pirate-themed calibration game for head-mounted controllers.',
      demoLink: '#',
      highlights: [
        'Served as Scrum Master managing Jira/GitLab workflows',
        'Led version control, code reviews, and merge conflict resolution',
        'Mentored junior developers and maintained comprehensive documentation',
        'Designed global data persistence and dynamic animation systems'
      ],
      fullDetails: [
        'Project Description: Obtained a working Python game demo designed for Brain Computer Interface (BCI) hardware, namely the head-mounted controller. The BCI headset requires eye-tracking calibration, and the game sought to provide pedagogy-based calibration through 5 game levels (four calibrative and one hedonistic). The game, which uses pirate-themed visual stimuli, was 80% complete by the end of our contract, with four out of five levels finished—each serving as a primary testing & calibration component. Users play the game solely via a head mounted controller, with no other input sources.',
        'Initiated team velocity by converting client requirements into user stories on Jira\'s Kanban Board, and continually utilized Jira to maintain working velocity. Jira\'s servers went offline during our contract, and we therefore migrated workflow to a GitLab Issue Board to prevent delays. Continually maintained and groomed our product backlog.',
        'Served as Scrum Master in daily scrums and assisted senior developers in breaking down tasks for junior developers. Alleviated blockers for junior members using real time solutions, and helping establish permanent fixes. Utilized Sprint Reviews & Retrospectives to plan future and better structure future sprints.',
        'Served as Version Control lead (Git), including code reviews, branch merging, Git hygiene, and merge conflicts. Troubleshot push issues for teammates, providing direct solutions for one-off blockers or permanent workarounds for more repetitive issues.',
        'Conceptualized and designed game functions, animations, and bug fixes, for example global data persistence—ensuring selections in Level 1 (e.g., pirate role assignments) remained consistent across all levels, and facilitated our addition of dynamic animations to replace the previous hardcoded ones.',
        'Monitored junior developers\' Git records for progress, providing 1-on-1 coding assistance or connecting peers for collaborative problem-solving. Mentored junior developers in animation implementation, helping them locate relevant code sections, understand functionality, and navigate Git workflows.',
        'Maintained comprehensive project documentation from inception, which formed the foundation of the final Closing Documentation submitted to the client. Authored the majority of the final report, providing a clear record of the development process, work history, and future recommendations.'
      ]
    },
    {
      title: 'Senior Developer (Full Stack)',
      company: 'Dalhousie University',
      location: 'Halifax, Canada',
      period: 'May 2024 - September 2024',
      description: 'Led development of PHP-based peer review system for academia, rebuilding dysfunctional codebase and managing cloud database migration to Azure SQL.',
      demoLink: '#',
      highlights: [
        'Sole responsibility for Git branch merging and conflict resolution',
        'Performed cloud migration of PHPmyAdmin database to Azure SQL',
        'Conducted code reviews and managed deployment',
        'Led weekly stand-ups and sprint reviews with clients'
      ],
      fullDetails: [
        'Project Description: Peer Review System for Academia to collect feedback from students, and said feedback was used to determine student grades. This was a simulated work environment class serving real clients.',
        'Took the lead in the creation of a PHP-based website that was dynamically populated utilizing user-uploaded/specified SQL databases. The code was pre-existing but dysfunctional and was almost totally rebuilt.',
        'As a senior full stack developer, I developed the front-end of new web pages and the associated styling of the user interface (UI). I also added new backend functionalities (such as downloading a copy of SQL tables used and created in/on the website), and ensured their functionality through rigorous integrated testing.',
        'As I was a senior developer, I also was solely responsible for merging branches in our Git repo, and therefore for the resolution of any merge conflicts. Frequently, junior developers (and another, less experienced senior developer) broke our codebase, but I was able resolve these issues through a series of calculated git reverts/rebases to recover the last commit prior to the break. I was further responsible for code reviews (before merging to develop), and the final merge from develop into main.',
        'As a secondary role, I assumed the Technical Director\'s responsibilities due to the junior-skills of the team. This entailed, among other things, decomposing larger tasks into smaller manageable subtasks that could be better handled by our Junior members.',
        'Performed cloud migration of pre-existing PHPmyAdmin database and schema. Refined schema and altered relations such that they no longer produced errors upon execution of code. Wrote the code for the migration of the schema and the data in SQL language for cloud usage. Then worked with Dalhousie University staff to upload the schema and data into Azure SQL servers, and viewed and operated tests on it using TablePlus. One of our final tasks was to deploy the website, and said website was utilized in a course (I believe).',
        'Aided in interaction with the client, especially in Weekly Stand-Ups, and with progress reports in the form of Sprint Reviews.',
        'I am familiar with scrum & agile methodologies as I have used them extensively in this environment.',
        'Gained hands-on experience with Jira, Confluence, GitHub, GitLab, and Git Flow. Our full technical stack was PHP, XAMPP, and mySQL, with some usage of JavaScript for limited functionalities.'
      ]
    },
    {
      title: 'Part-time Tutor/Lecturer',
      company: 'Independent Tutoring Services',
      location: 'Halifax, Canada',
      period: 'May 2024 - September 2024',
      description: 'Created lesson plans and lectures for software engineering and web development, emphasizing GitFlow best practices and merge conflict strategies.',
      highlights: [
        'Designed curriculum around student needs and feedback',
        'Guided teams in iterative PHP site development',
        'Taught advanced Git workflows and merge conflict resolution'
      ],
      fullDetails: [
        'As part of a grant-funded initiative, I tutored on behalf of a small start-up in Halifax that was initiated by a classmate.',
        'Created lesson plans and lectures based on user-input. Lessons were, therefore, curated around what students indicated they most needed assistance with. Classes began with general lectures covering relevant concepts (e.g. connecting an SQL database to a PHP site, populating pages dynamically, etc.)',
        'Guided student teams in the process of iteratively developing a small PHP site, emphasizing GitFlow so as to impart correct Git hygiene and reducing the potential for fatal errors that make the codebase unavailable.',
        'Lastly, my final courses were in teaching Merge Conflict strategies and tools, including DiffMerge and the built in Merge Conflict tool(s) on GitLab.'
      ]
    },
    {
      title: 'Junior Game Developer and Test Engineer',
      company: 'Zeuron',
      location: 'Halifax, Canada',
      period: 'January 2024 - April 2024',
      description: 'Created 3D Unity game (C#) for Brain Computer Interface testing with Neurocognitive Imaging Lab, focusing on eye-tracking accessibility.',
      demoLink: '#',
      highlights: [
        'Overhauled hardcoded player movement with dynamic systems',
        'Resolved complex physics bugs and collision issues',
        'Developed Git conflict resolution expertise'
      ],
      fullDetails: [
        'Project Description: Created a 3D Unity game inspired by Mario and designed to accommodate Brain Computer Interfaces (BCI). The game is playable with a headset that tracks eye movement, increasing accessibility for gamers. It was in testing development for the Neurocog. Imaging Lab at Dalhousie University.',
        'We worked with Unity Game Development Platform (and C#) to create a 3D platformer game that could be used by the Neurocognitive Lab for the purpose of BCI testing. The game\'s emphasis was on collecting stimulus response to ascertain the accuracy of data collected by the headset.',
        'As a Test Engineer, I worked on enhancing the quality of existing code base, including preparing for changing game parameters and player objects, changing physics setting, overhauling hardcoded player movement system (PMS) with dynamic movement, and testing the game via negative testing of PMS (functional-testing).',
        'Acquired skills related to Git conflict resolution for mismatching (conflicting) code. This formed the foundation of my knowledge that I applied during my tenure as a Senior Developer, where I was the lead for all things related to Git (and especially merge conflicts).',
        'I resolved a bug wherein the player was unable to stay on the map (they simply fell through), as well as other more complex bugs such as the player glitching through walls upon collision, or ensuring that the flicker rate (the mechanism for tracking eye movement) was indeed flickering at the set rate.'
      ]
    },
    {
      title: 'Lead Intern for Recruitment',
      company: 'LMIFG (iA Financial Group)',
      location: 'Remote, Canada',
      period: 'June 2023 - January 2024',
      description: 'Administered recruitment process for new interns and built SQL database to streamline multi-step hiring workflows.',
      highlights: [
        'Built MySQL database for applicant tracking',
        'Managed communication and progress tracking',
        'Supported sales team with client outreach'
      ],
      fullDetails: [
        'Administered the recruitment process for new interns, including initial communication, appointments, employment quizzes and tracking progress through the multi-step hiring process.',
        'Built a SQL database (DB) to simplify the administrative tasks, utilizing mySQL to create simple, practical queries that enabled for easy contacting of applicants throughout the various phases of the hiring process.',
        'Supported the sales team administratively when required with client outreach and acquisition.'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Currus AI',
      location: 'Orlando, Florida',
      period: 'May 2022 - September 2022',
      description: 'Utilized Node.js, React, and Java to create web-based version of Python desktop application, applying MVC principles.',
      highlights: [
        'Converted Python logic to JavaScript/Java',
        'Implemented full-stack features with MongoDB and React',
        'Ensured data integrity through server-side validation'
      ],
      fullDetails: [
        'Utilized Node.js, React, and Java to help create a web-based version of a python, desktop-based application. This entailed learning the functions in the original, Python-based application and replicating them in JavaScript and/or Java, or otherwise transferring logic from Python to Java.',
        'Utilized node.js, react, MongoDB, Honeydew, and node package manager (NPM) to push user-generated information through the server, ensuring that data inputted by the user into the front-end maintained integrity while being pushed into our DBs.',
        'Experienced full-stack development firsthand and learned how to apply Model View Controller (MVC) principles in a web development setting.'
      ]
    },
    {
      title: 'Lab Assistant',
      company: 'Texas A&M University Petroleum Laboratory',
      location: 'Doha, Qatar',
      period: 'September 2019 - December 2019',
      description: 'Supported laboratory experiments on GTL fuel properties, produced scientific documentation, and presented findings.',
      highlights: [
        'Assisted with laboratory experiments on GTL fuel properties',
        'Produced scientific documentation and reports',
        'Presented research findings to faculty and peers'
      ],
      fullDetails: [
        'Supported laboratory experiments on Gas-to-Liquids (GTL) fuel properties, working alongside researchers to conduct controlled tests and gather data.',
        'Produced comprehensive scientific documentation of experimental procedures, results, and analysis.',
        'Presented research findings to faculty members and fellow students, communicating complex technical information effectively.'
      ]
    },
    {
      title: 'Technical & Editorial Director of Event Production',
      company: 'Fetish Record Label',
      location: 'New York City, USA',
      period: 'June 2018 - January 2022',
      description: 'Managed digital content, contributed to a PHP-to-React migration, and coordinated website + media presence.',
      highlights: [
        'Managed digital content and media strategy',
        'Contributed to PHP-to-React website migration',
        'Coordinated website and social media presence'
      ],
      fullDetails: [
        'Managed digital content strategy and editorial direction for event production and promotional materials.',
        'Contributed to the technical migration of the company website from PHP to React, modernizing the tech stack and improving performance.',
        'Coordinated comprehensive website and media presence across multiple platforms, ensuring consistent branding and messaging.',
        'Oversaw event production coordination, aligning digital content with live events and promotional campaigns.'
      ]
    },
    {
      title: 'Customer Service & Marketing Agent',
      company: 'Al Markhiya Art Gallery',
      location: 'Doha, Qatar',
      period: 'January 2015 - June 2018',
      description: 'Assisted with marketing materials, customer outreach, and supported early web presence development.',
      demoLink: 'https://almarkhiyagallery.com/',
      highlights: [
        'Created marketing materials and managed customer outreach',
        'Developed gallery\'s web presence and event posting site',
        'Organized social media presence across multiple platforms'
      ],
      fullDetails: [
        'Assisted with creating marketing materials and managing customer outreach initiatives to promote gallery exhibitions and events.',
        'Gained exposure to Web Development by helping to code and develop the gallery\'s web presence, creating a site to house event postings, images of paintings, and more.',
        'Helped organize their social media presence by creating associated pages for them on various platforms, including the now-Meta owned ones like Instagram and Facebook.',
        'Supported the gallery in establishing their digital footprint during the early stages of their online expansion.'
      ]
    },
    {
      title: 'Youth Basketball Coach',
      company: 'American School of Doha',
      location: 'Doha, Qatar',
      period: 'November 2014 - May 2018',
      description: 'Coached youth teams and collaborated with staff on training plans.',
      highlights: [
        'Coached youth basketball teams across multiple age groups',
        'Developed training plans and practice schedules',
        'Collaborated with staff on player development strategies'
      ],
      fullDetails: [
        'Coached youth basketball teams, focusing on skill development, teamwork, and sportsmanship.',
        'Developed comprehensive training plans and practice schedules tailored to different age groups and skill levels.',
        'Collaborated with school staff and fellow coaches on player development strategies and program improvements.',
        'Mentored young athletes in both athletic performance and personal growth, fostering a positive and inclusive team environment.'
      ]
    },
  ];

  const interests = [
    'UI/UX Design',
    'Web Development',
    'Creative Coding',
    'Motion Design',
    'Typography',
    '3D Graphics',
    'Generative Art',
    'System Design'
  ];

  // Additional skills
  const additionalSkills = [
    'Experienced in Full Stack Development & UI Design',
    'NOLS & Outward Bound Graduate',
    'Strong Communications & Writing Skills',
    'Experience & Training in Business Management',
    'Adaptability',
    'Hospitality'
  ];

  // Interests and activities
  const interestsAndActivities = [
    'Sports & Outdoor Activities',
    'Social Justice & Sociology',
    'Fluent in Arabic',
    'Music',
    'Reading',
    'Film & Visual Design',
    'History'
  ];

  // Comprehensive technical skills
  const technicalSkills = {
    'Programming Languages': {
      icon: Code,
      color: '#ff0080',
      skills: ['PHP', 'JavaScript', 'C#', 'Java', 'Python', 'SQL', 'HTML', 'CSS', 'Bash']
    },
    'Web Development & Frameworks': {
      icon: Layers,
      color: '#00d4ff',
      skills: ['Node.js', 'React', 'Vue.js', 'jQuery', 'XAMPP', 'Spring Boot', 'RESTful API development', 'Modern Web Standards', 'Accessibility-aware UI (WCAG/AODA familiarity)']
    },
    'Databases & Cloud': {
      icon: Database,
      color: '#8a5cff',
      skills: ['MySQL', 'MongoDB', 'phpMyAdmin', 'TablePlus', 'SAP Analytics/SAP Analytics Cloud', 'Netlify', 'Azure SQL (migration experience)', 'Cloud Deployment Workflows', 'Database Optimization']
    },
    'Version Control & Collaboration': {
      icon: Terminal,
      color: '#00ffd1',
      skills: ['Git (GitHub, GitLab, GitFlow)', 'DiffMerge', 'Advanced Merge Conflict Resolution', 'Distributed Version Control', 'Code Review Workflows', 'Familiarity with CI/CD Practices']
    },
    'Development & Testing Tools': {
      icon: Zap,
      color: '#ff6b9d',
      skills: ['Jira', 'Confluence', 'Honeydew', 'Homebrew', 'Npm', 'Postman', 'Automated and Functional Testing', 'Negative Testing', 'Integration Testing', 'Continuous Delivery/Continuous Integration Concepts']
    },
    'Game Development': {
      icon: Target,
      color: '#4d9eff',
      skills: ['Unity (C#)', 'Physics & Player Movement System Testing', 'Prototype Development', 'Eye-Tracking Integration for BCI Systems']
    },
    'Software Engineering Concepts': {
      icon: Award,
      color: '#ff0080',
      skills: ['Full-stack development', 'UI/UX design', 'API integration', 'Agile & Scrum methodologies', 'Sprint Planning & Reviews', 'Backlog Grooming', 'User Stories', 'Database-Driven Web Applications', 'SQL Query optimization', 'Database Normalization', 'Feasibility Analysis', 'Proof-of-Concept Development', 'Service Performance Debugging', 'Iterative Delivery']
    },
    'Data Science & Analytics': {
      icon: TrendingUp,
      color: '#00d4ff',
      skills: ['Data warehousing', 'Data mining & Pattern recognition', 'ETL processes', 'Data Visualization', 'Neural Networks', 'Basic Machine Learning', 'Classification & Clustering Algorithms', 'Model Evaluation (Accuracy, Precision, Recall, Confusion Matrix)']
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
    );
  };

  const filteredSkills = React.useMemo(() => {
    if (!skillSearch.trim()) return technicalSkills;

    const search = skillSearch.toLowerCase();
    const filtered: typeof technicalSkills = {};

    Object.entries(technicalSkills).forEach(([category, data]) => {
      const matchingSkills = data.skills.filter(skill =>
          skill.toLowerCase().includes(search) ||
          category.toLowerCase().includes(search)
      );

      if (matchingSkills.length > 0 || category.toLowerCase().includes(search)) {
        filtered[category] = {
          ...data,
          skills: matchingSkills.length > 0 ? matchingSkills : data.skills
        };
      }
    });

    return filtered;
  }, [skillSearch, technicalSkills]);

  const toggleExperience = (index: number) => {
    setExpandedExperience(prev =>
        prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]
    );
  };

  return (
      <div className="min-h-screen w-full">
        {/* Hero Section with ColorBends Background */}
        <section className={`relative min-h-screen w-full overflow-y-auto md:overflow-hidden ${
            theme === 'light' ? 'bg-white' : 'bg-black'
        }`}>
          {/* ColorBends Background */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <ColorBends
                rotation={180}
                speed={0.2}
                transparent={true}
                scale={0.7}
                frequency={1}
                warpStrength={0}
                mouseInfluence={0}
                parallax={0}
                noise={0.15}
            />
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 flex min-h-screen items-center px-6 md:px-12 pt-16 pb-10 md:py-12" style={{ pointerEvents: 'none' }}>
            <div className="max-w-7xl w-full mx-auto" style={{ pointerEvents: 'auto' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className={`text-xs md:text-base mb-3 md:mb-4 tracking-wide uppercase ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Full-Stack Developer
                  </div>

                  <h1 className={`text-3xl md:text-6xl lg:text-7xl mb-6 font-mono ${
                      theme === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    Hello I'm
                    <br />
                    <span
                        className="group inline-block relative text-[#4d9eff] transition-colors duration-300 hover:text-black cursor-pointer"
                        style={{ fontFamily: "'Righteous', sans-serif" }}
                    >
                      <span className="absolute inset-0 bg-[#ff0080] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-10 rounded-md" />
                      Zayd Alnuweiri
                    </span>
                  </h1>

                  <p className={`text-lg md:text-xl mb-8 max-w-xl leading-relaxed ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}
                     style={theme === 'light'
                         ? { textShadow: '0 2px 12px rgba(255, 255, 255, 0.9), 0 1px 6px rgba(255, 255, 255, 0.95)' }
                         : { textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 6px rgba(0, 0, 0, 0.95)' }
                     }
                  >
                    Creating exceptional digital experiences through code.
                    Specializing in modern web applications and interactive interfaces.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <motion.button
                        onClick={() => onNavigate?.('Projects')}
                        className="group relative px-8 py-4 border-2 border-[#4d9eff] text-[#4d9eff] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#4d9eff] hover:text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative flex items-center justify-center gap-2 font-mono">
                        VIEW PROJECTS
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </motion.button>

                    <motion.button
                        onClick={onBack}
                        className="group relative px-8 py-4 border-2 border-[#ff0080] text-[#ff0080] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#ff0080] hover:text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative flex items-center justify-center gap-2 font-mono">
                        BACK TO DASHBOARD
                        <span className="group-hover:translate-x-1 transition-transform duration-300">←</span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
                    <motion.a
                        href="#"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                            theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        href="#"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                            theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        href="#"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#4d9eff] hover:text-[#4d9eff] transition-colors ${
                            theme === 'light' ? 'border-gray-400' : 'border-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>

                {/* Right Column - Visual Element */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="flex justify-center items-center"
                >
                  <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full backdrop-blur-sm border flex items-center justify-center overflow-hidden ${
                      theme === 'light'
                          ? 'bg-black/5 border-gray-300'
                          : 'bg-white/5 border-gray-700'
                  }`}>
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 15%' }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Bottom Stats Section */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16"
              >
                <div className={`grid grid-cols-3 gap-8 border-t pt-8 ${
                    theme === 'light' ? 'border-black/10' : 'border-white/10'
                }`}>
                  {homeStats.map((stat, index) => (
                      <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className="text-center md:text-left"
                      >
                        <div className="text-4xl md:text-5xl lg:text-6xl font-mono mb-2 text-[#4d9eff]">
                          {stat.value}
                        </div>
                        <div className={`text-sm md:text-base uppercase tracking-wide ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {stat.label}
                        </div>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bento Box Main Content */}
        <section
            className={`w-full py-12 px-4 md:px-8 2xl:py-16 2xl:px-12 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 2xl:mb-12">
              <motion.h2
                  className="group inline-block relative text-[2.1rem] md:text-[2.85rem] lg:text-[3.42rem] cursor-pointer overflow-visible"
                  style={{ fontFamily: "'Righteous', sans-serif" }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              >
                <span className="relative inline-block group-hover:tracking-wider">
                  {"Professional Overview".split('').map((char, index) => {
                    const isSpace = char === ' ';
                    // Calculate character index excluding the space
                    let charIndex = index;
                    if (index > 12) charIndex = index - 1; // Subtract 1 for space after "Professional"

                    const shouldTurnRed = !isSpace && charIndex < 21;
                    const delay = shouldTurnRed ? charIndex * 80 : 0;

                    // Insert line break after "Professional"
                    if (index === 12) {
                      return <br key={index} />;
                    }

                    return (
                        <span
                            key={index}
                            className={`inline-block text-[#4d9eff] ${shouldTurnRed ? 'group-hover:text-[#ff0080]' : ''}`}
                            style={{
                              transition: 'color 0.3s ease',
                              transitionDelay: `${delay}ms`
                            }}
                        >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
                </span>
              </motion.h2>

              <motion.a
                  href='/Zayd-Resume-Short.pdf'
                  download="Zayd-Resume-Short.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-base bg-[#4d9eff] text-white rounded-lg hover:bg-[#3d8eef] transition-colors whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              >
                <Download className="w-2.5 h-2.5 md:w-4 md:h-4" />
                <span>Download CV</span>
              </motion.a>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-6 auto-rows-auto">

              {/* Quick Facts - spans 2 columns */}
              <motion.div
                  className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-4 2xl:mb-6">
                  <User className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-xl 2xl:text-2xl">Quick Facts</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4">
                  {quickFacts.map((fact) => (
                      <div key={fact.label} className="flex items-center gap-2">
                        <fact.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">{fact.label}</div>
                          {fact.link ? (
                              <a href={fact.link} className="text-sm text-[#4d9eff] hover:underline truncate block">
                                {fact.value}
                              </a>
                          ) : fact.isAvailable ? (
                              <div className="text-sm text-green-500 truncate">{fact.value}</div>
                          ) : (
                              <div className="text-sm truncate">{fact.value}</div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Achievements - spans 2 columns */}
              <motion.div
                  className="lg:col-span-2 bg-[#111111] border border-[#4d9eff]/20 rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-10 2xl:mb-12">
                  <TrendingUp className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-xl 2xl:text-2xl">Core Strengths</h3>
                </div>
                <div className="grid grid-cols-2 gap-6 2xl:gap-8">
                  {coreStrengths.map((strength) => (
                      <div key={strength.label} className="text-gray-300 text-lg">
                        {strength.label}
                      </div>
                  ))}
                </div>
              </motion.div>

              {/* Professional Summary - spans 2 columns, 2 rows */}
              <motion.div
                  className="lg:col-span-2 lg:row-span-2 bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-4 2xl:mb-6">
                  <User className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-xl 2xl:text-2xl">Professional Summary</h3>
                </div>
                <p className="text-gray-300 text-[13px] leading-relaxed mb-3">
                  Working professional with almost 10 years of experience across numerous disciplines. Started in Customer Relations Management with Al-Markhiya Gallery. Experienced Web Design for the first time there, and partook in bookkeeping, invoicing, and customer service. Worked in Event Planning and Manufacturing at Fetish Records in New York City. In University, I pursued Sociology and Public Policy, but transferred to Computer Science after feeling unchallenged, though the former discipline remains one of my most cherished passions.
                </p>
                <p className="text-gray-300 text-[13px] leading-relaxed mb-3">
                  I have 5+ years of Full-Stack Development experience building scalable web applications and interactive user experiences. Specialized in React, TypeScript, and modern JavaScript ecosystem with a strong focus on performance, accessibility, and design excellence.
                </p>
                <p className="text-gray-300 text-[13px] leading-relaxed">
                  Proven track record of delivering high-quality products in fast-paced environments, leading development teams, and translating complex business requirements into elegant technical solutions.
                </p>
              </motion.div>

              {/* Education */}
              <motion.div
                  className="lg:col-span-2 relative bg-[#242424] rounded-2xl p-6 2xl:p-8 text-white overflow-hidden border border-[#FFD400]/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(255, 212, 0, 0.2)' }}
              >
                {/* Gold diagonal racing stripes bisecting top-left corner */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {/* First stripe - from left edge to top edge */}
                  <line x1="0" y1="30" x2="30" y2="0" stroke="#FFD400" strokeWidth="2" />
                  {/* Second stripe - from left edge to top edge */}
                  <line x1="0" y1="40" x2="40" y2="0" stroke="#FFD400" strokeWidth="2" />
                </svg>

                {/* Dalhousie Shield Logo */}
                <div className="absolute z-10" style={{ left: 'calc(1rem + 1%)', top: 'calc(1rem + 5%)' }}>
                  <img
                      src={dalShield}
                      alt="Dalhousie Shield"
                      className="w-16 h-16 opacity-80"
                  />
                </div>

                {/* Content */}
                <div className="mt-20">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#FFD400]" />
                    <h3 className="text-lg text-[#FFD400]">Education</h3>
                  </div>
                  <div>
                    <div className="font-medium text-gray-300 mb-1">Dalhousie University</div>
                    <div className="text-sm text-gray-500">Bachelor of Applied Computer Science</div>
                    <div className="text-sm text-[#FFD400] mt-1">2022 - 2025</div>
                  </div>
                </div>

                {/* Subtle gold gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD400]/5 to-transparent pointer-events-none" />
              </motion.div>

              {/* Tech Stack - Frontend */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <Palette className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 2xl:gap-2">
                  {techStack.frontend.slice(0, 6).map((tech) => (
                      <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                      >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack - Backend */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <Database className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 2xl:gap-2">
                  {techStack.backend.slice(0, 6).map((tech) => (
                      <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                      >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack - Tools */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <Terminal className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 2xl:gap-2">
                  {techStack.tools.slice(0, 6).map((tech) => (
                      <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                      >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Currently - Working On */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <Briefcase className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Working On</h3>
                </div>
                <p className="text-gray-300 text-sm">{currently.working}</p>
              </motion.div>

              {/* Currently - Learning */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <BookOpen className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Learning</h3>
                </div>
                <p className="text-gray-300 text-sm">{currently.learning}</p>
              </motion.div>

              {/* Currently - Exploring */}
              <motion.div
                  className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <ExternalLink className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Exploring</h3>
                </div>
                <p className="text-gray-300 text-sm">{currently.exploring}</p>
              </motion.div>

              {/* Additional Skills - Spans 2 columns */}
              <motion.div
                  className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-4 2xl:mb-6">
                  <Award className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Additional Skills</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 2xl:gap-3">
                  {[
                    { skill: 'Fluent in Arabic', color: '#4d9eff', icon: BookOpen },
                    { skill: 'NOLS & Outward Bound Graduate', color: '#00ffd1', icon: Award },
                    { skill: 'Communications & Writing', color: '#ff0080', icon: BookOpen },
                    { skill: 'Business Management', color: '#8a5cff', icon: Briefcase },
                    { skill: 'Adaptability', color: '#ff6b9d', icon: Zap },
                    { skill: 'Hospitality', color: '#00d4ff', icon: Heart }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div
                            key={item.skill}
                            className="bg-white/5 rounded-lg p-3 border border-gray-800/50 hover:border-gray-700/50 transition-all min-h-[90px] flex flex-col items-center justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <div
                              className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                              style={{ backgroundColor: `${item.color}15` }}
                          >
                            <IconComponent className="w-4.5 h-4.5" style={{ color: item.color }} />
                          </div>
                          <p className="text-gray-300 text-[11px] leading-tight text-center">{item.skill}</p>
                        </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Interests & Activities - Spans 2 columns */}
              <motion.div
                  className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#4d9eff]" />
                  <h3 className="text-lg">Interests & Activities</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { interest: 'Sports & Outdoor Activities', color: '#00ffd1', icon: Zap },
                    { interest: 'Social Justice & Sociology', color: '#ff0080', icon: Heart },
                    { interest: 'Music', color: '#8a5cff', icon: Coffee },
                    { interest: 'Reading', color: '#ff6b9d', icon: BookOpen },
                    { interest: 'Film & Visual Design', color: '#00d4ff', icon: Palette },
                    { interest: 'History', color: '#ff0080', icon: BookOpen }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <motion.div
                            key={item.interest}
                            className="bg-white/5 rounded-lg p-3 border border-gray-800/50 hover:border-gray-700/50 transition-all min-h-[90px] flex flex-col items-center justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <div
                              className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
                              style={{ backgroundColor: `${item.color}15` }}
                          >
                            <IconComponent className="w-4.5 h-4.5" style={{ color: item.color }} />
                          </div>
                          <p className="text-gray-300 text-[11px] leading-tight text-center">{item.interest}</p>
                        </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Original Interests - Spans 4 columns */}
              <motion.div
                  className="lg:col-span-4 bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3 2xl:mb-4">
                  <Palette className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#4d9eff]" />
                  <h3 className="text-lg 2xl:text-xl">Professional Interests</h3>
                </div>
                <div className="flex flex-wrap gap-2 2xl:gap-2.5">
                  {interests.map((interest) => (
                      <span
                          key={interest}
                          className="px-3 py-1.5 text-sm rounded-full border border-white/20 bg-white/5"
                      >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section - Comprehensive & Expandable */}
        <section
            id="technical-skills"
            className={`w-full py-12 px-4 md:px-8 2xl:py-16 2xl:px-12 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 2xl:mb-12">
              <motion.h2
                  className="group inline-block relative text-4xl md:text-5xl lg:text-6xl cursor-pointer overflow-visible"
                  style={{ fontFamily: "'Righteous', sans-serif" }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              >
                <span className="relative inline-block group-hover:tracking-wider">
                  {"Technical Skills".split('').map((char, index) => {
                    const isSpace = char === ' ';
                    // Calculate character index excluding the space
                    let charIndex = index;
                    if (index > 9) charIndex = index - 1; // Subtract 1 for space after "Technical"

                    const shouldTurnRed = !isSpace && charIndex < 15;
                    const delay = shouldTurnRed ? charIndex * 80 : 0;

                    return (
                        <span
                            key={index}
                            className={`inline-block text-[#4d9eff] ${shouldTurnRed ? 'group-hover:text-[#ff0080]' : ''}`}
                            style={{
                              transition: 'color 0.3s ease',
                              transitionDelay: `${delay}ms`
                            }}
                        >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
                </span>
              </motion.h2>

              {/* Search Bar */}
              <motion.div
                  className="relative w-full md:w-96"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search skills... (e.g., React, Python, Git)"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#4d9eff] transition-colors"
                />
              </motion.div>
            </div>

            {/* Skills Grid - Expandable Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-6">
              {Object.entries(filteredSkills).map(([category, data], index) => {
                const isExpanded = expandedCategories.includes(category);
                const IconComponent = data.icon;
                const displaySkills = isExpanded ? data.skills : data.skills.slice(0, 4);

                return (
                    <motion.div
                        key={category}
                        className="bg-[#111111] rounded-2xl p-6 2xl:p-8 text-white border border-gray-800/50 hover:border-gray-700/50 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -3 }}
                    >
                      {/* Category Header */}
                      <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between mb-4 group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${data.color}15` }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: data.color }} />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg group-hover:text-[#4d9eff] transition-colors">
                              {category}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {data.skills.length} skill{data.skills.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                          {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </motion.div>
                      </button>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2">
                        {displaySkills.map((skill) => (
                            <motion.span
                                key={skill}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                              {skill}
                            </motion.span>
                        ))}

                        {/* Show More/Less Indicator */}
                        {data.skills.length > 4 && !isExpanded && (
                            <span className="px-3 py-1.5 bg-[#4d9eff]/10 border border-[#4d9eff]/30 rounded-full text-xs text-[#4d9eff]">
                          +{data.skills.length - 4} more
                        </span>
                        )}
                      </div>
                    </motion.div>
                );
              })}
            </div>

            {/* No Results Message */}
            {Object.keys(filteredSkills).length === 0 && (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No skills found matching "{skillSearch}"</p>
                  <button
                      onClick={() => setSkillSearch('')}
                      className="mt-4 px-6 py-2 bg-[#4d9eff] text-white rounded-lg hover:bg-[#3d8eef] transition-colors"
                  >
                    Clear Search
                  </button>
                </motion.div>
            )}

            {/* Expand All / Collapse All */}
            {Object.keys(filteredSkills).length > 0 && (
                <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                  {expandedCategories.length === Object.keys(filteredSkills).length ? (
                      <button
                          onClick={() => setExpandedCategories([])}
                          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                      >
                        <ChevronUp className="w-4 h-4" />
                        Collapse All
                      </button>
                  ) : (
                      <button
                          onClick={() => setExpandedCategories(Object.keys(filteredSkills))}
                          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                      >
                        <ChevronDown className="w-4 h-4" />
                        Expand All
                      </button>
                  )}
                </motion.div>
            )}
          </div>
        </section>

        {/* Audio Visualizer Section */}
        <section
            className={`w-full py-12 px-4 md:px-8 2xl:py-16 2xl:px-12 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            {/* Section Header */}
            <motion.h2
                className="group inline-block relative text-4xl md:text-5xl lg:text-6xl cursor-pointer overflow-visible mb-8 2xl:mb-12"
                style={{ fontFamily: "'Righteous', sans-serif" }}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
              <span className="relative inline-block group-hover:tracking-wider">
                {"What I'm Listening to Nowadays".split('').map((char, index) => {
                  const isSpace = char === ' ';
                  // Calculate character index excluding spaces
                  let charIndex = index;
                  if (index > 4) charIndex -= 1; // space after "What"
                  if (index > 7) charIndex -= 1; // space after "I'm"
                  if (index > 17) charIndex -= 1; // space after "Listening"
                  if (index > 19) charIndex -= 1; // space after "to"

                  const shouldTurnRed = !isSpace && charIndex < 26;
                  const delay = shouldTurnRed ? charIndex * 80 : 0;

                  return (
                      <span
                          key={index}
                          className={`inline-block text-[#4d9eff] ${shouldTurnRed ? 'group-hover:text-[#ff0080]' : ''}`}
                          style={{
                            transition: 'color 0.3s ease',
                            transitionDelay: `${delay}ms`
                          }}
                      >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </span>
            </motion.h2>

            <motion.div
                className="rounded-3xl p-6 md:p-8 border bg-[#111111] border-gray-800/50 relative overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -3 }}
            >
              {/* Section Label */}
              <div className="absolute top-6 left-6 text-xs text-gray-600 z-10">
                05 AUDIO VISUALIZER
              </div>

              <CompactAudioPlayer />
            </motion.div>
          </div>
        </section>

        {/* Work Experience Timeline - Compact */}
        <section
            id="experience"
            className={`w-full py-12 px-4 md:px-8 2xl:py-16 2xl:px-12 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6 2xl:mb-10">
                <motion.h2
                    className="group inline-block relative text-4xl md:text-5xl lg:text-6xl cursor-pointer overflow-visible"
                    style={{ fontFamily: "'Righteous', sans-serif" }}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                  <span className="relative inline-block group-hover:tracking-wider">
                    {"Work Experience".split('').map((char, index) => {
                      const isSpace = char === ' ';
                      // Calculate character index excluding the space
                      let charIndex = index;
                      if (index > 4) charIndex = index - 1; // Subtract 1 for space after "Work"

                      const shouldTurnRed = !isSpace && charIndex < 14;
                      const delay = shouldTurnRed ? charIndex * 80 : 0;

                      return (
                          <span
                              key={index}
                              className={`inline-block text-[#4d9eff] ${shouldTurnRed ? 'group-hover:text-[#ff0080]' : ''}`}
                              style={{
                                transition: 'color 0.3s ease',
                                transitionDelay: `${delay}ms`
                              }}
                          >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      );
                    })}
                  </span>
                </motion.h2>
                <p className="hidden md:block text-sm text-gray-500">Click cards for full details</p>
              </div>
              <div className="space-y-4 2xl:space-y-6">
                {experience.map((job, index) => {
                  const isExpanded = expandedExperience.includes(index);
                  return (
                      <motion.div
                          key={job.title + index}
                          className="bg-[#111111] rounded-xl p-6 2xl:p-8 text-white border border-gray-800/50 hover:border-gray-700/50 transition-all"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                      >
                        {/* Card Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl mb-1">{job.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-gray-400">
                              <span>{job.company}</span>
                              <span className="hidden md:inline">•</span>
                              <span>{job.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 mt-1 md:mt-0">
                            <div className="flex items-center gap-3">
                              <div className="text-sm text-gray-400">
                                {job.period}
                              </div>
                              {(job as any).demoLink && (
                                  <a
                                      href={(job as any).demoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 px-3 py-1 bg-[#4d9eff] text-white text-xs rounded-md hover:bg-[#3d8eef] transition-colors whitespace-nowrap"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Show video player for Senior Developer (Full Stack) - index 3
                                        if (index === 3) {
                                          e.preventDefault();
                                          setShowVideoPlayer(true);
                                        }
                                        // Show Zeuron Development Director video player - index 2
                                        else if (index === 2) {
                                          e.preventDefault();
                                          setShowZeuronVideo(true);
                                        }
                                        // Show Zeuron Junior Developer video player - index 5
                                        else if (index === 5) {
                                          e.preventDefault();
                                          setShowZeuronJuniorVideo(true);
                                        }
                                      }}
                                  >
                                    {index === 2 || index === 3 || index === 5 ? (
                                        <Play className="w-3 h-3" />
                                    ) : (
                                        <ExternalLink className="w-3 h-3" />
                                    )}
                                    <span>{index === 2 || index === 3 || index === 5 ? 'Video Demo' : 'Live Demo'}</span>
                                  </a>
                              )}
                            </div>
                            {/* Disclaimer pill for Currus AI (index 1) */}
                            {index === 1 && (
                                <span className="px-2 py-0.5 md:px-2.5 md:py-0.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full text-[8px] md:text-[10px] whitespace-normal md:whitespace-nowrap max-w-[200px] md:max-w-none text-center">
                              NOTE: Client updating site post-delivery, functionality may be impacted
                            </span>
                            )}
                          </div>
                        </div>

                        {/* Summary Description */}
                        <p className="text-gray-300 text-sm mb-3">
                          {job.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.highlights.map((highlight) => (
                              <span
                                  key={highlight}
                                  className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                              >
                            • {highlight}
                          </span>
                          ))}
                        </div>

                        {/* Expandable Full Details */}
                        {job.fullDetails && (
                            <>
                              <motion.div
                                  initial={false}
                                  animate={{
                                    height: isExpanded ? 'auto' : 0,
                                    opacity: isExpanded ? 1 : 0
                                  }}
                                  transition={{ duration: 0.3 }}
                                  style={{ overflow: 'hidden' }}
                              >
                                <div className="pt-4 border-t border-gray-800">
                                  <h4 className="text-sm font-medium text-[#4d9eff] mb-3">Full Details</h4>
                                  <ul className="space-y-2">
                                    {job.fullDetails.map((detail, detailIndex) => (
                                        <li key={detailIndex} className="text-sm text-gray-400 leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-[#4d9eff]">
                                          {detail}
                                        </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>

                              {/* Expand/Collapse Button */}
                              <button
                                  onClick={() => toggleExperience(index)}
                                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
                              >
                                <span>{isExpanded ? 'Show Less' : 'Show Full Details'}</span>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </button>
                            </>
                        )}
                      </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section
            className={`w-full py-32 px-4 ${
                theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
                className="text-4xl md:text-6xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              Let's Create Together
            </motion.h2>

            <motion.p
                className="text-xl text-gray-400 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm always open to new opportunities and collaborations
            </motion.p>

            <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                  className={`px-12 py-5 rounded-full transition-all duration-300 ${
                      theme === 'light'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-white text-black hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    onBack();
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
              <motion.button
                  className={`px-12 py-5 bg-transparent border-2 rounded-full transition-all duration-300 ${
                      theme === 'light'
                          ? 'border-black text-black hover:bg-black hover:text-white'
                          : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                  onClick={onBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Back to Dashboard
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* NEW FEATURE 2: Enhanced Video Player Modal with Admin/Student View Toggle */}
        {showVideoPlayer && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                onClick={() => {
                  setShowVideoPlayer(false);
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                }}
            >
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#111111] border border-white/10 rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Senior Developer (Full Stack) - Project Demo</h3>
                  <button
                      onClick={() => {
                        setShowVideoPlayer(false);
                        if (videoRef.current) {
                          videoRef.current.pause();
                          videoRef.current.currentTime = 0;
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* NEW FEATURE 2A: Toggle Buttons for Admin/Student Views */}
                <div className="flex gap-3 mb-4">
                  <button
                      onClick={() => {
                        setSelectedVideoView('admin');
                        if (videoRef.current) {
                          videoRef.current.pause();
                          videoRef.current.currentTime = 0;
                          videoRef.current.load();
                        }
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                          selectedVideoView === 'admin'
                              ? 'bg-[#4d9eff] text-white shadow-lg shadow-[#4d9eff]/20'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    Admin View
                  </button>
                  <button
                      onClick={() => {
                        setSelectedVideoView('student');
                        if (videoRef.current) {
                          videoRef.current.pause();
                          videoRef.current.currentTime = 0;
                          videoRef.current.load();
                        }
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                          selectedVideoView === 'student'
                              ? 'bg-[#4d9eff] text-white shadow-lg shadow-[#4d9eff]/20'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    Student View
                  </button>
                </div>

                {/* NEW FEATURE 2B: Video player with dynamic source based on selected view */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                      ref={videoRef}
                      key={selectedVideoView}
                      className="w-full h-auto"
                      controls
                      autoPlay
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          videoRef.current.playbackRate = playbackSpeed;
                        }
                      }}
                      onCanPlay={() => {
                        if (videoRef.current) {
                          videoRef.current.playbackRate = playbackSpeed;
                        }
                      }}
                      onRateChange={() => {
                        // Prevent browser controls from overriding our speed setting
                        if (videoRef.current && videoRef.current.playbackRate !== playbackSpeed) {
                          console.log('Rate changed externally, maintaining:', playbackSpeed);
                        }
                      }}
                  >
                    <source
                        src={selectedVideoView === 'admin' ? '/AdminView.mov' : '/StudentView.mov'}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* NEW FEATURE 3: Playback Speed Controls */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-gray-400">Playback Speed:</span>
                  <div className="flex gap-2">
                    {[1, 1.5, 2].map((speed) => (
                        <button
                            key={speed}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Setting playback speed to:', speed);
                              setPlaybackSpeed(speed);
                              if (videoRef.current) {
                                videoRef.current.playbackRate = speed;
                                console.log('Video playbackRate now:', videoRef.current.playbackRate);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                playbackSpeed === speed
                                    ? 'bg-[#4d9eff] text-white shadow-lg shadow-[#4d9eff]/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {speed}x
                        </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  <p>Dalhousie University - May 2024 to September 2024</p>
                  <p className="mt-2">PHP-based peer review system for academia with Azure SQL migration</p>
                  <p className="mt-2 text-[#4d9eff]">
                    Currently viewing: <span className="font-semibold">{selectedVideoView === 'admin' ? 'Admin View' : 'Student View'}</span>
                  </p>
                </div>
              </motion.div>
            </div>
        )}

        {/* Zeuron Video Player Modal */}
        {showZeuronVideo && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                onClick={() => {
                  setShowZeuronVideo(false);
                  if (zeuronVideoRef.current) {
                    zeuronVideoRef.current.pause();
                    zeuronVideoRef.current.currentTime = 0;
                  }
                }}
            >
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#111111] border border-white/10 rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Development Director and Team Co-Lead - Project Demo</h3>
                  <button
                      onClick={() => {
                        setShowZeuronVideo(false);
                        if (zeuronVideoRef.current) {
                          zeuronVideoRef.current.pause();
                          zeuronVideoRef.current.currentTime = 0;
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Video player */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                      ref={zeuronVideoRef}
                      className="w-full h-auto"
                      controls
                      autoPlay
                      onLoadedMetadata={() => {
                        if (zeuronVideoRef.current) {
                          zeuronVideoRef.current.playbackRate = zeuronPlaybackSpeed;
                        }
                      }}
                      onCanPlay={() => {
                        if (zeuronVideoRef.current) {
                          zeuronVideoRef.current.playbackRate = zeuronPlaybackSpeed;
                        }
                      }}
                  >
                    <source
                        src="/PBCItest.mov"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Playback Speed Controls */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-gray-400">Playback Speed:</span>
                  <div className="flex gap-2">
                    {[1, 1.5, 2].map((speed) => (
                        <button
                            key={speed}
                            onClick={(e) => {
                              e.preventDefault();
                              setZeuronPlaybackSpeed(speed);
                              if (zeuronVideoRef.current) {
                                zeuronVideoRef.current.playbackRate = speed;
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                zeuronPlaybackSpeed === speed
                                    ? 'bg-[#4d9eff] text-white shadow-lg shadow-[#4d9eff]/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {speed}x
                        </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  <p>Zeuron - January 2025 to April 2025</p>
                  <p className="mt-2">Open-source BCI game development project with Python/Unity</p>
                </div>
              </motion.div>
            </div>
        )}

        {/* Zeuron Junior Developer Video Player Modal */}
        {showZeuronJuniorVideo && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                onClick={() => {
                  setShowZeuronJuniorVideo(false);
                  if (zeuronJuniorVideoRef.current) {
                    zeuronJuniorVideoRef.current.pause();
                    zeuronJuniorVideoRef.current.currentTime = 0;
                  }
                }}
            >
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#111111] border border-white/10 rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Junior Game Developer and Test Engineer - Project Demo</h3>
                  <button
                      onClick={() => {
                        setShowZeuronJuniorVideo(false);
                        if (zeuronJuniorVideoRef.current) {
                          zeuronJuniorVideoRef.current.pause();
                          zeuronJuniorVideoRef.current.currentTime = 0;
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Video player */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                      ref={zeuronJuniorVideoRef}
                      className="w-full h-auto"
                      controls
                      autoPlay
                      onLoadedMetadata={() => {
                        if (zeuronJuniorVideoRef.current) {
                          zeuronJuniorVideoRef.current.playbackRate = zeuronJuniorPlaybackSpeed;
                        }
                      }}
                      onCanPlay={() => {
                        if (zeuronJuniorVideoRef.current) {
                          zeuronJuniorVideoRef.current.playbackRate = zeuronJuniorPlaybackSpeed;
                        }
                      }}
                  >
                    <source
                        src="/GambitDemo.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Playback Speed Controls */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-gray-400">Playback Speed:</span>
                  <div className="flex gap-2">
                    {[1, 1.5, 2].map((speed) => (
                        <button
                            key={speed}
                            onClick={(e) => {
                              e.preventDefault();
                              setZeuronJuniorPlaybackSpeed(speed);
                              if (zeuronJuniorVideoRef.current) {
                                zeuronJuniorVideoRef.current.playbackRate = speed;
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                zeuronJuniorPlaybackSpeed === speed
                                    ? 'bg-[#4d9eff] text-white shadow-lg shadow-[#4d9eff]/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {speed}x
                        </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  <p>Zeuron - January 2024 to April 2024</p>
                  <p className="mt-2">3D Unity game (C#) for Brain Computer Interface testing. NOTE: Flashing is intentional and prompts player movement when looked at by BCI-wearer.</p>
                </div>
              </motion.div>
            </div>
        )}

        {/* Video Demo Dialog - NDA Pending */}
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
      </div>
  );
}