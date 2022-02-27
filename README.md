<p align="center">
  <img src="./resources/img/logo.svg">
</p>

## IFPLAY - API (Backend)

## Em produção

IFPLAY é uma api usada para a criação de formulários em playlists de videos em um sistema multitenancy.

<br />

## Descrição

Este projeto é composto por duas partes separadas (Frontend e Backend)

- Acesse por <a href = 'https://github.com/carloseduardodb/ifplay-api'>aqui</a> o Backend.
- Acesse por <a href = 'https://github.com/carloseduardodb/ifplay'>aqui</a> o Frontend.

Existem duas publicações deste projeto (um resumo expandido (Publicado) e um artigo (TCC defendido))

- Acesse por <a href = 'https://jornada.ifsuldeminas.edu.br/index.php/jctpas2021/jctpas2021/paper/viewFile/6974/5198'>aqui</a> o resumo expandido publicado.
- Acesse por <a href = 'https://drive.google.com/file/d/1bs03lFs6tBpH3nUVUaBZ0BUlzrqXIu41/view?usp=sharing'>aqui</a> o TCC defendido.

<br />

## Deploy

- Heroku - API
- Vercel - Frontend

<br />

## O que faz?

### Da Estrutura Geral

- Criação de conta
- Login
- Autenticação JWT
- Método de envio de email para verificação de autenticidade de email (implementado mas não ativado devido a custos de provedor de email 🙁 )
- Adiciona playlists a partir de URL's do YouTube.
- Definição de titulo principal para questionário.
- Vincula perguntas a playlists criadas.
- Adiciona turmas com códigos para predisposição de envio de respostas para o professor.
- Métodos de apagar e editar para (playlist, turma, vídeos, conta)
- Métodos de continuar assistindo.
- Estrutura de pesquisa simples.
- Envio de respostas sob demanda.

### Das visualizações:

Dashboard :

- Últimas respostas na pagina inicial
- Índice de quantidade para (Respostas, Novos Emails, Playlists, Perguntas)
- Indexação para (playlists, videos, nome de questionário, questões, vídeos)
- Geração de UUID.

Cliente (Público):

- Landing page.
- Indexação de (Playlists (por id, todas), Vídeos, Questões sob demanda).

### Das Tecnologias:

Ferramentas:

- Figma (prototipação de componentes React).
- VSCode
- React Developer Tools
- Chrome
- Github Copilot
- Git
- GitHub
- Commitizen (Ferramenta de conventional commits)
- Eslint
- Prettier
- Autenticação JWT
- Node
- DBeaver
- Lucid ORM

Linguagens e Frameworks:

- TailwindCSS V2
- TypeScript
- Adonis V5
- NextJS
- ReactJS
- SQL

<br />

## 💾 &nbsp;&nbsp; Instalação

Para baixar as dependências do projeto apenas rode o comando:

    $ npm install

<br />

## 💿 &nbsp;&nbsp; Rodando o App

Para iniciar o app, apenas utilize o comando:

    $ node ace serve --watch

<br />

## ❗️ &nbsp;&nbsp; Fique atualizado

Abaixo estão as possíveis formas de sempre se manter atualizado em relação às novidades do AdonisJS versão 5

Site oficial: https://preview.adonisjs.com/ <br>
Blog Adonis: https://blog.adonisjs.com/introducing-adonisjs-v5/ <br>
Roadmap no Trello: https://trello.com/b/3klaHbfP/adonisjs-roadmap-2020 <br>

<br />

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Codificado com o ❤️ by Carlos Eduardo Dias Batista
