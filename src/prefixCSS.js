import Prefixer from 'inline-style-prefixer';

const prefixer = new Prefixer();

function prefixCSS(css) {
  return prefixer.prefix(css);
}

export default prefixCSS;
