const { raw } = require('body-parser');
const express = require('express');
const { Sequelize } = require('sequelize');
const Router = express.Router();
const seq = require('sequelize');
const mongoose = require('mongoose');


const Movie = require('../../model/Movie');
const Rw = require('../../model/Review');
var t = ""
var list = (req, res, title = '') => {
    var error = false;

    Movie.findAll({raw:true})
        .then(mv => {
            res.render('movies/list', {
                movie: mv,
                error: error,
                title: title,
            
                
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}

Router.get('/', (req, res) =>{
    list(req,res)
});

var reviewList = (req, res, msg = '') => {
    var error = false;

    Rw.find({movieTitle: t})
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(rws => {
            res.render('movies/review', {
                review: rws,
                error: error,
                msg: msg,
                t:t
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}
Router.get('/review/:mtitle', (req, res) =>{
    t = req.params.mtitle
    reviewList(req,res)

 });

Router.get('/delete/:rwId', (req, res) => {
    rwId = req.params.rwId;
    Rw.remove({
        _id: rwId
    })
        .exec()
        .then(result => {
            res.redirect('/movies/success/Rw well deleted !');
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});
Router.get('/show/:mtitle', (req, res) => {

    Movie.findOne({
        where:{
            title: req.params.mtitle
        },raw:true
    })
        .then(mv => {
            res.render('movies/show', {
                mv: mv
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
        
});

Router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    reviewList(req, res, msg)
});

Router.post('/', (req, res) => {
    if (req.body.message && req.body.message != "" && req.body.username !="") {
        const rw = new Rw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message,
            username: req.body.username,
            movieTitle: t
        })

        rw.save()
            .then(rw => {
                res.redirect('/movies/success/Rw well created');
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        
        res.redirect('/movies/danger/Please put some value');
    }
})



module.exports = Router;