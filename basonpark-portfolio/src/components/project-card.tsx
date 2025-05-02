import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags: readonly string[];
  link?: string;
  image?: string | StaticImageData;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
    gradient?: string;
  }[];
  className?: string;
  isFeatured?: boolean;
  gradient?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  isFeatured,
  gradient,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border-muted rounded-lg shadow-xl h-full",
        "mb-4 p-10 shadow-2xl",
        gradient ? gradient : "bg-gradient-to-br from-zinc-400 to-zinc-100"
      )}
    >
      {/* Media Section: Render image or video, wrap with Link if href exists */}
      {(video || image) && (
        href ? (
          <Link href={href} className={cn("block cursor-pointer", className)}>
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="mb-4 pointer-events-none mx-auto h-100 w-full object-cover object-top rounded-md"
              />
            )}
            {image && !video && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-40 w-full overflow-hidden object-cover object-top"
              />
            )}
          </Link>
        ) : (
          <div className={className}> {/* Container if no href */}
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="mb-4 pointer-events-none mx-auto h-100 w-full object-cover object-top rounded-md"
              />
            )}
            {image && !video && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-40 w-full overflow-hidden object-cover object-top"
              />
            )}
          </div>
        )
      )}

      <CardHeader className="px-2 mb-2">
        <div className="space-y-1">
          <CardTitle
            className={cn(
              "mt-1 text-xl sm:text-4xl bg-gradient-to-br from-slate-700 to-slate-900 text-transparent bg-clip-text"
            )}
          >
            {title}
          </CardTitle>
          <Markdown
            className={cn(
              "prose max-w-full text-pretty font-sans text-md text-slate-700 dark:prose-invert"
            )}
          >
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col px-2 flex-grow">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
