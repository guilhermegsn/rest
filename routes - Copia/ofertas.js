const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){
            return res.status(500).send({error: error});
        }
        conn.query(
            'SELECT o.idoferta, o.oferta_titulo, o.oferta_descricao, o.oferta_inicio, o.oferta_fim, o.oferta_qtdemax, o.oferta_qtdeprod, o.oferta_preco, o.oferta_precofinal, e.estab_nomefantasia, o.oferta_desconto, o.oferta_img FROM oferta o LEFT JOIN estabelecimento e on o.estabelecimento_idestabelecimento = e.idestabelecimento',
            (error, resultado, fields)=>{
                if(error){
                    return res.status(500).send({error: error});
                }
                return res.status(200).send(resultado)
            }
        )
    })
});

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
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
});

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
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
});

//ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
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
    
});

//EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
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
    
});

module.exports = router;

