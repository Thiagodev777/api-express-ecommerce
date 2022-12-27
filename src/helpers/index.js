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
  typeCheckingProduct(name, description, price, quantity, image) {
    if (name && description && price && quantity && image) {
      if (
        typeof name === "string" &&
        typeof description === "string" &&
        typeof price === "string" &&
        typeof quantity === "string" &&
        typeof image === "string"
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
