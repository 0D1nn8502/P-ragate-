// components/ui/ImageTextBlock.tsx
import { ScrollReveal } from './ScrollReveal';
import { cn } from '@/utils/cn';

interface ImageTextBlockProps {
  title: string;
  description: string[];
  reverse?: boolean;
  imagePlaceholder?: string;
}

export function ImageTextBlock({
  title,
  description,
  reverse = false,
  imagePlaceholder = '📷',
}: ImageTextBlockProps) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          'flex flex-col lg:flex-row gap-12 lg:gap-16 items-center',
          reverse && 'lg:flex-row-reverse'
        )}
      >
        {/* Image Box */}
        <div className="flex-1 w-full">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-10">{imagePlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 w-full">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
            {title}
          </h2>
          <div className="space-y-5">
            {description.map((paragraph, index) => (
              <p key={index} className="text-lg text-neutral-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}