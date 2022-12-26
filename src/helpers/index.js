module.exports = {
  typeCheckingUser(name, email, password) {
    if (name && email && password) {
      if (
        typeof name === "string" &&
        typeof email === "string" &&
        typeof password === "string"
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};
