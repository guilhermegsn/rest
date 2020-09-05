exports.getPedidos =  (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
}