import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Github, Linkedin, Briefcase, GraduationCap, Code, User, Download, Moon, Sun, ArrowUp, Award, Heart, Coffee, Target, Zap, Book, Globe, Users, Laptop } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [typedText, setTypedText] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

  const fullText = "Software Engineer | Data Analyst";
  const sectionOrder = ['experience', 'education', 'skills', 'projects', 'about', 'contact'];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 2000);

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);
      setShowBackToTop(scrollPos > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isLoading]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_34l57gm',
          template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_6azh2mb',
          user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'q-tnTlNCu04xF8NF8',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'ansh.krishna1@gmail.com'
          }
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = {
    experience: {
      icon: Briefcase,
      title: 'Experience',
      items: [
        {
          company: 'MedLife Pharmacy',
          role: 'Data Analyst',
          location: 'North Brunswick, NJ',
          date: 'May 2025 - Present',
          description: 'Designed and implemented secure patient data storage with PostgreSQL and RESTful APIs, ensuring HIPAA compliance and reliable integration with existing healthcare systems',
        },
        {
          company: 'Handshake AI',
          role: 'AI Data Trainer',
          location: 'Edison, NJ',
          date: 'Nov 2025 - Jan 2026',
          description: 'Annotated and validated 500+ data samples using Python scripts and structured JSON schemas, improving training data consistency and increasing model accuracy. Evaluated and refined AI outputs by testing model responses, providing corrective feedback to increase human-like responses',
        },
        {
          company: 'PALS Learning Center ',
          role: 'Tutor/Programmer',
          location: 'Edison, NJ',
          date: 'Dec 2022 - Aug 2024',
          description: 'Built and deployed staff-facing web pages with React.js and Flask, reducing manual data entry and streamlining customer management. Utilized Git/GitHub for version control and Chrome DevTools for debugging, ensuring reliable performance and maintainability of front-end systems',
        },
         {
          company: 'NetServ',
          role: 'Programming Analyst',
          location: 'Atlanta, GA',
          date: 'Jul 2023 - Aug 2023',
          description: 'Analyzed and tested smaller-scale software, such as testing with server load, improving speeds and processing by up to 40 percent',
        }
      ]
    },
    education: {
      icon: GraduationCap,
      title: 'Education',
      items: []
    },
    skills: {
      icon: Award,
      title: 'Skills',
      isSkills: true
    },
    projects: {
      icon: Code,
      title: 'Projects',
      items: [
        {
          company: 'Intellistock AI RSI Analyzer',
          role: 'Personal Project',
          skills: 'Python, Flask, yfinance, Pandas, HTML, JavaScript',
          date: '2025',
           description: 'Engineered a real-time stock analysis platform using Flask and yfinance API, implementing RSI calculation algorithms with Pandas to process 30-day historical data and generate automated buy/sell/hold recommendations based on technical indicators. Implemented Relative Strength Index (RSI) calculation algorithm using Pandas rolling window operations on 14-period price deltas, computing average gains/losses through vectorized operations to generate momentum indicators with 100-0 scale output for overbought/oversold signal detection',
          status: 'Completed'
        },
        {
          company: 'MedTrack',
          role: 'Personal Project',
          skills: 'React, Flask, SQLAlchemy, Chart.js, JWT, OpenFDA API',
          date: '2026',
          description: 'Created a full-stack medication management system using React and Flask, implementing RESTful API with 8 endpoints serving JWT-authenticated requests, SQLAlchemy ORM for database operations, and Chart.js visualizations to track adherence patterns across configurable time periods with automated insight generation. Built interactive analytics dashboard using Chart.js to visualize adherence trends through line and doughnut charts, calculating daily adherence rates from timestamped log entries and generating personalized insights based on 30/60/90-day statistical thresholds to improve patient outcomes',
          status: 'Completed'
        }
      ]
    },
    about: {
      icon: User,
      title: 'About',
      isAbout: true
    },
    contact: {
      icon: Mail,
      title: 'Contact Me',
      isForm: true
    }
  };

  const skills = [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'MATLAB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg' }
  ];

  const navigation = [
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'education', label: 'EDUCATION', icon: GraduationCap },
    { id: 'skills', label: 'SKILLS', icon: Award },
    { id: 'projects', label: 'PROJECTS', icon: Code },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'contact', label: 'CONTACT', icon: Mail }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Loading Portfolio...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} overflow-x-hidden transition-colors duration-300`} style={{ scrollBehavior: 'smooth' }}>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`${darkMode ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-md rounded-full px-2 py-2 flex gap-1 shadow-2xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
          {navigation.map((nav) => {
            const Icon = nav.icon;
            return (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveSection(nav.id);
                  const element = document.getElementById(nav.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 
                  ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-purple-600/20 hover:text-white
                  hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105`}
              >
                <Icon size={16} />
                <span className="font-medium">{nav.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 z-50 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} shadow-lg hover:scale-110 transition-all duration-300`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' : 'bg-gradient-to-br from-purple-200/40 via-gray-100 to-blue-200/40'}`}></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute ${darkMode ? 'bg-white' : 'bg-purple-400'} rounded-full animate-pulse`}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
              transform: `translateY(${scrollY * (Math.random() * 0.5)}px)`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className={`text-center transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 flex justify-center">
            <img 
              src="/me.jpg" 
              alt="Ansh Krishna" 
              className={`w-48 h-48 rounded-full object-cover border-4 ${darkMode ? 'border-purple-500 shadow-purple-500/50' : 'border-purple-400 shadow-purple-400/50'} shadow-2xl hover:scale-110 transition-transform duration-300`}
            />
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            ANSH KRISHNA
          </h1>
          <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 h-8`}>
            {typedText}<span className="animate-pulse">|</span>
          </p>
          <div className="flex gap-6 justify-center mb-8">
            <a href="https://github.com/anshkyt" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'} transition-all duration-300 hover:scale-110`}>
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/ansh-krishna-99b344243/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'} transition-all duration-300 hover:scale-110`}>
              <Linkedin size={32} />
            </a>
            <a href="mailto:ansh.krishna1@gmail.com" className={`${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'} transition-all duration-300 hover:scale-110`}>
              <Mail size={32} />
            </a>
          </div>
          
          <a 
            href="/resume.pdf" 
            download="Ansh_Krishna_Resume.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mb-12"
          >
            <Download size={20} />
            Download Resume
          </a>

          <div className="mt-12">
            <ChevronDown 
              className={`mx-auto animate-bounce cursor-pointer ${darkMode ? 'text-white' : 'text-gray-800'}`}
              size={40} 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            />
          </div>
        </div>
      </div>

      {/* Section containers - each takes full viewport height */}
      {sectionOrder.map((sectionId, index) => (
        <div 
          key={sectionId} 
          id={sectionId}
          className={`relative z-10 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900/40' : 'bg-white/80'} backdrop-blur-md border-y-2 ${darkMode ? 'border-purple-500/30' : 'border-purple-400/30'} shadow-2xl ${darkMode ? 'shadow-purple-500/20' : 'shadow-purple-400/20'}`}
        >
          <div className="max-w-6xl w-full px-4 py-20">
            <div className="transition-all duration-700">
              {/* Section Title */}
              <div className="mb-8 border-b-2 border-purple-500/30 pb-4">
                <h2 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
                  {React.createElement(sections[sectionId].icon, { size: 40, className: 'text-purple-500' })}
                  {sections[sectionId].title}
                </h2>
              </div>

              {sectionId === 'skills' ? (
                <div>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex} 
                        className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600/10"
                        style={{
                          animation: `slideIn 0.6s ease-out ${skillIndex * 0.1}s both`
                        }}
                      >
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-20 h-20 object-contain"
                        />
                        <span className={`font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : sectionId === 'education' ? (
                <div className="flex flex-col items-center">
                  <img 
                    src="https://www.myyardsy.com/cdn/shop/files/frame_ce768060-0316-46ba-aaa3-ee06c05e90df.jpg?v=1732253856&width=480"
                    alt="Rutgers University Logo"
                    className="w-48 h-48 object-contain mb-8"
                  />
                  <div className="text-center space-y-4 max-w-3xl">
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Rutgers University
                    </h3>
                    <p className={`text-xl ${darkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold`}>
                      Bachelor of Science in Computer Science
                    </p>
                    <div className={`flex items-center justify-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>📍</span>
                      <span>New Brunswick, NJ</span>
                    </div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                      2024 - 2027 (expected)
                    </p>
                    <div className={`inline-block bg-yellow-600/30 border border-yellow-500 px-6 py-2 rounded-full`}>
                      <span className="text-yellow-300 font-semibold">In Progress</span>
                    </div>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} pt-4`}>
                      GPA: 3.857/4.0
                    </p>
                  </div>
                </div>
              ) : sectionId === 'about' ? (
                <div className="space-y-8">
                  {/* Bio Section */}
                  <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'} border-2 p-8 rounded-xl`}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-shrink-0">
                        <img 
                          src="/me.jpg"
                          alt="Ansh Krishna"
                          className="w-40 h-40 rounded-full object-cover shadow-xl border-4 border-purple-500"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                          Ansh Krishna
                        </h3>
                        <p className={`text-xl ${darkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold mb-2`}>
                          Software Engineer | Data Analyst
                        </p>
                        <div className={`flex items-center justify-center md:justify-start gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                          <span>📍</span>
                          <span>Based in Edison, NJ</span>
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed text-lg`}>
                          Passionate about building innovative solutions and learning new technologies. 
                          Experienced in full-stack development with a growing interest in machine learning 
                          and data science. Always excited to tackle challenging problems and collaborate 
                          with talented teams to create meaningful impact.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Briefcase, label: 'Years Experience', value: '2+' },
                      { icon: Code, label: 'Projects Built', value: '2+' }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'} border-2 p-6 rounded-xl text-center hover:border-purple-500 transition-all duration-300`}
                        style={{
                          animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                        }}
                      >
                        {React.createElement(stat.icon, { 
                          className: `mx-auto mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`,
                          size: 32
                        })}
                        <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                          {stat.value}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interests & Passion */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'} border-2 p-6 rounded-xl`}>
                      <div className="flex items-center gap-3 mb-4">
                        <Heart className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={28} />
                        <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          What I Love
                        </h4>
                      </div>
                      <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Building scalable web applications with modern frameworks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Exploring data patterns and creating insightful visualizations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Solving complex algorithmic challenges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Learning about AI/ML and its real-world applications</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'} border-2 p-6 rounded-xl`}>
                      <div className="flex items-center gap-3 mb-4">
                        <Target className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={28} />
                        <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Current Focus
                        </h4>
                      </div>
                      <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Completing my CS degree at Rutgers University</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Working on data analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Diving deeper into machine learning algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">▸</span>
                          <span>Contributing to open-source projects</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500' : 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-400'} border-2 p-8 rounded-xl text-center`}>
                    <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Let's Build Something Amazing Together!
                    </h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg`}>
                      I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <a 
                      href="#contact"
                      className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              ) : sectionId === 'contact' ? (
                <div>
                  <div className="text-center mb-8">
                    <Mail className={`mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={48} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fill out the form below and I'll get back to you soon!</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={`block ${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-2`}>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} rounded-lg border focus:border-purple-500 focus:outline-none transition-colors`}
                      />
                    </div>

                    <div>
                      <label className={`block ${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-2`}>Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} rounded-lg border focus:border-purple-500 focus:outline-none transition-colors`}
                      />
                    </div>

                    <div>
                      <label className={`block ${darkMode ? 'text-white' : 'text-gray-900'} font-bold mb-2`}>Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message"
                        rows="6"
                        className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} rounded-lg border focus:border-purple-500 focus:outline-none transition-colors resize-none`}
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={formStatus === 'sending'}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                    {formStatus === 'success' && (
                      <div className="text-green-400 text-center font-semibold">
                        ✓ Message sent successfully! I'll get back to you soon.
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="text-red-400 text-center font-semibold">
                        ✗ Failed to send message. Please try again or email me directly at ansh.krishna1@gmail.com
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {sections[sectionId].items?.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-300'} border-2 p-6 transition-all duration-500 hover:border-purple-500 hover:shadow-xl ${darkMode ? 'hover:shadow-purple-500/30' : 'hover:shadow-purple-400/30'} transform hover:-translate-y-1 rounded-xl`}
                      style={{
                        animation: `slideIn 0.6s ease-out ${itemIndex * 0.1}s both`
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{item.company}</h3>
                          <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                            <Briefcase size={16} />
                            <span>{item.role}</span>
                          </div>
                          {sectionId !== 'projects' && item.location && (
                            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <span>📍</span>
                              <span>{item.location}</span>
                            </div>
                          )}
                          {sectionId === 'projects' && item.skills && (
                            <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Code size={16} />
                              <span>{item.skills}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-purple-600/30 border border-purple-500 px-4 py-1 rounded-full text-sm">
                            {item.date}
                          </span>
                          {item.status && (
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                item.status === 'Incoming' ? 'bg-blue-600/30 text-blue-300' :
                                item.status === 'In Progress' ? 'bg-yellow-600/30 text-yellow-300' :
                                item.status === 'Available' ? 'bg-green-600/30 text-green-300' :
                                'bg-green-600/30 text-green-300'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <footer className={`relative z-10 py-8 text-center ${darkMode ? 'text-gray-400 border-gray-800' : 'text-gray-600 border-gray-300'} border-t`}>
        <p>© 2026 Ansh Krishna. All Rights Reserved.</p>
      </footer>
    </div>
  );
}