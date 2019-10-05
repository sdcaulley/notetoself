const app = require('./lib/app');
const connectDB = require('./lib/db/db');
const { port, dburi } = require('./config');

try {
  const info = connectDB(dburi);
  console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
} catch (error) {
  console.error('Unable to connect to database.');
}

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
}).on('error', err => {
  console.error(err);
});

module.exports = server;
