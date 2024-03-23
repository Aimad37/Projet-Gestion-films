const fs = require('fs')

const base = "C:\\Users\\aimad\\Desktop\\node\\tp1\\serveur_http" // !!!!! À MODIFIER !!!!!!
const port_http = 3100
const private_key = "testdezeboiii"

if (!fs.existsSync(base)) {
console.log("Erreur chargement config.js")
console.log("Le dossier "+base+" n'existe pas")
console.log("Modifier la variable base")
process.exit(0)
}

module.exports = {
base : base,
port_http : port_http,
private_key: private_key,
}
