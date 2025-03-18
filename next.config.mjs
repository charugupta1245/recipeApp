export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
    ],
    domains: ["via.placeholder.com", "fastmealapi-2.onrender.com"], // Merge both configs
  },
};
