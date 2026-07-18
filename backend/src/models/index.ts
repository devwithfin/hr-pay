import fs from "fs";
import path from "path";
import {Sequelize, DataTypes} from "sequelize";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname + "/../config/database.ts"))[env];
const db:any = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.endsWith('.ts') || file.endsWith('.js')) && 
      file.indexOf('.test.') === -1
    );
  })
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = (modelDefiner.default || modelDefiner)(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {sequelize, Sequelize};
export default db;
