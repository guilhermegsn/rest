const mysql = require('../mysql').pool;
const { response } = require('express');
const jwt = require('jsonwebtoken');

exports.cadUsuario = (req, res, next) =>{
    mysql.getConnection((err, conn)=> {
        if(err){
            return res.status(500).send({error: error});
        }
        conn.query('SELECT * FROM cliente_pf WHERE cli_email =?', [req.body.email], (error, results)=>{
            if(error){
                return res.status(500).send({error: error});
            }
            if(results.length > 0){
                res.status(409).send({mensagem: 'Usuário já cadastrado.'});
            }else{
                conn.query('INSERT INTO cliente_pf (cli_nome, cli_cpf, cli_email, cli_datanasc, password, cli_datacadastro) VALUES (?,?,?,?,?, NOW())', 
                [req.body.nome, req.body.cpf, req.body.email, req.body.datanasc, req.body.senha],
                (error, results)=> {
                    conn.release();
                    if(error){
                        return res.status(500).send({error: error});
                    }
                    return res.status(201).send({
                        mensagem: 'Usuário criado com sucesso.',
                    });
                    
                });
            }
        });
    });
};

exports.getUsuario = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            'SELECT idcliente, cli_nome, cli_email FROM cliente_pf WHERE idcliente = ?',
            [req.body.idcliente],
            (error, resultado, fields)=>{
                conn.release();
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(200).send(resultado)
            }
        )
    })
};

exports.login = (req, res, next) =>{
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        const query = 'SELECT * FROM cliente_pf WHERE cli_email = ?';
        conn.query(query, [req.body.email], (error, results, fields) =>{
            conn.release();
            if(error){
                return res.status(500).send({error: error});
            }
            if(results.length<1){
                return res.status(401).send({mensagem: 'Falha na autenticação.'});
            }
            if (req.body.senha === results[0].password) {
                const token = jwt.sign({
                    idcliente: results[0].idcliente,
                    email: results[0].cli_email,
                }, 
                process.env.JWT_KEY, {
                    expiresIn: "10d"
                });
                return res.status(202).send({
                    value: 1,
                    mensagem: 'Autenticado.',
                    token: token,
                    idcliente: results[0].idcliente,
                    nome: results[0].cli_nome,
                });
            }
            return res.status(401).send({mensagem: 'Falha na autenticação.'});
        });
    });
};