const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, () => {
  console.log(`listening to port ${config.PORT}`);
});