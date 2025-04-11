import path from 'path';
import { fileURLToPath } from 'url';
import { webpackConfig } from './config/webpackConfig.js';

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const paths = {
    entry: path.resolve(__dirname, 'src', 'main.tsx'),
    build: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'src', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const mode = env.mode || 'development';
  const port = env.port || 3000;

  const isDev = mode === 'development';

  const config = webpackConfig({
    mode,
    paths,
    isDev,
    port,
  });

  return config;
};
