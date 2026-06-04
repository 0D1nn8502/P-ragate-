BEGIN;

ALTER TABLE experiences
ADD COLUMN homepage_shelves TEXT[] NOT NULL DEFAULT '{}';

COMMIT;
