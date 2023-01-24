module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }],
    '@babel/preset-typescript',
  ],
  plugins: [
    "react-native-reanimated/plugin",
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
        },
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};