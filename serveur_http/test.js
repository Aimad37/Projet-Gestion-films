const mysql2 = require('mysql2/promise')

const config_mysql2 = require('./config.js').mysql2

const pool = mysql2.createPool(config_mysql2)
console.log("pool ouvert")

async function test_pool() {
return new Promise(async (resolve, reject) => {
console.log("test_pool")

let sql = "select * from t_livre"

try {
const [livres] = await pool.execute(sql)
resolve(livres)
}
catch (err) {
reject(err)
}
})
}

async function test() {
try {
let livres = await test_pool()
console.log("Liste des livres :")
livres.forEach((l) => {
console.log(`id = ${l.id} titre = ${l.titre} auteur = ${l.auteur} année = ${l.annee}`)
})

pool.end()
console.log("pool fermé")

}
catch (err) {
console.log("Erreur " + err)

}
}

test()
