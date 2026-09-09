CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,

  type VARCHAR(20) NOT NULL
    CHECK (
      type IN (
        'house',
        'apartment',
        'commercial',
        'land'
      )
    ),

  purpose VARCHAR(10) NOT NULL
    CHECK (
      purpose IN (
        'sale',
        'rent'
      )
    ),

  price NUMERIC(12, 2) NOT NULL
    CHECK (price >= 0),

  condominium NUMERIC(12, 2)
    CHECK (
      condominium IS NULL
      OR condominium >= 0
    ),

  property_tax NUMERIC(12, 2)
    CHECK (
      property_tax IS NULL
      OR property_tax >= 0
    ),

  city VARCHAR(120) NOT NULL,
  state CHAR(2) NOT NULL,
  neighborhood VARCHAR(120) NOT NULL,

  bedrooms INTEGER
    CHECK (
      bedrooms IS NULL
      OR bedrooms >= 0
    ),

  bathrooms INTEGER
    CHECK (
      bathrooms IS NULL
      OR bathrooms >= 0
    ),

  parking_spaces INTEGER
    CHECK (
      parking_spaces IS NULL
      OR parking_spaces >= 0
    ),

  area NUMERIC(10, 2) NOT NULL
    CHECK (area > 0),

  featured BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  property_id UUID NOT NULL
    REFERENCES properties(id)
    ON DELETE CASCADE,

  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  position INTEGER NOT NULL DEFAULT 0
    CHECK (position >= 0),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS properties_active_idx
  ON properties(active);

CREATE INDEX IF NOT EXISTS properties_type_idx
  ON properties(type);

CREATE INDEX IF NOT EXISTS properties_purpose_idx
  ON properties(purpose);

CREATE INDEX IF NOT EXISTS properties_city_idx
  ON properties(city);

CREATE INDEX IF NOT EXISTS properties_created_at_idx
  ON properties(created_at DESC);

CREATE INDEX IF NOT EXISTS property_images_property_id_idx
  ON property_images(property_id);

CREATE UNIQUE INDEX IF NOT EXISTS property_images_position_idx
  ON property_images(property_id, position);