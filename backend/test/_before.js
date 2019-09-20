const mongoose = require('mongoose');
const connectDB = require('../lib/db/db');
const { test } = require('../config');

before(async () => {
  await connectDB(test);
});

beforeEach(async () => {
  Object.keys(mongoose.models).forEach(async name => {
    await mongoose.model(name).deleteMany();
  });
});
