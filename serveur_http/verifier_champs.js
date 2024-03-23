
const livre_verif = require("./livre_verif").livre_verif
const ident_verif = require("./ident_verif").ident_verif


function verifier_champs(obj,obj_verif) {
    // on vérifie "obj" à partir des données de l'objet de validation "obj_verif"

    let result = {
        res : true,
        err: [],
        mess : ""
    }

    Object.keys(obj_verif).forEach(ch => {
        console.log("vérification champ "+ch)

        let r = new RegExp(obj_verif[ch].regexp)
            let m = obj_verif[ch].mess
            if ((""+obj[ch]).match(r)) {
                console.log("match "+obj[ch]+ " "+r)
            }
            else {
                result.res = false
                result.err.push({
                    champ : ch,
                    err : m,
                })
                console.log("nomatch "+obj[ch]+ " "+r)
            }
    })

    if (result.res) result.mess = "Succès validation"
    else result.mess = "Echec validation"

    return result
}

if ((process.argv.length == 3) && (process.argv[2] == "test")) {

    let ident = {
        identification : "t",
        mdp : "uuuu",
    }
    let res = verifier_champs(ident,ident_verif)

    console.log("res = "+JSON.stringify(res))

}



module.exports = {
    verifier_champs : verifier_champs,
}
