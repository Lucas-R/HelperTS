import path from 'path';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

export default {
  plugins: [
    postcssImport({ path: [path.resolve('./src/styles/')] }),
    nested(),
    autoprefixer()
  ],
  map: {
    inline: false,
    annotation: true
  }
};
