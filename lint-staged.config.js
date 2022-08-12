const config = {
  '*.@(ts|tsx)': 'bash -c tsc',
  '*.@(js|ts|tsx)': 'eslint --fix',
  '**/__tests__/?(*.)+(spec|test).[jt]s?(x)': 'jest --ci',
};

module.exports = config;
