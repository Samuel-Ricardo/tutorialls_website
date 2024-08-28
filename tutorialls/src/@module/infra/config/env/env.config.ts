export const ENV = {
  ...process.env,
  API: {
    URL: process.env.NEXT_PUBLIC_API_URL || 'http://api:3001',
  },
  ENCRYPTION: {
    KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'secret',
    ALGORITHM: process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM || 'aes-256-ctr',
    BREAKPOINT: process.env.NEXT_PUBLIC_ENCRYPTION_BREAKPOINT || ':',
  },
  SANITY: {
    PROJECT: {
      ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ProjectId',
    },
    DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
    USE: {
      CDN: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true' || true,
    },
  },
};
