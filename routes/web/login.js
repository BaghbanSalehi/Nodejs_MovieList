const express = require('express')
const Router = express.Router()
const { raw } = require('body-parser');

var ldap = require('ldapjs');
var user = ""
var pass = ""

var l = false


var client = ldap.createClient({
  url: 'ldap://localhost:10389',
  timeout: 5000,
  connectTimeout: 10000
});


Router.get('/',(req,res)=>{
    res.render('movies/login')
})

Router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    res.render('movies/login',{
        msg : msg
    })
});

Router.post('/',(req,res)=>{
    user = req.body.username
    pass = req.body.password

    ldapConnection = (username,password) =>{
        client.bind(username,password,(err =>{
            if (err){
                res.redirect('/login/danger/Invalid username or password')
            }else{
                
              l = true
                res.redirect('/movies')
            }
            
        }))
    }
    ldapConnection(`cn=${user},ou=users,dc=example,dc=com`,pass)
})




module.exports = {
    Router:Router,
    login :function loggedin(login) {
        if (l){
        return login = true
        }else
        return login = false
        
    }
}