import app from "./app.js";
import { sequelize } from "./db/db.js";


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(app.get('PORT'));

    console.log(`Server listening on port ${app.get('PORT')}`)
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }