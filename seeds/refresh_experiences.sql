BEGIN;

ALTER TABLE experiences
ADD COLUMN IF NOT EXISTS homepage_shelves TEXT[] NOT NULL DEFAULT '{}';

UPDATE experiences
SET
    images = ARRAY[
        '/experiences/simikot/view2.jpeg',
        '/experiences/simikot/house_outer.jpg',
        '/experiences/simikot/view.jpeg'
    ],
    description = 'A remote stay with Mr. Padmajin, close to Kailash and nestled amidst breathtaking mountains.',
    homepage_shelves = ARRAY[
        'sweet-season',
        'mountain-escapes'
    ]
WHERE title = 'Mountain House in Simikot'
  AND location = 'Simikot, Nepal';

UPDATE experiences
SET
    images = ARRAY[
        '/exploration.png',
        '/travel.avif'
    ],
    description = 'An immersive journey through the prehistoric landscapes of Sonbhadra, with time spent exploring ancient traces of settlement, oral histories tied to the land, and meaningful interaction with the tribal communities that continue to shape the region''s cultural memory.',
    homepage_shelves = ARRAY[
        'cultural-encounters'
    ]
WHERE title = 'Tracing Deep Time in Sonbhadra'
  AND location = 'Sonbhadra, Uttar Pradesh';

INSERT INTO experiences (
    title,
    location,
    images,
    description,
    homepage_shelves,
    published_at
)
SELECT
    'Kilifi Island Tides',
    'Kilifi Islands, Kenya',
    ARRAY[
        '/experiences/kilifi/kilifi_cover.jpeg',
        '/experiences/kilifi/lagoon.avif',
        '/experiences/kilifi/island-path.png'
    ],
    'A slow coastal experience shaped around island crossings, Swahili seascapes, mangrove edges, and the kind of warm-weather rhythm that makes Kilifi feel especially inviting outside the crush of peak tourist season.',
    ARRAY[
        'fresh-arrivals'
    ],
    now()
WHERE NOT EXISTS (
    SELECT 1
    FROM experiences
    WHERE title = 'Kilifi Island Tides'
      AND location = 'Kilifi Islands, Kenya'
);

COMMIT;
