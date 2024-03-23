const express = require('express'); // chargement du module express
const config = require("./config.js"); // chargement de la configuration
const util = require("util");
const jwt = require('jsonwebtoken');
const livre_verif = require("./livre_verif").livre_verif
const ident_verif = require("./ident_verif").ident_verif
const verifier_champs = require("./verifier_champs").verifier_champs
const axios = require('axios');
const base = config.base;
const port_http = config.port_http;
const enregistrerLivre = require("./mysql.js").enregistrerLivre;
const listerLivres = require("./mysql.js").listerLivres;
const verifident = require("./mysql").verifident;
var app = express();
app.use("/", express.static(base + "/html", { index: 'index.html' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.listen(port_http, function () {
    console.log('Express server listening on port ' + port_http);        
    
//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================    
    

        app.post('/enregistrer_user', async (req, res) => {
            try {
            const { username, prenom, mail , password } = req.body; // Récupérer les données du corps de la requête
            const compteData = {mail,password}; 
            
            // Envoyer une requête HTTP POST à votre application Spring
            
            const compteResponse = await axios.post('http://localhost:8080/comptes/enregistrer_user', compteData
            );
            console.log(JSON.stringify(compteResponse.data));
            const idCompte = compteResponse.data.idCompte;
            
            const profilData = { username, prenom, mail,role : 'u', idCompte };
            const response = await axios.post('http://localhost:8080/profils/enregistrer_user', profilData
            );
        
            // Envoyer la réponse de Spring au client React
            res.send({mess:"Vous êtes bien inscrit !"});
            } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
            res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.');
            }
        });
        //==========================================================================================================================================================================================================
        app.post("/identification", async function (req, res) {
            console.log("POST identification");
            console.log("xaaaaaaaazabii" + req.body.ident);
            const verificationChamps = verifier_champs(req.body, ident_verif);
            console.log(verificationChamps.res);
            console.log("verif = " + JSON.stringify(verificationChamps));
        
            if (!verificationChamps.res) {
                return res.send(verificationChamps);
            }
        
            try {
                const identCorrecte = await verifident(req.body.ident, req.body.mdp);
                console.log("Identifiant correct :", identCorrecte);
        
                if (identCorrecte.length > 0) {
                    const role = identCorrecte[0].role;
                    const token = jwt.sign({
                        ident: req.body.ident,
                        id:identCorrecte[0].idcompte,
                        role: role
                    }, config.private_key, { expiresIn: 60 * 60 }); // 60 minutes
        
                    res.send({ res: true, token: token, verif: verificationChamps });
                } else {
                    res.status(401).send({ res: false, mess: "Identifiant ou mot de passe incorrect", verif: verificationChamps });
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'identifiant :", error);
                res.status(500).send({ res: false, mess: "Erreur lors de la vérification de l'identifiant" });
            }
        });
        //==========================================================================================================================================================================================================
        app.put('/changer_role_profil/:profilId', async (req, res) => {
            try {
            const { profilId } = req.params; // Récupération de l'identifiant du profil depuis l'URL
            const { role } = req.body;
            // Envoi de la requête pour changer le rôle du profil au serveur Spring
            const response = await axios.put(`http://localhost:8080/profils/changer_role_profil/${profilId}`, {
                role
            });
        
            // Réponse du serveur Spring
            res.status(200).json({ res: true, mess: "Le changement de rôle a été fait avec succès" });
            } catch (error) {
            console.error('Erreur lors du changement du rôle du profil :', error);
            res.status(500).send('Une erreur s\'est produite lors du changement du rôle du profil');
            }
        });
        //==========================================================================================================================================================================================================
        app.delete("/supprimer_profil/:id", async function (req, res) {
            try {
                const id = req.params.id;
                // Faites une requête HTTP DELETE vers votre application Spring
                const response = await axios.delete(`http://localhost:8080/profils/supprimer_profil/${id}`);
                
                // Vérifiez si la suppression a réussi en vérifiant le statut de la réponse
                if (response.status === 200) {
                    res.send({ success: true, message: "Profil supprimé avec succès." });
                } else {
                    res.status(500).send({ success: false, message: "Erreur lors de la suppression du profil." });
                }
            } catch (error) {
                console.error("Erreur lors de la suppression du profil :", error);
                res.status(500).send({ success: false, message: "Erreur lors de la suppression du profil." });
            }
        });
        //==========================================================================================================================================================================================================
        app.get("/recuperer_liste_profils", async function (req, res) {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour affiche la liste des profils ." });
                }
        
                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];
        
                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
                // Faites une requête HTTP GET vers votre application Spring
                    const response = await axios.get('http://localhost:8080/profils/recuperer_liste_profils');
                
                    // Récupérez les données de la réponse
                    const listeDonnees = response.data;
                            // Envoyez la liste de données à votre client React
                    res.send({ res: true, tab: listeDonnees }); 
                }else{
                    res.send({res: false , mess : "Vous n'êtes pas autorisé à effectuer cette action."})
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la liste des profils :", error);
                res.status(500).send({ res: false, error: "Erreur lors de la récupération de la liste des profils" });
            }
        });


//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================

        
        app.get("/recuperer_liste", async function (req, res) {
            try {
                // Faites une requête HTTP GET vers votre application Spring
                const response = await axios.get('http://localhost:8080/films/recuperer_liste_active');
                
                // Récupérez les données de la réponse
                const listeDonnees = response.data;
                // Envoyez la liste de données à votre client React
                res.send({ res: true, tab: listeDonnees }); 
            } catch (error) {
                console.error("Erreur lors de la récupération de la liste des livres :", error);
                res.status(500).send({ res: false, error: "Erreur lors de la récupération de la liste des livres" });
            }
        });
//==========================================================================================================================================================================================================
        app.get("/recuperer_liste_desactiver", async function (req, res) {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour affiche la liste des profils ." });
                }
        
                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];
        
                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
                // Faites une requête HTTP GET vers votre application Spring
                    const response = await axios.get('http://localhost:8080/films/recuperer_liste_desactive');
                    
                    // Récupérez les données de la réponse
                    const listeDonnees = response.data;
                    // Envoyez la liste de données à votre client React
                    res.send({ res: true, tab: listeDonnees }); 
                }else{
                    res.send({ res: false, mess : "Vous n'êtes pas autorisé à effectuer cette action." });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la liste des film :", error);
                res.status(500).send({ res: false, error: "Erreur lors de la récupération de la liste des film" });
            }
        }); 
//=========================================================================================================================================================================================================      
        app.post('/ajouter_film', async (req, res) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour affiche la liste des profils ." });
                }
        
                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];
        
                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
            
                const { nomFilm, descFilm, imageUrl } = req.body; // Récupérer les données du corps de la requête
        
            // Créer un objet Film à partir des données reçues
                const filmData = {
                    nomFilm: nomFilm,
                    descFilm: descFilm,
                    imgFilm: imageUrl,// Utiliser l'URL de l'image pour imgFilm
                    idCompte : 1,
                    etat : "Desactiver"
                };
        
            // Envoyer une requête HTTP POST à votre application Spring
                const response = await axios.post('http://localhost:8080/films/ajouter_film', filmData);
        
            // Envoyer la réponse de Spring au client React
                res.send({ res : true ,message: "Le film a été ajouté avec succès !" });
            }else{
                res.send({ res : false,message: "Vous n'êtes pas autorisé à effectuer cette action." });
            }
            } catch (error) {
            console.error('Erreur lors de l\'ajout du film :', error);
            res.status(500).send('Une erreur s\'est produite lors de l\'ajout du film.');
            }
        });
//==========================================================================================================================================================================================================        
        app.put('/desactiver_film/:filmId', async (req, res) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour desactiver un film." });
                }
        
                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];
        
                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
                    const { filmId } = req.params; // Récupération de l'identifiant du film depuis l'URL
        
                    // Envoi de la requête pour desactiver le film au serveur Spring
                    const response = await axios.put(`http://localhost:8080/films/desactiver_film/${filmId}`);
        
                    // Réponse du serveur Spring
                    res.status(200).json({ res: true, mess: "Film désactivé avec succès" });
                } else {
                    res.send({res:false , mess:"Vous n'êtes pas autorisé à effectuer cette action."});
                }
            } catch (error) {
                console.error('Erreur lors de la désactivation du film :', error);
                res.status(500).send('Une erreur s\'est produite lors de la désactivation du film.');
            }
        });
//==========================================================================================================================================================================================================    
        app.put('/activer_film/:filmId', async (req, res) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour desactiver un film." });
                }
        
                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];
        
                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
                    const { filmId } = req.params; // Récupération de l'identifiant du film depuis l'URL
        
                    // Envoi de la requête pour desactiver le film au serveur Spring
                    const response = await axios.put(`http://localhost:8080/films/activer_film/${filmId}`);
        
                    // Réponse du serveur Spring
                    res.status(200).json({ res: true, mess: "Film Activé avec succès" });
                } else {
                    res.send({res:false , mess:"Vous n'êtes pas autorisé à effectuer cette action."});
                }
            } catch (error) {
                console.error('Erreur lors de l\'activation du film :', error);
                res.status(500).send('Une erreur s\'est produite lors de l\'activation du film.');
            }
        });


//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================
//==========================================================================================================================================================================================================

        
        app.post('/ajouter_commentaire/:filmId', async (req, res) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour enregistrer un livre." });
                }

                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];

                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }

                const { filmId } = req.params; // Récupération de l'identifiant du film depuis l'URL
                const { comment } = req.body; // Récupération du commentaire depuis le corps de la requête

                // Envoi de la requête pour ajouter le commentaire au serveur Spring
                const response = await axios.post(`http://localhost:8080/commentaires/ajouter_commentaire`, {
                    commentaire: comment,
                    idFilm: filmId,
                    idCompte: decoded.id
                });

                // Réponse du serveur Spring
                res.status(200).json(response.data);
            } catch (error) {
                console.error('Erreur lors de l\'ajout du commentaire :', error);
                res.status(500).send('Une erreur s\'est produite lors de l\'ajout du commentaire.');
            }
        });
//==========================================================================================================================================================================================================            
        app.delete("/supprimer_commentaire/:id_commentaire", async function (req, res) {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ res: false, mess: "Authentification requise pour supprimer un commentaire." });
                }

                // Extraction du token JWT de l'en-tête
                const token = authHeader.split(' ')[1];

                // Vérification du token JWT
                let decoded;
                try {
                    decoded = jwt.verify(token, config.private_key);
                } catch (jwtError) {
                    console.error('Erreur de vérification du token JWT :', jwtError);
                    return res.status(401).send({ res: false, mess: "Token JWT invalide." });
                }
                if(decoded.role === 'a'){
                    const { id_commentaire } = req.params; // Récupération de l'identifiant du film depuis l'URL

                    // Envoi de la requête pour desactiver le film au serveur Spring
                    const response = await axios.delete(`http://localhost:8080/commentaires/supprimer_commentaire/${id_commentaire}`);

                    // Réponse du serveur Spring
                    res.status(200).json({ res: true, mess: "commenataire supprimer avec succès" });
                } else {
                    res.send({res:false , mess:"Vous n'êtes pas autorisé à effectuer cette action."});
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du commentaire :', error);
                res.status(500).send('Une erreur s\'est produite lors de la suppression du commenatire.');
            }
        });
//==========================================================================================================================================================================================================
        app.get("/recuperer_liste_film_avec_cmnts",async function (req, res){
            try {
                // Faites une requête HTTP GET vers votre application Spring
                const response = await axios.get('http://localhost:8080/commentaires/films_avec_commentaires');
                
                // Récupérez les données de la réponse
                const listeDonnees = response.data;
                // Envoyez la liste de données à votre client React
                res.send({ res: true, tab: listeDonnees }); 
            } catch (error) {
                console.error("Erreur lors de la récupération de la liste des livres :", error);
                res.status(500).send({ res: false, error: "Erreur lors de la récupération de la liste des livres" });
            }
        });

});
