require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const moment = require('moment')

const moviesRouter = require('./routes/web/movies').Router
const loginRouter = require('./routes/web/login').Router
const { patch } = require('./routes/web/movies');
const path = require('path') 

const connectDB = require('./middlewares/pgdb');
connectDB.connect();

const connectMongoDB = require('./middlewares/mongodb');
connectMongoDB.connect();




const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('.hbs',exphbs({
    extname : '.hbs',
    defaultLayout: 'main',
    helpers: {
        formatDate: function (date, format) {
            return moment(date, "YYYYMMDD").fromNow();
        },
        isEmpty: (value) => {
            return value === '';
        },
        isNotEmpty: (value) => {
            return value !== '';
        }
    }
}));
app.set('view engine','.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));



app.use('/movies',moviesRouter)
app.use('/login',loginRouter)

app.get('/',(req,res)=> {
    res.redirect('/login')
    });

    app.use((req,res,next)=> {
        const error = new Error('Not Found !');
        error.status = 404;
        next(error);
    });

    app.listen(process.env.PORT,function(){
        console.log("server is running at localhost:3000")
    });