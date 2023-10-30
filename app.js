require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { limiter } = require('./utils/constants');
const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/server-error');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(limiter);

app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(appRouter);

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);
