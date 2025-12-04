import path from 'path';
import cssnano from 'cssnano';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssFunctions from 'postcss-functions';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssDiscardComments from 'postcss-discard-comments';

import functions from './src/styles/functions/index.js';

export default {
  plugins: [
    postcssImport({ path: [path.resolve('./src/styles/')] }),
    postcssDiscardComments({ removeAll: true }),
    postcssFunctions({ functions }),
    cssnano({ preset: 'default' }),
    postcssSimpleVars(),
    autoprefixer(),
    nested(),
  ],
  map: { inline: true, annotation: true }
};
