export function getResolvers({ paths }) {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [paths.src, 'node_modules'],
    alias: {
      '@': paths.src,
    },
  };
}
