const rateLimit = require("express-rate-limit");
const regexForUrl =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const regexForEmail = /^\S+@\S+\.\S+$/;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
module.exports = { regexForUrl, regexForEmail, limiter };
