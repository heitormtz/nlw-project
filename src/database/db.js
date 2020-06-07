// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas operações
// db.serialize( () => {
//     // criar tabela
//     // db.run(`
//     //   CREATE TABLE IF NOT EXISTS places(
//     //       id INTEGER PRIMARY KEY AUTOINCREMENT,
//     //       image TEXT,
//     //       name TEXT,
//     //       address TEXT,
//     //       address2 TEXT,
//     //       state TEXT,
//     //       city TEXT,
//     //       items TEXT
//     //      );
//     // `)
//     // // inserir dados
//     // const query = `
//     //     INSERT INTO places (
//     //         image,
//     //         name,
//     //         address,
//     //         address2,
//     //         state,
//     //         city,
//     //         items

//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `
//     // const values = [
//     //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     //     "Papersider",
//     //     "Guilherme Gemballa, Jardim América",
//     //     "Número 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Resíduos Eletrônicos, Lâmpadas"
//     // ]

//     // function afterInsertData(err) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Cadastrado com sucesso")
//     //     console.log(this)
//     // }
//     // db.run(query, values, afterInsertData)

//     // consultar os dados
    // function dataConsults(err, rows) {
    //    if(err){
    //        return console.log(err)
    //    }
    //    console.log("Regristros:")
    //    console.log(rows)
    // }

    // db.all(`SELECT * FROM places`, dataConsults)

//     // deletar um dado
//     function afterDeleteData(err) {
//        if(err) {
//            return console.log(err)
//        }
//        console.log("Registro deletado com sucesso")
//      }
//     db.run(`DELETE FROM places WHERE id = ?`, [5], afterDeleteData)
//  })