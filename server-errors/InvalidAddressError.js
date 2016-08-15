class InvalidAddressError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    //this.name = 'InvalidAddressError';
  }
}

module.exports = InvalidAddressError;
