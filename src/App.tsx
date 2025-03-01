import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowDown,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Send,
  ExternalLink,
  Clock,
  User,
  Tag,
  Settings,
} from "lucide-react";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Initial portfolio projects data
  const initialProjects: Project[] = [
    {
      id: 1,
      title: "Mekatili wa menza",
      category: "Documentary",
      description:
        "A powerful documentary showcasing indigenous cultural preservation through the eyes of local communities. This project explores the rich heritage and traditions that are at risk of being lost in the modern world.",
      image:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      client: "National Heritage Foundation",
      date: "March 2024",
      services: ["Videography", "Editing", "Sound Design"],
      featured: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isVideo: true,
    },
    {
      id: 2,
      title: "MSINGI",
      category: "Brand Identity",
      description:
        "Complete brand identity design for MSINGI, an educational technology startup focused on providing accessible learning tools for underserved communities across East Africa.",
      image:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "MSINGI EdTech",
      date: "January 2024",
      services: ["Logo Design", "Brand Guidelines", "Marketing Materials"],
      featured: true,
      videoUrl: "",
      isVideo: false,
    },
    {
      id: 3,
      title: "HEKAYA",
      category: "Animation",
      description:
        "An animated short film celebrating African folklore and storytelling traditions. HEKAYA brings ancient tales to life through vibrant animation and authentic voice acting.",
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Storytellers Collective",
      date: "November 2023",
      services: ["Character Design", "Animation", "Storyboarding"],
      featured: true,
      videoUrl: "https://www.youtube.com/embed/oH3L75btuQY",
      isVideo: true,
    },
    {
      id: 4,
      title: "Bahari Blue",
      category: "Website Design",
      description:
        "A comprehensive website redesign for Bahari Blue, a marine conservation organization working to protect coral reefs along the East African coastline.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      client: "Bahari Blue Conservation",
      date: "February 2024",
      services: ["UI/UX Design", "Web Development", "Content Strategy"],
      featured: false,
      videoUrl: "",
      isVideo: false,
    },
    {
      id: 5,
      title: "Nyota Festival",
      category: "Event Branding",
      description:
        "Complete event branding and promotional materials for Nyota Festival, an annual music and arts celebration showcasing emerging talent from across the continent.",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      client: "Nyota Arts Foundation",
      date: "April 2024",
      services: ["Event Branding", "Motion Graphics", "Print Design"],
      featured: false,
      videoUrl: "https://www.youtube.com/embed/7NOSDKb0HlU",
      isVideo: true,
    },
    {
      id: 6,
      title: "Jasiri",
      category: "Product Design",
      description:
        "Product design and packaging for Jasiri, a sustainable fashion brand creating contemporary clothing inspired by traditional African textiles and techniques.",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      client: "Jasiri Apparel",
      date: "December 2023",
      services: ["Product Design", "Packaging", "Brand Strategy"],
      featured: false,
      videoUrl: "",
      isVideo: false,
    },
    {
      id: 7,
      title: "Savanna Dreams",
      category: "Short Film",
      description:
        "A captivating short film capturing the breathtaking beauty of African landscapes and wildlife through stunning cinematography and emotive storytelling.",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      client: "Wildlife Foundation",
      date: "May 2024",
      services: ["Cinematography", "Direction", "Color Grading"],
      featured: false,
      videoUrl: "https://www.youtube.com/embed/NpEaa2P7qZI",
      isVideo: true,
    },
  ];

  const [projectsData, setProjectsData] = useState<Project[]>(initialProjects);

  const handleAdminAccess = () => {
    const password = prompt("Enter admin password:");
    if (password === adminPassword) {
      setIsAdminPanelOpen(true);
    } else if (password !== null) {
      alert("Incorrect password");
    }
  };

  const handleUpdateProjects = (updatedProjects: Project[]) => {
    // Update the projects state to reflect changes
    setProjectsData(updatedProjects);
    console.log("Projects updated:", updatedProjects);
  };

  // Handle cursor movement for interactive background
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // State for more projects visibility
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  // Admin password
  const adminPassword = "KOLOWA2025"; // Password is: KOLOWA2025

  useEffect(() => {
    const handleScroll = () => {
      // Handle active section
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 200;

      // Calculate scroll progress percentage for gradient effect
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    // Update KOLOWA text with data-text attribute for gradient stroke
    const kolowaText = document.querySelector(".text-gradient");
    if (kolowaText) {
      kolowaText.setAttribute("data-text", "KOLOWA");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setShowPortfolioModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setShowPortfolioModal(false);
    document.body.style.overflow = "auto";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:kolowa@gmail.com?subject=Project%20Inquiry";
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const messageInput = form.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;

    if (!nameInput || !emailInput || !messageInput) return;

    const subject = `KOLOWA Website Inquiry from ${nameInput.value}`;
    const body = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`;

    window.location.href = `mailto:kolowa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Reset form
    form.reset();
  };

  const featuredProjects = projectsData.filter((project) => project.featured);
  const moreProjects = projectsData.filter((project) => !project.featured);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      {/* Background with stars and gradient */}
      <div className="fixed inset-0 z-0" onMouseMove={handleMouseMove}>
        {/* Scroll-based gradient background */}
        <div
          className="scroll-gradient"
          style={{
            transform: `translateY(${scrollProgress * 0.5}%)`,
            opacity: 0.7 + scrollProgress * 0.003,
            filter: `hue-rotate(${scrollProgress * 2}deg)`,
          }}
        ></div>

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-20 mix-blend-soft-light"></div>

        {/* Stars */}
        <div
          className="stars absolute inset-0"
          style={{
            transform: `translate(${(cursorPosition.x - window.innerWidth / 2) * 0.01}px, ${(cursorPosition.y - window.innerHeight / 2) * 0.01}px)`,
          }}
        ></div>

        {/* Cursor glow effect */}
        <div
          className="cursor-glow"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: "300px",
            height: "300px",
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/30 border-b border-gray-800">
        <div className="flex items-center">
          <div className="px-5">
            {" "}
            <img src="https://i.postimg.cc/0y3LvX0f/FAVICON.png"></img>{" "}
          </div>
          <span className="font-bold tracking-wider">KOLOWA</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={`${
              activeSection === "home" ? "text-red-500" : "text-white"
            } hover:text-red-400 transition-colors`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`${
              activeSection === "about" ? "text-red-500" : "text-white"
            } hover:text-red-400 transition-colors`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className={`${
              activeSection === "portfolio" ? "text-red-500" : "text-white"
            } hover:text-red-400 transition-colors`}
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`${
              activeSection === "contact" ? "text-red-500" : "text-white"
            } hover:text-red-400 transition-colors`}
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center">
          {/* Admin button - now visible on both mobile and desktop */}
          <button
            onClick={handleAdminAccess}
            className="text-gray-400 hover:text-white mr-4"
            title="Admin Panel"
          >
            <Settings size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col space-y-8 text-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold hover:text-red-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-2xl font-bold hover:text-red-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-2xl font-bold hover:text-red-500 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-2xl font-bold hover:text-red-500 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={handleAdminAccess}
              className="text-2xl font-bold hover:text-red-500 transition-colors"
            >
              Admin
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center relative"
        >
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-6xl sm:text-7xl md:text-10xl font-bold mb-6 tracking-wider text-gradient">
              KOLOWA
            </h1>
            <p className="max-w-md mx-auto text-gray-300 mb-8 font-thin">
              We are a creative studio focused on bringing your vision to life
              through innovative design, animation, and digital experiences.
            </p>
            <button
              onClick={() => scrollToSection("about")}
              className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-full glow-button"
            >
              Explore Us
            </button>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex justify-center">
            <ArrowDown size={24} />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center relative py-24"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-12 md:mb-0">
                <h2 className="text-9xl font-bold text-white opacity-80 text-gradient">
                  01
                </h2>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-4xl font-bold mb-8">About Us</h3>
                <p className="text-gray-300 mb-8 max-w-2xl">
                  "Kolowa," meaning eclipse, represents a convergence of light
                  and shadow, an intersection of creativity and technique. Our
                  visual art collective stands at the crossroads of traditional
                  and digital mediums, constantly exploring the interplay
                  between motion, color, and form. Through stop-motion
                  animation, digital art, and painting, Kolowa offers a unique
                  artistic voice that captivates and transcends boundaries.
                </p>
                <p className="text-gray-300 mb-12 max-w-2xl">
                  At Kolowa, we aim to evoke emotion and tell stories through
                  multiple artistic forms. Our name signifies transformation, a
                  moment where contrasting elements meet to create something
                  new. This is the essence of our work – combining digital
                  innovation with handcrafted aesthetics.
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  <div className="bg-orange-500 p-4 rounded-lg flex flex-col items-center justify-center aspect-square hover-card">
                    <span className="font-bold mb-1">ANIMA</span>
                    <span className="text-sm">TION</span>
                  </div>
                  <div className="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-center aspect-square hover-card">
                    <span className="font-bold mb-1">A</span>
                    <span className="text-sm">RT</span>
                  </div>
                  <div className="bg-yellow-400 text-black p-4 rounded-lg flex flex-col items-center justify-center aspect-square hover-card">
                    <span className="font-bold mb-1">DE</span>
                    <span className="text-sm">SIGN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="min-h-screen flex items-center relative py-24"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-12 md:mb-0">
                <h2 className="text-9xl font-bold text-red-500 opacity-80 text-gradient">
                  02
                </h2>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-4xl font-bold mb-8">Portfolio</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Project 1 (Larger) */}
                  <div
                    className="relative rounded-lg overflow-hidden group h-96 cursor-pointer portfolio-card md:col-span-1"
                    onClick={() => openProjectModal(featuredProjects[0])}
                  >
                    <img
                      src={featuredProjects[0].image}
                      alt={featuredProjects[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h4 className="text-2xl font-bold mb-2">
                        {featuredProjects[0].title}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {featuredProjects[0].description.substring(0, 80)}...
                      </p>
                    </div>
                  </div>

                  {/* Project 2 & 3 (Stacked) */}
                  <div className="grid grid-rows-2 gap-6 h-96">
                    <div
                      className="relative rounded-lg overflow-hidden group cursor-pointer portfolio-card"
                      onClick={() => openProjectModal(featuredProjects[1])}
                    >
                      <img
                        src={featuredProjects[1].image}
                        alt={featuredProjects[1].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h4 className="text-xl font-bold">
                          {featuredProjects[1].title}
                        </h4>
                      </div>
                    </div>

                    <div
                      className="relative rounded-lg overflow-hidden group cursor-pointer portfolio-card"
                      onClick={() => openProjectModal(featuredProjects[2])}
                    >
                      <img
                        src={featuredProjects[2].image}
                        alt={featuredProjects[2].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h4 className="text-xl font-bold">
                          {featuredProjects[2].title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setShowMoreProjects(true);
                      setTimeout(() => scrollToSection("more-projects"), 100);
                    }}
                    className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors glow-button-yellow"
                  >
                    <span>More Projects</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Projects Section */}
        <section
          id="more-projects"
          className={`py-24 ${showMoreProjects ? "opacity-100 transition-opacity duration-1000" : "hidden"}`}
        >
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold mb-12 text-center">
              More Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative rounded-lg overflow-hidden group h-80 cursor-pointer portfolio-card"
                  onClick={() => openProjectModal(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                  {project.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-500 bg-opacity-80 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-6">
                    <h4 className="text-xl font-bold mb-1">{project.title}</h4>
                    <p className="text-sm text-gray-300">{project.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center relative py-24"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-12 md:mb-0">
                <h2 className="text-9xl font-bold text-white opacity-80 text-gradient">
                  03
                </h2>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-4xl font-bold mb-8">Contact</h3>
                <p className="text-gray-300 mb-12 max-w-2xl">
                  Ready to bring your vision to life? Get in touch with our team
                  and let's create something extraordinary together. We're
                  always excited to hear about new projects and challenges.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-8">
                      <div className="relative rounded-lg overflow-hidden h-48 shadow-glow">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.853168072943!2d39.846698610872885!3d-3.621015542620763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183fdd7227386f55%3A0xce850e5b681e0aee!2sKibaoni!5e0!3m2!1sen!2ske!4v1740758540250!5m2!1sen!2ske"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          title="KOLOWA Studio Location"
                        ></iframe>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 contact-info">
                        <MapPin className="text-red-500 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold">Address</h4>
                          <p className="text-gray-400">
                            Kibaoni, Kilifi, Kenya
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex items-start space-x-3 contact-info"
                        onClick={handleEmailClick}
                      >
                        <Mail className="text-red-500 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold">Email</h4>
                          <p className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                            kolowa@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 contact-info">
                        <div className="text-red-500 mt-1">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.2 22.09 16.48 21.89 14.87 21.37C13.33 20.88 11.89 20.08 10.59 19.02C9.32 17.99 8.24 16.77 7.38 15.41C6.55 14.08 6.01 12.61 5.79 11.07C5.76019 10.5223 5.96934 9.99375 6.34679 9.61467C6.72424 9.23559 7.25181 9.0243 7.8 9.02999H10.8C11.2817 9.02532 11.7507 9.18516 12.1371 9.48428C12.5235 9.78341 12.8031 10.2031 12.93 10.67C13.15 11.68 13.49 12.67 13.94 13.59C14.1108 13.9881 14.1483 14.4358 14.0458 14.8586C13.9432 15.2815 13.7068 15.6559 13.37 15.92L12.3 16.99C13.0899 18.2444 14.0961 19.3471 15.27 20.25C16.27 19.18 17.46 18.29 18.81 17.61C19.1428 17.4305 19.5226 17.3591 19.8981 17.4055C20.2736 17.4519 20.6259 17.6142 20.9 17.87C21.82 18.59 22.81 19.13 23.82 19.47C24.2967 19.6129 24.7058 19.9049 24.9853 20.3079C25.2647 20.7108 25.3988 21.1978 25.37 21.69V24.69C25.37 25.2404 25.1593 25.7696 24.7842 26.1447C24.4091 26.5198 23.8799 26.7305 23.33 26.73C21.57 26.86 19.85 26.66 18.24 26.14C16.7 25.6479 15.2645 24.8511 14 23.79C12.7222 22.7574 11.6271 21.5383 10.76 20.18C9.92999 18.85 9.38999 17.38 9.16999 15.84C9.13829 15.2932 9.34544 14.7652 9.72198 14.3864C10.0985 14.0076 10.6262 13.7953 11.17 13.8H14.17C14.6517 13.7953 15.1207 13.9552 15.5071 14.2543C15.8935 14.5534 16.1731 14.9731 16.3 15.44C16.52 16.45 16.86 17.44 17.31 18.36C17.4808 18.7581 17.5183 19.2058 17.4158 19.6286C17.3132 20.0515 17.0768 20.4259 16.74 20.69L15.67 21.76C16.4599 23.0144 17.4661 24.1171 18.64 25.02C19.64 23.95 20.83 23.06 22.18 22.38C22.5128 22.2005 22.8926 22.1291 23.2681 22.1755C23.6436 22.2219 23.9959 22.3842 24.27 22.64C25.19 23.36 26.18 23.9 27.19 24.24C27.6667 24.3829 28.0758 24.6749 28.3553 25.0779C28.6347 25.4808 28.7688 25.9678 28.74 26.46V29.46C28.74 30.0104 28.5293 30.5396 28.1542 30.9147C27.7791 31.2898 27.2499 31.5005 26.7 31.5C24.94 31.63 23.22 31.43 21.61 30.91C20.0677 30.4161 18.6297 29.619 17.36 28.56C16.0822 27.5274 14.9871 26.3083 14.12 24.95C13.29 23.62 12.75 22.15 12.53 20.61C12.4983 20.0632 12.7054 19.5352 13.082 19.1564C13.4585 18.7776 13.9862 18.5653 14.53 18.57H17.53C18.0117 18.5653 18.4807 18.7252 18.8671 19.0243C19.2535 19.3234 19.5331 19.7431 19.66 20.21C19.88 21.22 20.22 22.21 20.67 23.13C20.8408 23.5281 20.8783 23.9758 20.7758 24.3986C20.6732 24.8215 20.4368 25.1959 20.1 25.46L19.03 26.53C19.8199 27.7844 20.8261 28.8871 22 29.79C23 28.72 24.19 27.83 25.54 27.15C25.8728 26.9705 26.2526 26.8991 26.6281 26.9455C27.0036 26.9919 27.3559 27.1542 27.63 27.41C28.55 28.13 29.54 28.67 30.55 29.01C31.0267 29.1529 31.4358 29.4449 31.7153 29.8479C31.9947 30.2508 32.1288 30.7378 32.1 31.23V34.23C32.1 34.7804 31.8893 35.3096 31.5142 35.6847C31.1391 36.0598 30.6099 36.2705 30.06 36.27C28.3 36.4 26.58 36.2 24.97 35.68C23.4293 35.1906 21.9932 34.3937 20.73 33.33C19.4522 32.2974 18.3571 31.0783 17.49 29.72C16.66 28.39 16.12 26.92 15.9 25.38C15.8683 24.8332 16.0754 24.3052 16.452 23.9264C16.8285 23.5476 17.3562 23.3353 17.9 23.34H20.9C21.3817 23.3353 21.8507 23.4952 22.2371 23.7943C22.6235 24.0934 22.9031 24.5131 23.03 24.98C23.25 25.99 23.59 26.98 24.04 27.9C24.2108 28.2981 24.2483 28.7458 24.1458 29.1686C24.0432 29.5915 23.8068 29.9659 23.47 30.23L22.4 31.3C23.1899 32.5544 24.1961 33.6571 25.37 34.56C26.37 33.49 27.56 32.6 28.91 31.92C29.2428 31.7405 29.6226 31.6691 29.9981 31.7155C30.3736 31.7619 30.7259 31.9242 31 32.18C31.92 32.9 32.91 33.44 33.92 33.78C34.3967 33.9229 34.8058 34.2149 35.0853 34.6179C35.3647 35.0208 35.4988 35.5078 35.47 36V39C35.47 39.5504 35.2593 40.0796 34.8842 40.4547C34.5091 40.8298 33.9799 41.0405 33.43 41.04C31.67 41.17 29.95 40.97 28.34 40.45C26.8 39.9579 25.3645 39.1611 24.1 38.1C22.8222 37.0674 21.7271 35.8483 20.86 34.49C20.03 33.16 19.49 31.69 19.27 30.15C19.2383 29.6032 19.4454 29.0752 19.822 28.6964C20.1985 28.3176 20.7262 28.1053 21.27 28.11H24.27C24.7517 28.1053 25.2207 28.2652 25.6071 28.5643C25.9935 28.8634 26.2731 29.2831 26.4 29.75C26.62 30.76 26.96 31.75 27.41 32.67C27.5808 33.0681 27.6183 33.5158 27.5158 33.9386C27.4132 34.3615 27.1768 34.7359 26.84 35L25.77 36.07C26.5599 37.3244 27.5661 38.4271 28.74 39.33"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold">Phone</h4>
                          <p className="text-gray-400">+254 746 035 907</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <form className="space-y-4" onSubmit={handleContactSubmit}>
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          rows={4}
                          required
                          className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-red-500 transition-colors"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-black border border-red-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-red-500 transition-colors glow-button"
                        >
                          <span>Send</span>
                          <Send size={16} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">
                © 2025 KOLOWA Studio. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/kolowa.ke"
                className="text-gray-500 hover:text-white transition-colors social-icon"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      {showPortfolioModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden">
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X size={24} />
            </button>

            <div className="h-80 relative">
              {selectedProject.isVideo && selectedProject.videoUrl ? (
                <div className="w-full h-full">
                  <iframe
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                </>
              )}
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-red-500">{selectedProject.category}</p>
                </div>
                {selectedProject.isVideo && selectedProject.videoUrl ? (
                  <a
                    href={selectedProject.videoUrl.replace(
                      "embed/",
                      "watch?v=",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-yellow-400 mt-4 md:mt-0"
                  >
                    <span className="mr-2">Watch on YouTube</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <a
                    href="#"
                    className="inline-flex items-center text-yellow-400 mt-4 md:mt-0"
                  >
                    <span className="mr-2">View Live</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <p className="text-gray-300 mb-8">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <User className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-gray-400">CLIENT</h4>
                    <p>{selectedProject.client}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-gray-400">DATE</h4>
                    <p>{selectedProject.date}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Tag className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-gray-400">
                      SERVICES
                    </h4>
                    <p>{selectedProject.services.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        projects={projectsData}
        onUpdateProjects={handleUpdateProjects}
      />
    </div>
  );
}

// TypeScript interface for project data
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  date: string;
  services: string[];
  featured: boolean;
  videoUrl?: string;
  isVideo?: boolean;
}

export default App;
