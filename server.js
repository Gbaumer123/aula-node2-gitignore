const express = require('express');
const app = express();
const data = require("./data.json"); //requisita as informações dos usuarios

app.use(express.json());

app.get("/clients", function (req, res) { // pega todos os clientes
    res.json(data); //retorna da e data recebe todos os clientes
});

app.get("/clients/:id", function (req, res) { // busca o cliente pelo id
    const { id } = req.params //requisita os parametros
    const client = data.find(cli => cli.id == id); //busca se existe o id no data.json

    if (!client) return res.status(204).json(); // se caso não encontrar retorna um erro
   
    res.json(client); //retorna a variavel cliente
});

app.post("/clients", function (req, res) { // ela recebe um cliente e salva o mesmo
    const {name, email} = req.body; //requisita o body inserido no thunder que são os campos inseridos manualmente

    //função salvar

    res.json({name, email}); //retorna as variáveis inseridas
});
app.put("/clients/:id", function (req, res) { //Atualiza o cliente pelo id
    const { id } = req.params //requisita os parametros
    const client = data.find(cli => cli.id == id); //pesquisa se existe o id

    if (!client) return res.status(204).json();//se nao existir  o id mostra um erro

    const {name} = req.body;//se achar o cliente vai pegar o nome do body e atualizar

    client.name = name; //atualiza o nome

    res.json(client); // retorna client
});

app.delete("/clients/:id", function (req, res) { //exclui cliente
    const { id } = req.params //requisita os parametros
    const clientsFiltered = data.filter(client => client.id != id);//filtra os clients e traz todos os clientes que o id é diferente do que está sendo passado pelo usuário e o exclui

    res.json(clientsFiltered); //retorna a variavel ai da o valor
});

app.listen(3000, function () { //inicia o servidor na porta 3000 
    console.log("Servidor está rodando");//informa se esta rodando
});