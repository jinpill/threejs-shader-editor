/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      exclude: /node_modules/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
