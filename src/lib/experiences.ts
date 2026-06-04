import { sql } from "@/lib/db";

export type Experience = {
  id: string;
  title: string;
  location: string;
  images: string[];
  description: string;
  publishedAt: string;
  homepageShelves: string[];
};

type ExperienceRow = {
  id: string;
  title: string;
  location: string;
  images: string[];
  description: string;
  published_at: string | Date;
  homepage_shelves: string[] | null;
};

function mapExperience(row: ExperienceRow): Experience {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    images: row.images ?? [],
    description: row.description,
    homepageShelves: row.homepage_shelves ?? [],
    publishedAt:
      row.published_at instanceof Date
        ? row.published_at.toISOString()
        : row.published_at,
  };
}

export async function getPublishedExperiences(): Promise<Experience[]> {
  const rows = (await sql`
    SELECT
      id,
      title,
      location,
      images,
      description,
      homepage_shelves,
      published_at
    FROM experiences
    ORDER BY published_at DESC;
  `) as ExperienceRow[];

  return rows.map(mapExperience);
}

export async function getRecentExperiences(limit = 3): Promise<Experience[]> {
  const rows = (await sql`
    SELECT
      id,
      title,
      location,
      images,
      description,
      homepage_shelves,
      published_at
    FROM experiences
    ORDER BY published_at DESC
    LIMIT ${limit};
  `) as ExperienceRow[];

  return rows.map(mapExperience);
}
