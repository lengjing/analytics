const { existsSync, statSync, readdirSync } = require('fs');
const { join, extname } = require('path');
const babel = require('@babel/core');
const assert = require('assert');
const { Signale } = require('signale');
const chalk = require('chalk');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');
const through = require('through2');
const chokidar = require('chokidar');

const cwd = process.cwd();
const signale = new Signale({
  types: {
    transform: {
      badge: '🐝',
      color: 'blue',
      label: 'transform',
    },
  }
})
const babelConfig = require('./babel-config');


function transform(opts = {}) {
  const { content, path } = opts;
  assert(content, `opts.content should be supplied for transform()`);
  assert(path, `opts.path should be supplied for transform()`);
  assert(extname(path) === '.js', `extname of opts.path should be .js`);

  signale.transform(
    chalk.yellow(
      `${path.replace(`${cwd}/`, '')}`,
    ),
  );
  return babel.transform(content, babelConfig).code;
}

function build(dir, opts = {}) {
  const { cwd, watch } = opts;
  assert(dir.charAt(0) !== '/', `dir should be relative`);
  assert(cwd, `opts.cwd should be supplied`);

  const pkgPath = join(cwd, dir, 'package.json');
  assert(existsSync(pkgPath), 'package.json should exists');
  const pkg = require(pkgPath);
  const libDir = join(dir, 'lib');
  const srcDir = join(dir, 'src');

  // clean
  rimraf.sync(join(cwd, libDir));

  function createStream(src) {
    assert(typeof src === 'string', `src for createStream should be string`);
    return vfs
      .src([
        src,
        `!${join(srcDir, '**/*.test.js')}`,
        `!${join(srcDir, '**/*.e2e.js')}`,
      ], {
          allowEmpty: true,
          base: srcDir,
        })
      .pipe(through.obj((f, env, cb) => {
        if (extname(f.path) === '.js') {
          f.contents = Buffer.from(
            transform({
              content: f.contents,
              path: f.path,
            }),
          );
        }
        cb(null, f);
      }))
      .pipe(vfs.dest(libDir));
  }

  // build
  const stream = createStream(join(srcDir, '**/*'));
  stream.on('end', () => {
    // watch
    if (watch) {
      signale.pending('start watch', srcDir);
      const watcher = chokidar.watch(join(cwd, srcDir), {
        ignoreInitial: true,
      });
      watcher.on('all', (event, fullPath) => {
        const relPath = fullPath.replace(join(cwd, srcDir), '');
        signale.watch(`[${event}] ${join(srcDir, relPath)}`);
        if (!existsSync(fullPath)) return;
        if (statSync(fullPath).isFile()) {
          createStream(fullPath);
        }
      });
    }
  });
}

const watch = process.argv.includes('-w') || process.argv.includes('--watch');

build('./', { cwd, watch })
