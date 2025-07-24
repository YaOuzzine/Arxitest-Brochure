import { AIProvider, Integration, TechStack, Feature, Testimonial, PricingTier } from '@/types';

export const AI_PROVIDERS: AIProvider[] = [
  {
    name: "OpenAI GPT-4",
    description: "Advanced natural language processing for intelligent test generation and analysis with state-of-the-art reasoning capabilities.",
    capabilities: ["Natural Language Processing", "Code Generation", "Test Case Analysis", "Error Detection"],
    logo: "/assets/icons/ChatGPT-Logo.svg.png",
    color: "#00D4AA"
  },
  {
    name: "Claude Sonnet",
    description: "Sophisticated AI reasoning for complex test scenarios and detailed code analysis with exceptional contextual understanding.",
    capabilities: ["Complex Reasoning", "Code Review", "Documentation", "Problem Solving"],
    logo: "/assets/icons/claude-logo-png.png",
    color: "#D97706"
  },
  {
    name: "Deepseek",
    description: "Cost-effective AI solution for scalable test automation with specialized code understanding and generation.",
    capabilities: ["Code Understanding", "Efficient Processing", "Scale Optimization", "Cost Effectiveness"],
    logo: "/assets/icons/deepseek-2.svg",
    color: "#7C3AED"
  },
  {
    name: "Google Gemini",
    description: "Multimodal AI capabilities for comprehensive testing including visual, audio, and text-based test scenarios.",
    capabilities: ["Multimodal Analysis", "Visual Testing", "Audio Processing", "Cross-Platform"],
    logo: "/assets/icons/Google_Gemini_logo.svg.png",
    color: "#4285F4"
  },
  {
    name: "Local AI Models",
    description: "Self-hosted AI models for maximum data privacy and control, supporting various open-source LLMs and custom deployments.",
    capabilities: ["Data Privacy", "On-Premise Hosting", "Custom Models", "Full Control"],
    logo: "Server",
    color: "#64748B"
  }
];

export const TECH_STACK: TechStack[] = [
  {
    category: "Frontend Technologies",
    technologies: [
      {
        name: "Alpine.js",
        description: "Lightweight reactive framework for dynamic user interfaces",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg",
        color: "#8BC34A",
        website: "https://alpinejs.dev"
      },
      {
        name: "TailwindCSS",
        description: "Utility-first CSS framework for rapid UI development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4",
        website: "https://tailwindcss.com"
      },
      {
        name: "Chart.js",
        description: "Beautiful and responsive charts for data visualization",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg",
        color: "#FF6384",
        website: "https://chartjs.org"
      },
      {
        name: "HTML5",
        description: "Modern markup language with advanced web capabilities",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        color: "#E34F26",
        website: "https://html.spec.whatwg.org"
      }
    ]
  },
  {
    category: "Backend Technologies",
    technologies: [
      {
        name: "Laravel 11",
        description: "Elegant PHP framework for robust web applications",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
        color: "#FF2D20",
        website: "https://laravel.com"
      },
      {
        name: "PostgreSQL",
        description: "Advanced open-source relational database system",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        color: "#336791",
        website: "https://postgresql.org"
      },
      {
        name: "Docker",
        description: "Containerization platform for isolated test execution",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        color: "#2496ED",
        website: "https://docker.com"
      },
      {
        name: "PHP",
        description: "Server-side scripting language for web development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        color: "#777BB4",
        website: "https://php.net"
      }
    ]
  },
  {
    category: "Testing Frameworks",
    technologies: [
      {
        name: "Selenium WebDriver",
        description: "Cross-browser automation for comprehensive web testing",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
        color: "#43B02A",
        website: "https://selenium.dev"
      },
      {
        name: "Playwright",
        description: "Modern end-to-end testing framework for web applications",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
        color: "#2EAD33",
        website: "https://playwright.dev"
      },
      {
        name: "AI Test Generation",
        description: "Intelligent test creation using natural language processing",
        icon: "Brain",
        color: "#8B5CF6",
        website: "#"
      }
    ]
  }
];

export const INTEGRATIONS: Integration[] = [
  {
    name: "Jira Integration",
    description: "Complete bidirectional synchronization with your Jira workspace for seamless project management.",
    features: [
      "OAuth 2.0 authentication flow",
      "Bidirectional synchronization",
      "Real-time issue tracking",
      "Automated story import",
      "Test result publishing"
    ],
    logo: "/assets/icons/jira-1.svg",
    color: "#0052CC"
  },
  {
    name: "GitHub Integration",
    description: "Deep repository integration for code analysis, imports, and continuous integration workflows.",
    features: [
      "Repository connection",
      "File analysis and import",
      "Webhook event handling",
      "CI/CD pipeline integration",
      "Pull request automation"
    ],
    logo: "/assets/icons/Octicons-mark-github.svg",
    color: "#181717"
  },
  {
    name: "Taiga Integration",
    description: "Modern agile project management with real-time collaboration and sprint synchronization.",
    features: [
      "Sprint synchronization",
      "User story management",
      "Kanban board integration",
      "Team collaboration features",
      "Agile workflow automation"
    ],
    logo: "/assets/icons/Taiga-logo.png",
    color: "#88C542",
    isNew: true
  }
];

export const CORE_FEATURES: Feature[] = [
  {
    title: "AI-Powered Test Generation",
    description: "Transform user stories into comprehensive test suites using advanced natural language processing.",
    icon: "Brain",
    color: "#8B5CF6"
  },
  {
    title: "Containerized Execution",
    description: "Isolated test environments with Docker ensure clean, reproducible, and scalable test runs.",
    icon: "Container",
    color: "#2196F3"
  },
  {
    title: "Deep Integrations",
    description: "Seamless connectivity with Jira, GitHub, Taiga, and custom tools through our OAuth framework.",
    icon: "Link",
    color: "#4CAF50"
  },
  {
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards with live monitoring, performance metrics, and intelligent insights.",
    icon: "BarChart3",
    color: "#FF6B35"
  },
  {
    title: "Team Collaboration",
    description: "Multi-user editing, role-based permissions, and real-time collaboration tools for distributed teams.",
    icon: "Users",
    color: "#9C27B0"
  },
  {
    title: "Enterprise Security",
    description: "SOC 2, ISO 27001, and GDPR compliant with enterprise-grade security and data protection.",
    icon: "Shield",
    color: "#F44336"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Amine Abouaomar",
    role: "Technical Supervisor",
    company: "Research & Development",
    content: "Arxitest represents a paradigm shift in software testing. The AI-driven approach transforms complex QA processes into intuitive workflows, making enterprise-grade testing accessible to any development team.",
    avatar: "/assets/images/Amine-Abouaomar-1.webp",
    rating: 5
  },
  {
    name: "Yasser Ouzzine",
    role: "Lead Developer",
    company: "Platform Architecture",
    content: "Building Arxitest has been an incredible journey. We've created something that democratizes quality assurance - from small startups to large enterprises, everyone can now implement sophisticated testing strategies without specialized expertise.",
    avatar: "/assets/images/yasser.jpeg",
    rating: 5
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free Trial",
    price: 0,
    period: "30 days",
    description: "Perfect for exploring Arxitest capabilities and small projects",
    features: [
      "1 container concurrency",
      "Basic analytics dashboard",
      "Community support",
      "Core integrations",
      "Up to 10 test cases per month"
    ],
    ctaText: "Start Free Trial"
  },
  {
    name: "Team Edition",
    price: 49,
    period: "per month",
    description: "Ideal for growing teams and active development projects",
    features: [
      "5 parallel containers",
      "Advanced analytics & reporting",
      "AI test generation (unlimited)",
      "Priority email support",
      "All integrations included",
      "Team collaboration tools",
      "Custom test templates"
    ],
    highlighted: true,
    ctaText: "Start Team Plan"
  },
  {
    name: "Enterprise",
    price: 0,
    period: "custom pricing",
    description: "Tailored solutions for large organizations with specific needs",
    features: [
      "Unlimited parallel containers",
      "Custom pricing calculator",
      "24/7 dedicated support",
      "Custom integrations",
      "On-premise deployment option",
      "SLA guarantees",
      "Advanced security features",
      "Training & consultation"
    ],
    ctaText: "Contact Sales"
  }
];

export const NAVIGATION_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" }
];

export const DEMO_STEPS = [
  {
    id: "connection",
    title: "Project Connection",
    description: "Connect your existing project management tools",
    duration: 3000
  },
  {
    id: "analysis",
    title: "AI Analysis & Generation",
    description: "AI analyzes your stories and generates test cases",
    duration: 5000
  },
  {
    id: "generation",
    title: "Script Generation & Review",
    description: "Generate executable test scripts with syntax highlighting",
    duration: 4000
  },
  {
    id: "execution",
    title: "Container Execution",
    description: "Run tests in isolated Docker containers",
    duration: 6000
  },
  {
    id: "results",
    title: "Results & Analytics",
    description: "Comprehensive reporting and performance insights",
    duration: 4000
  },
  {
    id: "sync",
    title: "Integration Sync",
    description: "Sync results back to your project management tools",
    duration: 3000
  }
];