const mysql = require('../mysql').pool;

exports.getProutos =  (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields)=>{
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(200).send({resultado})
            }
        )
    })
};
4
exports.postProdutos = (req, res, next) => {
    mysql.getConnection((error, conn)=> {
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
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
                    id_produto: resultado.insertId
                });
            }
        )
    })
};

exports.getUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            'SELECT * FROM produtos WHERE idprodutos = ?;',
            [req.params.id_produto],
            (error, resultado, fields)=>{
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(200).send({response: resultado})
            }
        )
    })
};

exports.updateProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            "UPDATE produtos SET nome = ?, preco = ? WHERE idprodutos = ?",
            [req.body.nome,
            req.body.preco,
            req.body.id_produto],
            (error, resultado, fields)=>{
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(202).send({
                    mensagem: 'Produto alterado com sucesso.'
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
            "DELETE FROM produtos WHERE idprodutos = ?",
            [req.body.id_produto],
            (error, resultado, fields)=>{
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(202).send({
                    mensagem: 'Produto excluído com sucesso.'
                })
            }
        )
    })
}