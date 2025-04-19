import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Bason Park",
  initials: "BP",
  url: "https://dillion.io",
  location: "Seoul, South Korea",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "It's like Jason with a B. Words like AI, blockchain, and art turn me on.",
  summary:
    "I was born in Japan, raised in South Korea, and educated in the US. I focused on computer science and business management at Columbia University. After graduating in 2021, I decided to explore some other cultures, especially those in South America and Europe. Now I am pursuing projects in AI and blockchain to enhance the quality of our lives.",
  avatarUrl: "/basonpark.png",

  skills: [
    "Solidity",
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "basonpark@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/basonpark",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "www.linkedin.com/in/basonpark",
        icon: Icons.linkedin,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Crimson Education",
      href: "https://www.crimsoneducation.org/",
      badges: [],
      location: "New York, NY",
      title: "Strategy Consultant",
      logoUrl: "/crimsonedu.png",
      start: "July 2018",
      end: "March 2024",
      description:
        "As a Strategy Consultant at Crimson Education, I leverage my extensive technical expertise to empower top-performing high school students in their academic and career pursuits.",
    },
    {
      company: "Mount Sinai Health System",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/mountsinai.png",
      start: "April 2020",
      end: "October 2020",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
    },
    {
      company: "Lucas Brand Equity",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Private Equity Analyst",
      logoUrl: "/lbequity.png",
      start: "June 2019",
      end: "September 2019",
      description:
        "LB Equity is a private equity firm focusing in the beauty, wellness, and personal care space.",
    },
    {
      company: "Astorian",
      href: "https://splunk.com",
      badges: [],
      location: "San Jose, CA",
      title: "Software Engineer",
      logoUrl: "/astorian.png",
      start: "September 2018",
      end: "November 2018",
      description:
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
    },
    {
      company: "United Nations Mission in South Sudan",
      href: "https://li.me/",
      badges: [],
      location: "Juba, South Sudan",
      title: "Security Engineer, UN Peacekeeper",
      logoUrl: "/unmiss.png",
      start: "July 2017",
      end: "March 2028",
      description:
        "ROK Horizontal Military Engineering Company (HMEC) under UNMISS fosters long-term statebuilding, conflict mitigation, and civilian protection in South Sudan.\n\n12-week sessions at Hanbit Vocational School focusing on teaching welding, carpentry, construction, and electricity to Dinka, Nuer, and Murle tribe members",
    },
    {
      company: "Republic of Korea Army",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Seoul, South Korea",
      title: "Network Operations Officer, Sergeant",
      logoUrl: "/rok.png",
      start: "October 2016",
      end: "July 2018",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  certifications: [
    {
      name: "Advanced Solidity Developer",
      organization: "Metana Bootcamp",
      href: "",
      logoUrl: "/metana.png",
      date: "April 2025",
    },
    {
      name: "Full Stack Developer ",
      organization: "Metana Bootcamp",
      href: "",
      logoUrl: "/metana.png",
      date: "April 2025",
    },
    {
      name: "AWS Certified SysOps Administrator - Associate",
      organization: "Amazon Web Services",
      href: "https://www.credly.com/badges/a9926059-0b90-42cb-9e34-535a8582642e",
      logoUrl: "/aws.png",
      date: "January 2025",
    },
    {
      name: "AWS Certified Developer - Associate",
      organization: "Amazon Web Services",
      href: "https://www.credly.com/badges/0bf0ae95-8aa6-4270-8ff7-a1cc7ec019cc/linked_in_profile",
      logoUrl: "/aws.png",
      date: "November 2024",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      organization: "Amazon Web Services",
      href: "https://www.credly.com/badges/42f193e7-4053-48cb-b377-579b8702c0f5/linked_in_profile",
      logoUrl: "/aws.png",
      date: "October 2024",
    },
    {
      name: "Spanish DELE Level C1",
      organization: "Instituto Cervantes",
      href: "https://csv.cervantes.es/?csv=M4VFA65YNGE2RDCWF21LCEW8M2",
      logoUrl: "/instituto.png",
      date: "February 2025",
    },
  ],
  education: [
    {
      school: "Columbia University",
      href: "https://www.columbia.edu/",
      degree: "Bachelor's Degree of Computer Science and Business Management",
      logoUrl: "/columbialogo.png",
      start: "2015",
      end: "2021",
    },
    {
      school: "Seoul International School",
      href: "https://uwaterloo.ca",
      degree: "High School Diploma",
      logoUrl: "/waterloo.png",
      start: "2002",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Monkey Mind",
      href: "https://monkeymind.app",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Prophit",
      href: "https://magicui.design",
      active: true,
      description: "Prediction market using Chainlink Oracle",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Solidity",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "Lumina Finance",
      href: "https://defi-stablecoin-yield.vercel.app/",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://defi-stablecoin-yield.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/basonpark/defi-stablecoin-yield",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "AI Smart Contract Auditor",
      href: "https://automatic.chat",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
    {
      title: "Ether Guru",
      href: "https://ether-guru-eta.vercel.app/",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://ether-guru-eta.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/ether-guru.mp4",
    },
    {
      title: "Dao Governance",
      href: "https://ether-guru-eta.vercel.app/",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://ether-guru-eta.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/ether-guru.mp4",
    },
  ],
};
