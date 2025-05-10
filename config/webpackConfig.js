import { getPlugins } from './plugins.js';
import { getLoaders } from './loaders.js';
import { getResolvers } from './resolvers.js';
import { getDevServer } from './devServer.js';

export function webpackConfig(options) {
  const { paths, mode, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: isDev ? '/' : '/food-client/',
    },

    plugins: getPlugins(options),

    module: {
      rules: getLoaders(options),
    },

    resolve: getResolvers(options),

    devServer: isDev ? getDevServer(options) : undefined,

    devtool: isDev ? 'inline-source-map' : undefined,

    optimization: {
      minimize: !isDev,
      splitChunks: {
        chunks: 'all',
        maxSize: 244000,
      },
    },
  };
}
