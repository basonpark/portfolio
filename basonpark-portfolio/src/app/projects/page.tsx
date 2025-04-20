"use client"; // Required for hooks like useState, useEffect, useRef

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
}

// Export a custom background style for the projects page
// This will be imported by layout.tsx for the projects route
export const projectsPageStyle = {
  backgroundColor: "#F5D6BA", // Light peach background
};

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Reference to the sidebar section for scroll alignment
  const sidebarRef = useRef<HTMLElement>(null);

  // Custom scroll animation function with easing for a weightier feel
  const scrollWithWeight = (targetPosition: number, duration: number = 500) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Easing function that gives a weighted feel with exaggerated bounce
    const easeOutBack = (t: number): number => {
      const c1 = 3; // Increased from 1.70158 for more bounce
      const c2 = c1 * 2; // Increased from c1 * 1.525 for more exaggerated effect
      return 1 + c2 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    // Animation function
    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Apply easing to the progress
      const easedProgress = easeOutBack(progress);

      // Calculate new position with a subtle bounce effect at the end
      window.scrollTo(0, startPosition + distance * easedProgress);

      // Continue animation if not complete
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    // Start the animation
    requestAnimationFrame(animateScroll);
  };

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

      // Use custom weighted scroll instead of window.scrollTo
      scrollWithWeight(offsetPosition);

      // Update active project
      setActiveProject(projectId);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      // Further adjusted root margin for more accurate detection
      rootMargin: "-40% 0px -20% 0px",
      // Multiple thresholds with higher values
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
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

    projectRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add("project-card-initial");
        observer.observe(ref);
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    // Use transparent background here since the parent layout handles the full-width background
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-12 text-center text-white">
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <CardHeader className={isFeatured ? "mb-4" : "mb-2"}>
                  <CardTitle
                    className={
                      isFeatured
                        ? "text-3xl md:text-4xl font-bold text-black"
                        : "text-xl font-semibold text-black"
                    }
                  >
                    {project.title}
                  </CardTitle>
                  <CardDescription
                    className={
                      isFeatured
                        ? "text-lg md:text-xl mt-2 text-gray-700"
                        : "text-sm mt-1 text-gray-700"
                    }
                  >
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Technologies Badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-[#F5D6BA] hover:bg-[#BC8F8F] text-black border-[#BC8F8F]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Links Buttons */}
                  {(project.href ||
                    (project.links && project.links.length > 0)) && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.href && (
                        <Button
                          asChild
                          className="bg-[#BC8F8F] hover:bg-[#8D6E63] text-black border-none"
                        >
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </Button>
                      )}
                      {project.links &&
                        project.links
                          .filter(
                            (link) => !(project.href && link.type === "Website")
                          )
                          .map((link) => (
                            <Button
                              key={link.type}
                              asChild
                              variant="outline"
                              className="border-[#F5D6BA] text-black hover:bg-[#FFE0B2] hover:border-[#BC8F8F]"
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
                  )}
                </CardContent>
              </Card>
            );
          })}
        </main>
      </div>
    </section>
  );
}
