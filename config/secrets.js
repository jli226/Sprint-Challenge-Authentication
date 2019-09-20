module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    `this is a secret and you shouldn't be reading this!`
};
