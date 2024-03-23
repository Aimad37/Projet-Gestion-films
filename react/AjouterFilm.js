import React, { useState } from 'react';
import axios from 'axios';

export default function EnregistrerFilm() {
  const [film, setFilm] = useState({
    nomFilm: "",
    descFilm: "",
    imageUrl: "", // Stocker l'URL de l'image
  });
  const [message, setMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [message2,setMessage2] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    setFilm(prevFilm => ({
      ...prevFilm,
      [name]: value
    }));
    setErreurs(prevErreurs => ({
      ...prevErreurs,
      [name]: ""
    }));
  };

  const handleImageChange = event => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage); // Créer l'URL de l'image sélectionnée
    setFilm(prevFilm => ({
      ...prevFilm,
      imageUrl: imageUrl // Stocker l'URL de l'image dans l'état film
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const errors = {};
    if (!film.nomFilm) {
      errors.nomFilm = "Ce champ est obligatoire";
    }
    if (!film.descFilm) {
      errors.descFilm = "Ce champ est obligatoire";
    }
    if (!film.imageUrl) {
      errors.image = "Veuillez sélectionner une image";
    }
    if (Object.keys(errors).length > 0) {
      setErreurs(errors);
    } else {
      const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez d'abord vous identifier pour ajouter un commentaire.");
      return;
    }

    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };
      try {
        const { nomFilm, descFilm, imageUrl } = film;
        const response = await axios.post('/ajouter_film', { nomFilm, descFilm, imageUrl },headers);
        if(response.data.res){
          setMessage2(response.data.message);
        }else{
          setMessage(response.data.message);
        }
        
        setFilm({
          nomFilm: "",
          descFilm: "",
          imageUrl: ""
        });
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film :', error);
        setMessage("Une erreur s'est produite lors de l'ajout du film.");
      }
    }
  };

  return (
    
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Ajouter un film</h2>
      <div>
      <p className="font-bold text-red-500">{message}</p>
      <p className="font-bold text-green-500">{message2}</p>
      </div>

      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nomFilm" className="block mb-1">Nom du film :</label>
          <input type="text" id="nomFilm" name="nomFilm" value={film.nomFilm} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {erreurs.nomFilm && <span className="text-red-500">{erreurs.nomFilm}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="descFilm" className="block mb-1">Description du film :</label>
          <textarea id="descFilm" name="descFilm" value={film.descFilm} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
          {erreurs.descFilm && <span className="text-red-500">{erreurs.descFilm}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">Image du film :</label>
          <input type="file" accept="image/*" id="image" name="image" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          {film.imageUrl && <img src={film.imageUrl} alt="Film" className="w-full h-auto mt-2" />} {/* Afficher l'image sélectionnée */}
          {erreurs.image && <span className="text-red-500">{erreurs.image}</span>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Ajouter</button>
      </form>
    </div>
  );
}
