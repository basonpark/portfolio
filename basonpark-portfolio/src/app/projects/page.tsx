"use client"; // Required for hooks like useState, useEffect, useRef

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { DATA } from "@/data/resume";
import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Button } from "@/components/ui/button"; // Import Button
import { Icons } from "@/components/icons"; // Assuming Icons are available

// Helper function to create URL-friendly IDs from project titles
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

interface Project {
  title: string;
  description: string;
  href?: string;
  links?: {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
  video?: string;
  image?: string;
  technologies?: string[]; // Corrected field name
  websiteUrl?: string;
}

// Export a custom background style for the projects page
// This will be imported by layout.tsx for the projects route
const projectsPageStyle = {
  backgroundColor: "#F5D6BA", // Light peach background
};

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Reference to the sidebar section for scroll alignment
  const sidebarRef = useRef<HTMLElement>(null);

  // Handle clicks on sidebar links with custom scrolling
  const handleSidebarLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    projectId: string
  ) => {
    e.preventDefault(); // Prevent default anchor behavior

    const projectElement = document.getElementById(projectId);
    const sidebarTop = sidebarRef.current?.getBoundingClientRect().top || 0;

    if (projectElement) {
      // Calculate position to scroll to (element's position + scroll - desired offset)
      const elementPosition = projectElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - sidebarTop;

      // Use native smooth scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active project
      setActiveProject(projectId);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      // Further adjusted root margin for more accurate detection
      rootMargin: "-40% 0px -20% 0px",
      // Simplified threshold
      threshold: 0.5,
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      obs: IntersectionObserver
    ) => {
      // Sort entries by their intersection ratio so we can find the most visible item
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      // Handle animations for any intersecting elements
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          const animationClass =
            index % 2 === 0
              ? "animate-fade-slide-left"
              : "animate-fade-slide-right";
          entry.target.classList.remove("project-card-initial");
          entry.target.classList.add(animationClass);
        }
      });

      // Only update active state for the most visible entry
      if (visibleEntries.length > 0) {
        const mostVisibleEntry = visibleEntries[0];
        setActiveProject(mostVisibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const currentRefs = projectRefs.current; // Capture the ref value

    projectRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add("project-card-initial");
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        // Use the captured value in cleanup
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    // Use transparent background here since the parent layout handles the full-width background
    <section className="py-12">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-left ml-20 pl-28 pb-2 bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 bg-clip-text text-transparent">
        Projects
      </h1>
      <div className="flex flex-col md:flex-row gap-6 px-2 lg:px-4">
        {/* Sidebar with darker brown background and increased shadow */}
        <aside
          ref={sidebarRef}
          className="w-full md:w-1/5 md:sticky top-24 h-fit mb-8 md:mb-0 bg-[#6D4C41] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] p-5 rounded-xl border border-[#8D6E63]/30 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Projects</h2>
          <nav>
            <ul className="space-y-3">
              {DATA.projects.map((project) => {
                const projectSlug = slugify(project.title);
                const isActive = activeProject === projectSlug;

                return (
                  <li key={project.title}>
                    <a
                      href={`#${projectSlug}`}
                      onClick={(e) => handleSidebarLinkClick(e, projectSlug)}
                      className={`transition-colors text-sm font-semibold px-3 py-2 block w-full ${
                        isActive
                          ? "text-white bg-[#5D4037] border-l-2 border-[#F5D6BA] rounded-r-md shadow-md"
                          : "text-[#F5D6BA] hover:text-white hover:bg-[#5D4037]/50 rounded-r-md"
                      }`}
                    >
                      {project.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="w-full md:w-4/5 space-y-36">
          {" "}
          {/* Increased vertical spacing between cards */}
          {DATA.projects.map((project: Project, index: number) => {
            const isFeatured = project.title === "Monkey Mind";
            const projectId = slugify(project.title);

            return (
              <Card
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                key={project.title}
                // Match exact alignment shown in the image with increased scroll margin
                id={projectId}
                className={`scroll-mt-[12rem] project-card-initial overflow-hidden ${
                  isFeatured
                    ? "border-2 border-[#F5D6BA] bg-white shadow-[0_30px_70px_-5px_rgba(0,0,0,0.7)] ring-2 ring-[#F5D6BA]/20 p-8 md:p-10 hover:shadow-[0_35px_75px_-5px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[75vh]"
                    : "border border-[#FFE0B2] bg-white shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_-5px_rgba(0,0,0,0.6)] p-6 transition-all duration-300 hover:-translate-y-2 min-h-[70vh]"
                }`}
              >
                {project.video && (
                  <div
                    className={`aspect-video overflow-hidden rounded-lg mb-4 ${
                      isFeatured ? "md:mb-6" : "mb-4"
                    }`}
                  >
                    <video
                      src={project.video}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <CardHeader className={isFeatured ? "mb-4" : "mb-2"}>
                  <CardTitle
                    className={
                      isFeatured
                        ? "text-3xl md:text-4xl font-bold text-black"
                        : "text-2xl font-semibold text-black"
                    }
                  >
                    {project.title}
                  </CardTitle>
                  <CardDescription
                    className={
                      isFeatured
                        ? "text-lg md:text-xl mt-2 text-gray-700"
                        : "text-base mt-1 text-gray-700"
                    }
                  >
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col px-4">
                  {/* Technologies Badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-[#FFE0B2] hover:bg-[#F5D6BA] text-white border-[#BC8F8F]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="px-4 pb-4">
                  <div className="flex flex-row flex-wrap items-start gap-2">
                    {/* Primary button linking to the live website */}
                    {project.websiteUrl && (
                      <Button
                        className="h-8 gap-1 bg-gradient-to-r from-orange-300 via-pink-300 to-yellow-200 border border-orange-400 text-gray-800 hover:text-black hover:opacity-90"
                        asChild
                      >
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="mr-1">→</span> Visit Website
                        </a>
                      </Button>
                    )}
                    {/* Secondary buttons for other links (e.g., GitHub) */}
                    {project.links &&
                      project.links
                        .filter((link) => link.type !== "Source")
                        .map((link) => (
                          <Button
                            key={link.type}
                            asChild
                            variant="outline"
                            className="border-[#F5D6BA] text-black hover:bg-[rgb(255,224,178)] hover:border-[#BC8F8F]"
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.type}
                            </a>
                          </Button>
                        ))}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </main>
      </div>
    </section>
  );
}
