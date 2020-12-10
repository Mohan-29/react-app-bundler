const watch = process.argv.includes('--watch');

const options = { watch };

module.exports = () => options;