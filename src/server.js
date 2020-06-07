const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html") //res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    // req.query = Query Strings da nossa url

    return res.render("create-point.html")  //res.sendFile(__dirname + "/views/create-point.html")
})

server.post("/savepoint", (req, res) => {
    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items

        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }
    db.run(query, values, afterInsertData)

    //console.log(req.body)
})

server.get("/search", (req, res) => {

    const search = req.query.search

    // pesquisa vazia
    if(search == ""){
        return res.render("search-results.html", {total: 0})

    }

    // pegar os dados do banco de dados
    function dataConsults(err, rows) {
        if(err){
            return console.log(err)
        }
        console.log("Regristros:")
        console.log(rows)
        total = rows.length
        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    }
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, dataConsults)
})

server.listen(3000)