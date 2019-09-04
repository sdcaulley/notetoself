const app = require('./lib/app');
const connectDB = require('./lib/db');
const { port, dburi } = require('./config');

(async () => {
  try {
    const info = await connectDB(dburi);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database.');
  }

  await app.listen(port, () => {
    console.log(`Server started on ${port}.`);
  });
})();
