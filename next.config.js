/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    name: "Zachey",
    github: "https://github.com/zachey01",
    npm: "https://www.npmjs.com/~zachey",
  },

  async redirects() {
    return [
      {
        source: "/donate",
        destination: "https://www.donationalerts.com/r/zachey",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
