"use client";

import { HackathonCard } from "@/components/hackathon-card";
import SlideFadeIn from "@/components/magicui/slide-fade-in"; // Import the new component
import BlurFade from "@/components/magicui/blur-fade"; // Re-import BlurFade
import PopUpFadeIn from "@/components/magicui/pop-up-fade-in"; // Import PopUpFadeIn
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import QuoteCard from "@/components/QuoteCard"; // Import the new QuoteCard component
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { quotesData } from "@/data/quotes"; // Import quotes data
import { ScrollBoldText } from "@/components/ScrollBoldText"; // Added import
import { Button } from "@/components/ui/button"; // Import Button for social links
import { Linkedin, Github, Mail } from "lucide-react"; // Import icons for social links
import { TypeAnimation } from "react-type-animation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const BLUR_FADE_DELAY = 0.04;

interface QuoteType {
  quote: string;
  author?: string;
}

export default function Page() {
  useSmoothScroll();

  const [mainPageQuote, setMainPageQuote] = useState<QuoteType | null>(null);

  useEffect(() => {
    const quotesPool = quotesData.slice(0, 26);
    if (quotesPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesPool.length);
      setMainPageQuote(quotesPool[randomIndex]);
    }
  }, []);

  // Define color map for language badges with gradients
  const languageColors: { [key: string]: string } = {
    English: "bg-gradient-to-br from-blue-600 via-white to-red-600 text-black", // Blue -> White -> Red (needs black text)
    Korean: "bg-gradient-to-br from-red-600 to-blue-600 text-white", // Red -> Blue
    Spanish: "bg-gradient-to-br from-yellow-400 to-red-600 text-black", // Yellow -> Red (needs black text)
    Japanese: "bg-gradient-to-br from-red-600 to-white text-black", // Red -> White (needs black text)
    Chinese: "bg-gradient-to-br from-red-600 to-yellow-100 text-black", // Red -> Yellow (needs black text)
    Italian: "bg-gradient-to-br from-green-600 via-white to-red-600 text-black", // Green -> White -> Red (needs black text)
    // Add more languages and colors as needed
  };

  useEffect(() => {
    // GSAP Background Animation
    const bgAnimation = gsap.to("main", {
      // Target the main element// Target background color (light gray)
      ease: "none", // Linear transition
      scrollTrigger: {
        trigger: "main", // Trigger animation based on the main element
        start: "top top", // Start when the top of main hits the top of the viewport
        end: "bottom bottom", // End when the bottom of main hits the bottom of the viewport
        scrub: true, // Smoothly animate based on scroll position
      },
    });

    // Character Bolding Animation for Summary
    const chars = gsap.utils.toArray("#about-summary .scroll-bold-char");
    const boldAnimation = gsap.to(chars, {
      fontWeight: 700,
      color: "#600905",
      backgroundColor: "#ffe8df",
      duration: 1,
      stagger: 0.7, // Apply effect sequentially with a slightly faster delay
      ease: "none",
      scrollTrigger: {
        trigger: "#about-summary", // Element containing the text
        start: "top bottom-=200", // Start when top is 200px from viewport bottom
        end: "bottom center", // End when bottom reaches viewport center
        scrub: true, // Directly link animation to scroll
      },
    });

    // Cleanup function to kill the animation and ScrollTrigger instance on unmount
    return () => {
      bgAnimation.kill();
      // New cleanup for bold animation
      if (boldAnimation) boldAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Separate Monkey Mind project from others
  const monkeyMindProject = DATA.projects.find(p => p.title === "Monkey Mind");
  const otherProjects = DATA.projects.filter(p => p.title !== "Monkey Mind");

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-40">
      <section id="hero">
        <QuoteCard />
        <div className="mx-auto w-full max-w-4xl space-y-8 mb-32">
          <div className="gap-3 flex items-center mt-14">
            <div className="flex-col flex flex-1 space-y-2">
              {/* Name Typing Animation */}
              <BlurFade delay={BLUR_FADE_DELAY}>
                <TypeAnimation
                  sequence={[
                    `Hi 👋 I'm ${DATA.name.split(" ")[0]}`, // Name text
                    500, // Pause after name
                  ]}
                  wrapper="h1" // Use h1 for semantic heading
                  speed={50} // Typing speed
                  className="font-verona text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none block" // Apply styles
                  repeat={0} // Type once
                  cursor={false} // Hide cursor
                />
              </BlurFade>

              {/* Description Typing Animation (Sequenced) */}
              <BlurFade delay={BLUR_FADE_DELAY} className="min-h-8">
                {" "}
                {/* Reserve vertical space */}
                <TypeAnimation
                  sequence={[
                    2000, // Initial delay (wait for name)
                    "It's like Jason with a B.", // Type part 1
                    3000, // Pause for 1 second
                    " Welcome to my mindspace.", // Type part 2 (Note: uses the actual text, ensure it matches DATA.description)
                    1000, // Pause briefly at the end
                    "Hope your day is going",
                    2000, // Pause briefly at the end
                    "Hope your day is going better than expected",
                    1000, // Pause briefly at the end
                    "Mine's going pretty well",
                    2000,
                    "Mine's going pretty well because you're here",
                    2000,
                    "Mine's going pretty well because you're here :)", // Type the full phrase
                    500, // Final pause to show ':)'
                    ":)",
                  ]}
                  wrapper="span" // Use span to avoid block layout issues
                  speed={50} // Typing speed
                  className="max-w-[600px] md:text-xl block" // Apply styles and ensure block display
                  repeat={0} // Type only once
                  cursor={true} // Show blinking cursor during animation
                />
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-48 border">
                {" "}
                {/* Increased size */}
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="space-y-8 max-w-[52rem] mx-auto py-10 px-10 rounded-2xl shadow-2xl"
      >
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-4xl font-bold mb-2">Origin</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          {/* Replace Markdown with ScrollBoldText for character animation */}
          <ScrollBoldText id="about-summary" text={DATA.summary} />
        </BlurFade>
      </section>

      <div>
        <section id="projects" className="mt-20">
          {" "}
          {/* Added top margin */}
          <div className="space-y-12 w-full py-12">
            <PopUpFadeIn delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    My projects often involve AI and blockchain. Here are a few
                    of my favorites.
                  </p>
                </div>
              </div>
            </PopUpFadeIn>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {/* Render Monkey Mind Project first, spanning full width on sm+ screens */}
              {monkeyMindProject && (
                <PopUpFadeIn
                  key={monkeyMindProject.title}
                  delay={BLUR_FADE_DELAY * 12}
                  className="sm:col-span-2" // Make it span 2 columns
                >
                  <ProjectCard
                    isFeatured={true} // Pass the featured prop
                    href={monkeyMindProject.href}
                    key={monkeyMindProject.title}
                    title={monkeyMindProject.title}
                    description={monkeyMindProject.description}
                    tags={monkeyMindProject.technologies}
                    image={monkeyMindProject.image}
                    video={monkeyMindProject.video}
                    links={monkeyMindProject.links}
                  />
                </PopUpFadeIn>
              )}

              {/* Render the rest of the projects */}
              {otherProjects.map((project, id) => (
                <PopUpFadeIn
                  key={project.title}
                  // Adjust delay slightly for sequence after Monkey Mind
                  delay={BLUR_FADE_DELAY * 12 + 0.05 + id * 0.05}
                  // Keep existing conditional margin logic if necessary
                  className={`${project.title === "High Einbasing" || project.title === "Sports Card Tracker" ? "mt-16" : ""}`}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                  />
                </PopUpFadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-20 mb-20 mt-20">
          <section id="skills">
            <div className="flex min-h-0 flex-col space-y-3">
              <SlideFadeIn delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-xl font-bold">Skills</h2>
              </SlideFadeIn>
              <div className="flex flex-wrap gap-1">
                {DATA.skills.map((skill, id) => (
                  <SlideFadeIn
                    key={skill}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                    <Badge
                      key={skill}
                      variant="default" // Reverted variant to default
                      className="text-sm font-medium"
                    >
                      {skill}
                    </Badge>
                  </SlideFadeIn>
                ))}
              </div>
            </div>
          </section>
          <section id="work">
            <div className="flex min-h-0 flex-col gap-y-3">
              <SlideFadeIn delay={BLUR_FADE_DELAY * 5}>
                <h2 className="text-xl font-bold">Work Experience</h2>
              </SlideFadeIn>
              {DATA.work.map((work, id) => (
                <SlideFadeIn
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                  <ResumeCard
                    key={work.company}
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </SlideFadeIn>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="flex min-h-0 flex-col gap-y-3">
              <SlideFadeIn delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-xl font-bold">Education</h2>
              </SlideFadeIn>
              {DATA.education.map((education, id) => (
                <SlideFadeIn
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </SlideFadeIn>
              ))}
            </div>
          </section>
          <section id="certifications">
            <div className="flex min-h-0 flex-col gap-y-3">
              <SlideFadeIn delay={BLUR_FADE_DELAY * 6}>
                <h2 className="text-xl font-bold">Certifications</h2>
              </SlideFadeIn>
              {DATA.certifications.map((cert, id) => (
                <SlideFadeIn
                  key={cert.name}
                  delay={BLUR_FADE_DELAY * 7 + id * 0.05}
                >
                  <ResumeCard
                    key={cert.name}
                    href={cert.href}
                    logoUrl={cert.logoUrl}
                    altText={cert.name}
                    title={cert.name}
                    subtitle={cert.organization}
                    period={cert.date}
                  />
                </SlideFadeIn>
              ))}
            </div>
          </section>
          <section id="languages">
            <div className="flex min-h-0 flex-col space-y-3">
              <SlideFadeIn delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-xl font-bold">Languages</h2>
              </SlideFadeIn>
              <div className="flex flex-wrap gap-2">
                {" "}
                {/* Increased gap */}
                {DATA.languages.map((language, id) => (
                  <SlideFadeIn
                    key={language}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                    <Badge
                      key={language}
                      variant="custom"
                      className={`${languageColors[language]} px-3 py-1 text-base`}
                    >
                      {language}
                    </Badge>
                  </SlideFadeIn>
                ))}
              </div>
            </div>
          </section>

          <section id="contact">
            <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <div className="space-y-3">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Contact
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get in Touch
                  </h2>
                  <p className=" mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Want to chat? Just{" "}
                    <a
                      href={DATA.contact.social.LinkedIn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      shoot me a DM
                    </a>{" "}
                    and I&apos;ll respond whenever I can.
                  </p>
                </div>
              </BlurFade>
              {/* Social Links Section */}
              <section id="contact-socials" className="pb-16">
                {" "}
                {/* Added padding */}
                <div className="flex justify-center items-center gap-4">
                  <BlurFade delay={BLUR_FADE_DELAY * 15}>
                    <a
                      href={DATA.contact.social.LinkedIn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Button variant="outline" size="icon">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  </BlurFade>
                  <BlurFade delay={BLUR_FADE_DELAY * 16}>
                    <a
                      href={DATA.contact.social.GitHub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Button variant="outline" size="icon">
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                  </BlurFade>
                  <BlurFade delay={BLUR_FADE_DELAY * 17}>
                    <a
                      href={`mailto:basonpark@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Bason,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and...`}
                      aria-label="Email Bason Park"
                    >
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </a>
                  </BlurFade>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
