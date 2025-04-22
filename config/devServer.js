export function getDevServer({ port }) {
  return {
    port: port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
