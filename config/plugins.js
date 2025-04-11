import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerWebpackPlugin from 'image-minimizer-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

export function getPlugins({ paths, isDev }) {
  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    !isDev &&
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminMinify,
          options: {
            plugins: [['imagemin-mozjpeg', { quality: 75, progressive: true }]],
          },
        },
      }),
    isDev && new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ];
}
