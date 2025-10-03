module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Keep this plugin last as required by Reanimated
      'react-native-reanimated/plugin',
    ],
  };
};


