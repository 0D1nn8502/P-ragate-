import { ScrollReveal } from '../ui/ScrollReveal';
import { ImageTextBlock } from '../ui/ImageTextBlock';

const storyContent = [
  {
    title: 'Born from Passion',
    description: [
      'What started as two backpackers meeting on a train through Southeast Asia has grown into a thriving community of adventurers, dreamers, and cultural enthusiasts.',
      'We believe travel isnt just about destinations—its about transformation, connection, and the stories that shape who we become.',
    ],
    reverse: false,
  },
  {
    title: 'Beyond the Ordinary',
    description: [
      'Every journey we craft is designed to take you off the beaten path, into authentic experiences that forge genuine connections with local communities and cultures.',
      'From hidden mountain villages to bustling night markets, we curate moments that linger long after you have returned home.',
    ],
    reverse: true,
  },
];

export function StorySection() {
  return (
    <section className="relative z-10 py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold mb-20">
            Our Story
          </h2>
        </ScrollReveal>

        <div className="space-y-32">
          {storyContent.map((content, index) => (
            <ImageTextBlock
              key={index}
              title={content.title}
              description={content.description}
              reverse={content.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}