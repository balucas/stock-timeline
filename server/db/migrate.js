const db = require("./models/database");

db.stock.associate(db);
db.data.associate(db);
db.sequelize.sync();
