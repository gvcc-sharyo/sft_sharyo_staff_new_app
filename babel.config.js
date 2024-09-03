module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    // module.exports = {
    //   presets: ['module:metro-react-native-babel-preset'],
    //   plugins: [ 'react-native-reanimated/plugin']
    // };

    plugins: [
      [
        'module-resolver',

        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
        },
      ],

      'react-native-reanimated/plugin',
      // [
      //   require.resolve('babel-plugin-module-resolver'),
      //   {
      //     root: ["./src/"],
      //     alias: {
      //       "test": "./test"
      //     }
      //   }
    
      // ]
    ],
  };
};
