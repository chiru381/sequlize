const db = {
    database: 'postgres9',
    username: 'postgres',
    password: 'Chiru@123',
    host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        //idle: 10000
      }
  };
  
module.exports = db;