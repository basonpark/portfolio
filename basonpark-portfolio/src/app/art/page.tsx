import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function ArtPage() {
  // Placeholder image URL - replace with actual art later
  const placeholderImageUrl =
    "https://via.placeholder.com/800x600/cccccc/969696?text=Placeholder+Art";

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Under Construction
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Art Display */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <AspectRatio ratio={4 / 3}>
              <Image
                src={`${placeholderImageUrl}&item=${item}`}
                alt={`Placeholder Art ${item}`}
                layout="fill"
                objectFit="cover"
                className="bg-muted"
              />
            </AspectRatio>
            <div className="p-4">
              <h3 className="font-semibold">Coming Soon {item}</h3>
              <p className="text-sm text-muted-foreground">
                Description for art piece {item}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
