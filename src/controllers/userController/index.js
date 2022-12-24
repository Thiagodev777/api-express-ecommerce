router.get('/users', (req, res) => {
    res.send('ROTA DE TODOS OS USUARIO')
})
router.get('/user/:id', (req, res) => {
    res.send('ROTA DE UM PRODUTO USUARIO')
})
router.post('/user', (req, res) => {
    res.send('ROTA DE CADASTRAR NOVO USUARIO')
})
router.put('/user/:id', (req, res) => {
    res.send('ROTA DE ATUALIZAR UM USUARIO')
})
router.delete('user/:id', (req, res) => {
    res.send('ROTA DE DELETAR UM USUARIO')
})