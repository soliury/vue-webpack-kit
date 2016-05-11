import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';


export function assetsPath(_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}


export function cssLoaders(options) {
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader = loader + '-loader';
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return [ 'vue-style-loader', sourceLoader ].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders([ 'css' ]),
    postcss: generateLoaders([ 'css' ]),
    less: generateLoaders([ 'css', 'less' ]),
    sass: generateLoaders([ 'css', 'sass?indentedSyntax' ]),
    scss: generateLoaders([ 'css', 'sass' ]),
    stylus: generateLoaders([ 'css', 'stylus' ]),
    styl: generateLoaders([ 'css', 'stylus' ])
  }
}


// 用于将组建中的style分离出到一个单独的css中
export function styleLoaders(options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[ extension ];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}