BEGIN;

INSERT INTO experiences (
    title,
    location,
    images,
    description,
    homepage_shelves,
    published_at
)
VALUES
(
    'Mountain House in Simikot',
    'Simikot, Nepal',
    ARRAY[
        '/paragate_exp/view2.jpeg',
        '/paragate_exp/house_outer.jpg',
        '/paragate_exp/view.jpeg'
    ],
    'A remote stay with Mr. Padmajin, close to Kailash and nestled amidst breathtaking mountains.',
    ARRAY[
        'sweet-season',
        'mountain-escapes'
    ],
    now()
),
(
    'Tracing Deep Time in Sonbhadra',
    'Sonbhadra, Uttar Pradesh',
    ARRAY[
        '/exploration.png',
        '/travel.avif'
    ],
    'An immersive journey through the prehistoric landscapes of Sonbhadra, with time spent exploring ancient traces of settlement, oral histories tied to the land, and meaningful interaction with the tribal communities that continue to shape the region''s cultural memory.',
    ARRAY[
        'cultural-encounters'
    ],
    now() - interval '1 day'
),
(
    'Kilifi Island Tides',
    'Kilifi Islands, Kenya',
    ARRAY[
        '/experiences/kilifi/kilifi_cover.jpeg',
        '/experiences/kilifi/lagoon.avif'
    ],
    'A slow coastal experience shaped around island crossings, Swahili seascapes, mangrove edges, and the kind of warm-weather rhythm that makes Kilifi feel especially inviting outside the crush of peak tourist season.',
    ARRAY[
        'fresh-arrivals'
    ],
    now()
);

COMMIT;
