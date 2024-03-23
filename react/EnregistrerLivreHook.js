import React, { useState } from 'react';
import axios from 'axios';

export default function EnregistrerLivreHook() {
  const [livre, setLivre] = useState({
    titre: "",
    auteur: "",
    annee: ""
  });
  const [message, setMessage] = useState(""); // État pour stocker le message du serveur
  const [erreurs, setErreurs] = useState({}); // État pour stocker les erreurs du formulaire

  const handleChange = event => {
    const { name, value } = event.target;
    setLivre(prevLivre => ({
      ...prevLivre,
      [name]: value
    }));
    setErreurs(prevErreurs => ({
      ...prevErreurs,
      [name]: "" // Effacer les erreurs lorsque l'utilisateur modifie un champ
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Récupérer le token JWT depuis le sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Si aucun token n'est disponible, afficher un message d'erreur
      setMessage("Vous devez d'abord vous identifier pour enregistrer un livre.");
      return;
    }
    // Construire l'en-tête avec le token JWT
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };
    // Envoyer la requête HTTP avec l'en-tête contenant le token JWT
    axios.post('/enregistrer_livre', livre, headers)
      .then(res => {
        console.log(JSON.stringify(res.data));
        if (res.data.res) {
          setMessage(res.data.mess);
          setLivre({ titre: "", auteur: "", annee: "" }); // Réinitialiser le formulaire après l'enregistrement
        } else {
          setMessage(res.data.mess);
          setErreurs(res.data.err.reduce((acc, err) => {
            acc[err.champ] = err.err;
            return acc;
          }, {}));
        }
      })
      .catch(error => {
        console.error(error);
        setMessage("Une erreur s'est produite lors de l'enregistrement."); // Afficher un message d'erreur en cas d'échec de la requête
      });
  };

  return (
    <div>
      <h2>Enregistrer un livre (Hook)</h2>
      <table>
        <tr>
          <td>Titre :</td>
          <td><input type="text" name="titre" value={livre.titre} onChange={handleChange} /></td>
          <td><span style={{ color: "red" }}>{erreurs.titre}</span></td>
        </tr>
        <tr>
          <td>Auteur :</td>
          <td><input type="text" name="auteur" value={livre.auteur} onChange={handleChange} /></td>
          <td><span style={{ color: "red" }}>{erreurs.auteur}</span></td>
        </tr>
        <tr>
          <td>Année :</td>
          <td><input type="text" name="annee" value={livre.annee} onChange={handleChange} /></td>
          <td><span style={{ color: "red" }}>{erreurs.annee}</span></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td><button onClick={handleSubmit}>Envoyer</button></td>
        </tr>
      </table>
      <p style={{ color: message.startsWith("!!") ? "red" : "green" }}>{message}</p>
    </div>
  );
}
