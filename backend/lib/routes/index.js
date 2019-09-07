const compose = require('koa-compose');
const Router = require('@koa/router');
const importDir = require('import-dir');

const routerConfigs = [
  { folder: 'user', prefix: '/user'}
];

function routes() {
  const composed = routerConfigs.reduce((prev, curr) => {
    const Routes = importDir(`./${curr.folder}`);
    const router = new Router({
      prefix: curr.prefix
    });

    Object.keys(Routes).map(name => Routes[name](router));

    return [router.routes(), router.allowedMethods(), ...prev];
  }, []);

  return compose(composed);
}

module.exports = routes;
