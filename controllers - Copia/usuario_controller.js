const mysql = require('../mysql').pool;

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
                conn.query('INSERT INTO usuarios (email, senha) VALUES (?,?)', 
                [req.body.email, req.body.senha],
                (error, results)=> {
                    conn.release();
                    if(error){
                        return res.status(500).send({error: error});
                    }
                    response = {
                        mensagem: 'Usuário criado com sucesso',
                        usuarioCriado: {
                            idusuario: results.insertId,
                            email: req.body.email
                        }
                    }
                    return res.status(201).send(response);
                });
                
            }
        });

    });
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
                    idusuario: results[0].idcliente,
                    email: results[0].cli_email
                }, 
                process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).send({
                    mensagem: 'Autenticadoo.',
                    token: token
                });
            }
            return res.status(401).send({mensagem: 'Falha na autenticação.<'});
        });
    });
};