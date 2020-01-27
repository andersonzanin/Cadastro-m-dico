const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const moment = require('moment');
const CadastroUsuario = require('./models/Users');
const sef = require(`sequelize-express-findbyid`)
const findById = sef(CadastroUsuario) // Primary key is 'id'



app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/medicos', function(req, res){
    CadastroUsuario.findAll().then(function(cadastros){
    res.render('consulta', {cadastros: cadastros});
    })
});

app.get('/cadastros', function(req, res){
    res.render('cadastromedicos');
});

app.get('/dadosUsuario/:id', function(req, res){
    findById(req.params.id).then(function(cadastros){
        res.render('alterar', {dadosUsuario: cadastros});
        })
});

app.post('/add-cadastro', function(req, res){
    CadastroUsuario.create({
        nome: req.body.nome,
        crm: req.body.crm,
        telefone: req.body.telefone,
        estado: req.body.estado,
        cidade: req.body.cidade,
        especialidades: req.body.especialidades
    }).then(function(){
        res.redirect('/medicos')
    }).catch(function(erro){
        res.send("Erro ao cadastrar: " + erro)
    })
    //res.send(req.body)
})


app.post('/alterar-cadastroUsuario/:id', function(req, res){
    CadastroUsuario.update({
        nome: req.body.nome,
        crm: req.body.crm,
        telefone: req.body.telefone,
        estado: req.body.estado,
        cidade: req.body.cidade,
        especialidades: req.body.especialidades
    },
    {where : {id : req.params.id}}
    ).then(function(){
        res.redirect('/medicos')
    }).catch(function(erro){
        res.send("Erro ao cadastrar: " + erro)
    })
    //res.send("Nome: " + req.body.nome + "<br>CRM: " + req.body.crm + "<br>Telefone: " + req.body.telefone + "<br>Estado: " + req.body.estado + "<br>Cidade: " + req.body.cidade + "<br>Especialidades: " + req.body.especialidades)
})

app.get('/del-consulta/:id', function(req, res){
    CadastroUsuario.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/medicos');
    }).catch(function(erro){
        res.send("Não foi possível apagar");
    })
})

app.listen(8080);