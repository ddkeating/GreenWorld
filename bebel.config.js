module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],  // If you're using Expo, this is the preset you'd typically use.
      plugins: [
        [
          "module:react-native-dotenv",  // Plugin to load environment variables from .env file
          {
            "moduleName": "@env",        // The module name used to import environment variables in your code
            "path": ".env",              // The path to your .env file
            "blacklist": null,           // Optional: Exclude specific variables
            "whitelist": null,           // Optional: Include only specific variables
            "safe": false,               // Optional: Ensure all necessary variables are set
            "allowUndefined": true       // Optional: Allow undefined variables
          }
        ]
      ]
    };
  };
  