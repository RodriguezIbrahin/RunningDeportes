const app = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    app.listen(process.env.PORT, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});