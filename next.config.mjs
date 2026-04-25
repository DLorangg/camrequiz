import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí puedes mantener cualquier otra configuración de Next.js que ya tuvieras
};

export default withSerwist(nextConfig);