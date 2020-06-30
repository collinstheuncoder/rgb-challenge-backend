import mongoose from 'mongoose';

import { dbName, dbUser, dbPassword } from '../config';

const dbUri =
  process.env.NODE_ENV.trim() === 'development'
    ? `mongodb://localhost:27017/${dbName}`
    : `mongodb://${dbUser}:${dbPassword}@ds119268.mlab.com:19268/${dbName}`;

mongoose.Promise = global.Promise;
mongoose
  .connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successful DB connection'))
  .catch((error) => console.log(`Connection error: ${error}`));
