/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL, // Correct name
      NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    },
  };
  
  module.exports = nextConfig;