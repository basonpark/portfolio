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
  }[];
  className?: string;
  isFeatured?: boolean;
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
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border-muted bg-card p-4 rounded-lg shadow-xl h-full",
        isFeatured &&
          "mb-4 p-10 bg-gradient-to-br from-zinc-400 to-zinc-100 shadow-2xl"
      )}
    >
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
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
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2 mb-2">
        <div className="space-y-1">
          <CardTitle
            className={cn(
              "mt-1 text-base",
              isFeatured && "text-lg sm:text-3xl"
            )}
          >
            {title}
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown
            className={cn(
              "prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert",
              isFeatured && "text-black/90 text-md sm:text-md"
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
