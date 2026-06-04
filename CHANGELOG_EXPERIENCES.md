# Experience DB Change Log

## What changed

1. Added a new database migration in `migrations/002_experiences.sql`.
2. Created a shared experience query layer in `src/lib/experiences.ts`.
3. Updated the landing page in `src/app/page.tsx` to fetch and display recently added experiences.
4. Refactored the main experiences page in `src/app/experiences/page.tsx` to read from the database instead of hardcoded data.
5. Upgraded the hero component in `src/components/Hero.tsx` so it uses its props and has clearer calls to action.
6. Added reusable UI components:
   - `src/components/RecentExperiences.tsx`
   - `src/components/ExperiencesBoard.tsx`
7. Moved experience content out of migrations and into `seeds/experiences.sql`.
8. Added an npm helper script: `npm run db:seed:experiences`.
9. Added `homepage_shelves` so homepage tabs can be explicitly curated from the database.
10. Added a Kilifi Islands experience that uses images from `public/experiences/kilifi`.

## Database notes

- The new `experiences` table stores:
  - `title`
  - `location`
  - `images`
  - `description`
  - `published_at`
- It also includes `created_at` and `updated_at` so records are easier to manage later.
- `migrations/002_experiences.sql` is now schema-only.
- `migrations/003_experience_homepage_shelves.sql` adds the `homepage_shelves` field for tab placement.
- Initial content now lives in `seeds/experiences.sql`.
- The seed file includes two starter experiences and uses existing local placeholder images for Sonbhadra:
  - `/exploration.png`
  - `/travel.avif`
- Kilifi currently uses local placeholder assets from:
  - `/experiences/kilifi/lagoon.avif`
  - `/experiences/kilifi/island-path.png`

## What you need to do next

1. Run the schema migrations in `migrations/002_experiences.sql` and `migrations/003_experience_homepage_shelves.sql`.
2. Seed the initial experience content from `seeds/experiences.sql` on a fresh database.
3. Run `npm run db:refresh:experiences` if you need to update an existing database with the new shelf assignments and Kilifi entry.
4. Add more rows to the `experiences` table as you curate new journeys.
5. If you want admin editing later, the next step is adding create/edit tooling or connecting a CMS.

## Recommended workflow

1. Use `migrations/` for schema changes only.
2. Use `seeds/` for baseline content or sample content.
3. Use explicit fields like `homepage_shelves` when the homepage needs intentional curation.
4. Use direct inserts, an admin tool, or a CMS for new editorial experiences after setup.
