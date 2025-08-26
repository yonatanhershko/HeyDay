const { getDefaultConfig } = require('@expo/metro-config');
const fs = require('fs');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { transformer, resolver } = defaultConfig;

defaultConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

defaultConfig.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

const env = process.env.APP_ENV || 'prod';
const configPath = path.join(__dirname, '/configs', `${env}.json`);
const outputPath = path.join(__dirname, 'config.json');

if (fs.existsSync(configPath)) {
  const configJson = fs.readFileSync(configPath, 'utf8');
  fs.writeFileSync(outputPath, configJson);
}

module.exports = defaultConfig;
