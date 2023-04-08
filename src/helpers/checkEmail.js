const checkEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
module.exports = checkEmail;
