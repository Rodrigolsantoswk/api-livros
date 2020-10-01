import express, { request, response } from 'express';
import { Client }  from 'pg';

const client = new Client({
    user: 'postgres',
    host:'localhost',
    database:'nome',
    port: 5432,
    password: '123456'
});
//edit
client.connect();
const routes = express.Router();


//Query com cadastro de usuário
routes.post('/newUser', (request, response) => {
    const {name, email, login, password, profile, city, dateofbirth} = request.body;
    client.query(`insert into usuario (nomeusuario, emailusuario, loginusuario, senhausuario, urlimgusuario, cidade, datanascimentousuario) values
    ('${name}' ,'${email} ' ,'${login} ' ,'${password} ' , '${profile} ', '${city}', '${dateofbirth}'));`, (err, result) => {
        if(err){
            console.log(err);
            response.status(400).send(err);
        }
        response.status(200).send('Cadastrado com sucesso.');
    });
});

//Query com cadastro de livro
routes.post('/newBook', (request, response) => {
    const {nomelivro, editoralivro, edicaolivro, urlimglivro, enderecoiniciallivro, anopublicacaolivro,
    autor, qrcode} = request.body;

    client.query(`insert into livro (nomelivro, editoralivro, edicaolivro, urlimglivro, enderecoiniciallivro, anopublicacaolivro, autor, qrcode) values
        ('${nomelivro}', '${editoralivro}',${edicaolivro},'${urlimglivro}', '${enderecoiniciallivro}', '${anopublicacaolivro}',
         '${autor}', ${qrcode});`, (err, result) => {
             if(err){
                 console.log(err);
                 response.status(400).send(err);
             }
             response.status(200).send('Cadastrado com sucesso.');
         });
});

//Query para cadastro da relação entre usuário e livro
routes.post('/usersAndBooks', (request, response) => {
    const {datapostagem, idusuario, idlivro} = request.body;
    client.query(`insert into usuariolivro (datapostagem, idusuario, idlivro) values
    ('${datapostagem}', ${idusuario}, ${idlivro});`, (err, result) => {
        if(err){
            console.log(err);
            response.status(400).send(err);
        }
        response.status(200).send('Cadastrado com sucesso.');
    });
});

//Query com cadastro de emprestimo
routes.post('/purchase', (request, response) => {
    const {dataemprestimo, realizacaoemprestimo, datadevolucao, enderecoemprestimo, 
        devolucaoemprestimo, idusuarioconcedente, idusuarioreceptor, idlivro} = request.body;

    client.query(`insert into emprestimo (dataemprestimo, realizacaoemprestimo, datadevolucao, enderecoemprestimo, devolucaoemprestimo, idusuarioconcedente, idusuarioreceptor, idlivro) values
    ('${dataemprestimo}', ${realizacaoemprestimo}, '${datadevolucao}', '${enderecoemprestimo}', 
    ${devolucaoemprestimo}, ${idusuarioconcedente}, ${idusuarioreceptor}, ${idlivro});`, (err, result) => {
        if(err){
            console.log(err);
            response.status(400).send(err);
        }
        response.status(200).send('Cadastrado com sucesso.');
    });
});


export default routes;
