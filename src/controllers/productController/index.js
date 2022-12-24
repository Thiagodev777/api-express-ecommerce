router.get('/products', (req, res) => {
    res.send('ROTA DE TODOS OS PRODUTOS')
})
router.get('/product/:id', (req, res) => {
    res.send('ROTA DE UM PRODUTO ESPECIFICO')
})
router.post('/product', (req, res) => {
    res.send('ROTA DE CADASTRAR NOVO PRODUTO')
})
router.put('/product/:id', (req, res) => {
    res.send('ROTA DE ATUALIZAR UM PRODUTO')
})
router.delete('product/:id', (req, res) => {
    res.send('ROTA DE DELETAR UM PRODUTO')
})