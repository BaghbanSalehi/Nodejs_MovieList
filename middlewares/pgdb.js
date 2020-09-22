const seq = require('sequelize');
const sequelize = new seq('postgres','postgres','postgres',{
    host: "192.168.1.106",
    port: "10532",
    dialect: "postgres"
});

const connectDB = {};
var conn = false;

 connectDB.connect = async ()=>{
    try{
        conn = await sequelize.authenticate()
       console.log('postgres connected');

   }catch(error){
       console.log(error);
       process.exit(1);

   }

}
connectDB.close = () =>{
    postgres.connection.close();
}
module.exports = connectDB;