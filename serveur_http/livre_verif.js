const livre_verif = {

	titre : {
		regexp : ".{2,}",
		mess : "Il faut au moins 2 lettres pour le titre",
	},

	auteur : {
		regexp : ".{2,}",
		mess : "Il faut au moins 2 lettres pour l'auteur'",
	},

	annee : {
		regexp : "^[0-9]{4}$",
		mess : "L'année doit avoir 4 chiffres",
	}

}
module.exports = {
    livre_verif : livre_verif,
}