const db = require('./db')

const Cadastro = db.sequelize.define('users',{
    nome: {
        type: db.Sequelize.STRING
    },
    crm: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    especialidades: {
        type: db.Sequelize.STRING,
    }
})

const Alterar = db.sequelize.define('users',{
    nome: {
        type: db.Sequelize.STRING
    },
    crm: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    especialidades: {
        type: db.Sequelize.STRING
    }
})

module.exports = Cadastro;

module.exports = Alterar;