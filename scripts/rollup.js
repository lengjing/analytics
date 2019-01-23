const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const node = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');
const commonjs = require('rollup-plugin-commonjs');
const chokidar = require('chokidar');

const version = process.env.VERSION || require('../package.json').version;

const config = {
  plugins: [
    replace({
      __VERSION__: version
    }),
    node(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
      // exclude: ['node_modules/foo/**', 'node_modules/bar/**'],  // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      // extensions: ['.js', '.coffee'],  // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false,  // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      // namedExports: { './module.js': ['foo', 'bar'] },  // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      // ignore: ['conditional-runtime-dependency']
    }),
    babel(require('./babel-config'))
  ],
}

const builds = [
  {
    input: './src/entry/expose.js',
    output: {
      file: path.resolve(__dirname, `../dist/analytics.common.js`),
      format: 'cjs',
      // name: 'ma'
    }
  },
  {
    input: './src/entry/silence.js',
    output: {
      file: path.resolve(__dirname, `../dist/analytics.js`),
      format: 'umd',
      name: 'ma'
    }
  },
  {
    input: './src/entry/silence.js',
    output: {
      file: path.resolve(__dirname, `../dist/analytics.min.js`),
      format: 'umd',
      name: 'ma'
    }
  },
]

function build(config) {
  const output = config.output
  const { file } = output
  const isProd = /min\.js$/.test(file)
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ code }) => {
      if (isProd) {
        var minified = uglify.minify(code, {
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        return write(file, minified, true)
      } else {
        return write(file, code)
      }
    })
}

function write(dest, code, zip) {
  fs.writeFile(dest, code, function (err) {
    err && console.log(err)
  })
}

function main() {
  let index = 0;
  const next = () => {
    if (index >= builds.length) return;

    build(Object.assign({}, config, builds[index++]))
      .then(() => next())
  }
  next();
}

function build2(dir, { cwd, watch }) {
  const srcDir = path.join(dir, 'src');
  main();
  if (watch) {
    const watcher = chokidar.watch(path.join(cwd, srcDir), {
      ignoreInitial: true,
    });

    watcher.on('all', (event, fullPath) => {
      if (!fs.existsSync(fullPath)) return;
      if (fs.statSync(fullPath).isFile()) {
        build2(cwd, srcDir);
      }
    });
  }
}

const cwd = process.cwd();
const watch = process.argv.includes('-w') || process.argv.includes('--watch');

build2('./', { cwd, watch })
