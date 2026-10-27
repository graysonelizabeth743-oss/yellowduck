/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next 15 expects the React Compiler flag under `experimental`
    reactCompiler: true,
  },
  async redirects() {
    return [
      { source: "/signup", destination: "/auth/register", permanent: true },
    ];
  },
};

export default nextConfig;
