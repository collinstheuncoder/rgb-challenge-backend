import dotenv from 'dotenv';

const path = `${__dirname}/../../.env.${
  process.env.NODE_ENV.trim() === 'development' ? 'development' : 'production'
}`;

dotenv.config({
  path,
});

export const dbName = process.env.DB_NAME;
export const dbUser = process.env.DB_USER;
export const dbPassword = process.env.DB_PASSWORD;
export const appSecret = process.env.APP_SECRET;
