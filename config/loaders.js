import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as sassEmbedded from 'sass-embedded';

export function getLoaders({ isDev }) {
  const babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  };

  const scssLoader = {
    test: /\.scss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            namedExport: false,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          implementation: sassEmbedded,
          additionalData: `
          @use "@/styles/mixins" as *;
          @use "@/styles/vars" as *;`,
        },
      },
    ],
  };

  const imageLoader = {
    test: /\.(png|jpe?g|gif|webp)$/i,
    type: isDev ? 'asset/resource' : 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024,
      },
    },
    generator: {
      filename: 'assets/images/[name].[hash][ext]',
    },
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name].[hash][ext]',
    },
  };

  return [babelLoader, scssLoader, imageLoader, fontLoader];
}
