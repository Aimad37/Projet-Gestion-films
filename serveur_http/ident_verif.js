const ident_verif = {
    ident: {
        regexp: ".{4,}", // Au moins 4 caractères
        mess: "Il faut au moins 4 lettres pour l'identification",
    },
    mdp: {
        regexp: ".{8,}", // Au moins 8 caractères
        mess: "Il faut au moins 8 caractères pour le mot de passe",
    }
};

module.exports = {
    ident_verif: ident_verif,
};
