const { query } = require('express');
const seq = require('sequelize');
const sequelize = new seq('postgres','postgres','postgres',{
    host: "192.168.1.106",
    port: "10532",
    dialect: "postgres"
});


// var MovieSchema = {
//     title: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: Number
//     },
//     rate:{
//         type: Number
//     },
//     summary:{
//         type: String
//     },
//     director:{
//         type: String
//     }

// };

//module.exports = (sequelize,seq)=>{
    const MovieSchema = sequelize.define('movie',{
        title:{
            type:seq.STRING,
            allowNull:{
                args:false
            }
        },
        year:{
            type:seq.INTEGER,
            allowNull:{
                args:false
            }
        },
        rate:{
            type:seq.INTEGER,
            allowNull:{
                args:false
            }
        },
        summary:{
            type:seq.STRING,
            allowNull:{
                args:false
            }
        },
        director:{
            type:seq.STRING,
            allowNull:{
                args:false
            }
        },
        country:{
            type:seq.STRING
        }

    })
module.exports = MovieSchema