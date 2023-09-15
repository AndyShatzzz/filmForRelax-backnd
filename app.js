require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const defaultErrorNotFound = require('./middlewares/defaultErrorNotFound');
const rateLimit = require('./middlewares/limiter');

const { PORT, DATA_BASE } = process.env;
const app = express();

app.use(express.json());

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(requestLogger);
app.use(rateLimit);

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use('*', auth, defaultErrorNotFound);
app.use(errorHandler);

app.listen(PORT);
