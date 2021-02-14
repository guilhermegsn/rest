const mysql = require('../mysql').pool;


exports.getCarrinho = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});

        }
        conn.query(
            'SELECT c.*, o.oferta_titulo  FROM carrinho c LEFT JOIN oferta o on c.oferta_idoferta = o.idoferta 	WHERE c.cliente_pf_idcliente = ?',
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

exports.setCarrinho = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query('SELECT * FROM carrinho WHERE oferta_idoferta = ? and cliente_pf_idcliente = ?', [req.body.idproduto, req.body.idcliente], (error, result)=> {
            if(error){
                return res.status(500).send({error: error});
            }
            if(result.length>0){
                conn.query(
                    "UPDATE carrinho SET qtde = qtde+? WHERE cliente_pf_idcliente = ? and oferta_idoferta = ?",
                    [req.body.qtde,
                    req.body.idcliente,
                    req.body.idproduto
                ],
                    (error, resultado, fields)=>{
                        conn.release();
                        if(error){
                            return res.status(500).send({error: error});
                        }
                        return res.status(202).send({
                            mensagem: 'Qtde alterada com sucesso.',
                        })
                    }
                )
            }else{
                conn.query(
                    'INSERT INTO carrinho (cliente_pf_idcliente, oferta_idoferta, qtde) VALUES (?,?,?)',
                    [req.body.idcliente, req.body.idproduto, req.body.qtde],
                    (error, resultado, field) => {
                        conn.release();
                        if(error){
                            res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
                        res.status(201).send({
                            mensagem: 'Produto inserido',
                        });
                    }
                )
            }
        })
    })
};

exports.decProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            "UPDATE carrinho SET qtde = qtde-1 WHERE cliente_pf_idcliente = ? and oferta_idoferta = ?",
            [
                req.body.idcliente,
                req.body.idproduto
                ],
            (error, resultado, fields)=>{
                conn.release();
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(202).send({
                    mensagem: 'Qtde alterada com sucesso.',
                })
            }
        )
    })
};


exports.incProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            "UPDATE carrinho SET qtde = qtde+1 WHERE cliente_pf_idcliente = ? and oferta_idoferta = ?",
            [
                req.body.idcliente,
                req.body.idproduto
                ],
            (error, resultado, fields)=>{
                conn.release();
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(202).send({
                    mensagem: 'Qtde alterada com sucesso.',
                })
            }
        )
    })
};

exports.deleteProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }        
        conn.query(
            "DELETE FROM carrinho WHERE oferta_idoferta = ? and cliente_pf_idcliente = ?",
            [
                req.body.idcliente,
                req.body.idproduto
                ],
            (error, resultado, fields)=>{
                conn.release();
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(202).send({
                    mensagem: 'Deletado com sucesso.',
                })
            }
        )
    })
};