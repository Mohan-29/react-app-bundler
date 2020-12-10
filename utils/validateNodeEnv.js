const validEnvs = ['development', 'production'];

module.exports = function validateNodeEnv() {
  const nodeEnv = process.env.NODE_ENV;

  if (validEnvs.includes(nodeEnv)) {
    return;
  }

  throw new Error(`Expected NODE_ENV to be one of ${JSON.stringify(validEnvs)}, but received ${JSON.stringify(nodeEnv)}`);
};