const { PORT = 3000 } = process.env;
const { DATA_BASE = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET } = process.env;
const KEY_PASSWORD = 'dev-secret';

module.exports = {
  PORT,
  DATA_BASE,
  NODE_ENV,
  JWT_SECRET,
  KEY_PASSWORD,
};
