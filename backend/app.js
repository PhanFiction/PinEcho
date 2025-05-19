const app = require('./api/index');
const config = require('./config/config');

app.listen(config.PORT, () => {
  console.log(`listening to port ${config.PORT}`);
});