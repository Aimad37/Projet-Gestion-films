const mysql = require('mysql')
function connect() { 
    var conn = mysql.createConnection({
        host: "obiwan.univ-brest.fr",
        user: "e21908007sql",
        password: "bERF4R15",
        database: "e21908007_db2"
      });
      return new Promise((resolve, reject) => {
        conn.connect(err => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Connected to MySQL server');
            resolve(conn);
        });
    });

 }
 function exec(connection, sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Query executed successfully');
            resolve(result);
        });
    });
}

function execQuery(connection, sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Query executed successfully');
            resolve(results);
        });
    });
}

async function enregistrerLivre(titre, auteur, annee) {
    const connection = await connect(); 
    //await c'est pour bloquer le reste du process on attendent le retour de la focntion connect qui retourn un promesse 
    /*connect().then(connection=>{
        const sql = `INSERT INTO t_livre (titre, auteur, annee) VALUES ("${titre}", "${auteur}", ${annee})`;
        connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        connection.end();
    });
    })*/
    const sql = `INSERT INTO t_livre (titre, auteur, annee) VALUES ("${titre}", "${auteur}", ${annee})`;
    exec(connection, sql).then(result => {
        console.log("Résultat de la requête :", result);
    })
    .catch(error => {
        console.error("Erreur lors de l'exécution de la requête :", error);
    });
    
    
}
async function listerLivres() {
    const connection = await connect(); 
    try {
        const sqlrec = `SELECT * FROM t_livre`;
        const results = await execQuery(connection, sqlrec);
        console.log("Résultats de la requête :", results);
        connection.end();
        return results;
    } catch (error) {
        console.error("Erreur lors de l'exécution de la requête :", error);
        connection.end();
        throw error; // Rejeter l'erreur pour la gérer dans le code appelant si nécessaire
    }
}

async function verifident(ident, mdp) {
    const connection = await connect();
    try {
        const sql = `SELECT compte.*, profil.role FROM compte INNER JOIN profil ON compte.idcompte = profil.idcompte WHERE compte.mail = '${ident}' AND compte.password = '${mdp}'`;
        const results = await execQuery(connection, sql);
        console.log("Résultats de la requête :", results);
        connection.end();
    return results;
    } catch (error) {
        console.error("Erreur lors de l'exécution de la requête :", error);
        connection.end();
        throw error; // Rejeter l'erreur pour la gérer dans le code appelant si nécessaire
    }
}


async function test(){
    const tmp = await verifident("aimad","aimad");
    console.log(JSON.stringify(tmp));
}
//test();

module.exports = {
    enregistrerLivre,
    listerLivres,
    verifident
};