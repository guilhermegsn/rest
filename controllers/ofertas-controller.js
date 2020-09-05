const mysql = require('../mysql').pool;

exports.getOfertas = (req, res, next) => {
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
}