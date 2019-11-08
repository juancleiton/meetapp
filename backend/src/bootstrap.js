const dotenv = require('dotenv');

// Se for em ambiente de desenvolvimento
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
