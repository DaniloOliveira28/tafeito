module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      '@babel/react',
      '@babel/typescript',
      ["@babel/env", { "modules": false }]  
      // Enable development transform of React with new automatic runtime
    ],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
  };
};
