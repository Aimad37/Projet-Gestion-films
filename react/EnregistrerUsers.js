import React, { useState } from 'react';
import axios from 'axios';

export default function EnregistrerUsers() {
  const [profil, setProfil] = useState({
    username: "",
    prenom: "",
    mail: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState(""); // État pour stocker le message du serveur
  const [erreurs, setErreurs] = useState({}); // État pour stocker les erreurs du formulaire

  const handleChange = event => {
    const { name, value } = event.target;
    setProfil(prevProfil => ({
      ...prevProfil,
      [name]: value
    }));
    setErreurs(prevErreurs => ({
      ...prevErreurs,
      [name]: "" // Effacer les erreurs lorsque l'utilisateur modifie un champ
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = {};
    // Vérifier si tous les champs sont remplis
    for (const key in profil) {
      if (!profil[key]) {
        errors[key] = "Ce champ est obligatoire";
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profil.mail)) {
      errors.mail = "Format d'email invalide";
    }
    const passwordRegex = /.{8,}/;
    if (!passwordRegex.test(profil.password)) {
      errors.password = "Il faut au moins 8 caractères pour le mot de passe";
    }
    // Vérifier si les mots de passe correspondent
    if (profil.password !== profil.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (Object.keys(errors).length > 0) {
      setErreurs(errors);
    } else {
      // Envoyer la requête HTTP avec l'en-tête contenant le token JWT
      axios.post('/enregistrer_user', profil)
        .then(response => {
          setMessage(response.data.mess);
          setProfil({
            username: "",
            prenom: "",
            mail: "",
            password: "",
            confirmPassword: ""
          })
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement du profil :', error);
          setMessage("Une erreur s'est produite lors de l'enregistrement du profil.");
        });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Enregistrer Vous</h2>
      <div>
        <p className="font-bold">{message}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username :</label>
          <input type="text" id="username" name="username" value={profil.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.username && <span className="text-red-500">{erreurs.username}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block mb-1">Prénom :</label>
          <input type="text" id="prenom" name="prenom" value={profil.prenom} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.prenom && <span className="text-red-500">{erreurs.prenom}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="mail" className="block mb-1">Mail :</label>
          <input type="text" id="mail" name="mail" value={profil.mail} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.mail && <span className="text-red-500">{erreurs.mail}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Mot de passe :</label>
          <input type="password" id="password" name="password" value={profil.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.password && <span className="text-red-500">{erreurs.password}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1">Confirmer le mot de passe :</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={profil.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.confirmPassword && <span className="text-red-500">{erreurs.confirmPassword}</span>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Envoyer</button>
      </form>
    </div>
  );
}
