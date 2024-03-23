import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListerFilmdesactiver() {
  const [listeFilms, setListeFilms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      this.setState({ message: "Vous devez d'abord vous identifier pour afficher la liste des profils." });
      return;
    }
  
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const response = await axios.get('/recuperer_liste_desactiver',headers);
      setListeFilms(response.data.tab);
      setMessage(response.data.mess);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des films :", error);
    }
  };

  const handleEnable = async (filmId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez d'abord vous identifier pour désactiver un film.");
      return;
    }

    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.put(`/activer_film/${filmId}`, null, headers);
      

      if (response.data.res) {
        setMessage(response.data.mess);
        fetchData();
      } else {
        setMessage(response.data.mess);
      }
    } catch (error) {
      console.error("Erreur lors de la désactivation du film :", error);
      setMessage("Une erreur s'est produite lors de la désactivation du film.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Galerie de films</h2>
      <div>
        <p className="font-bold">{message}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listeFilms&&listeFilms.map(film => (
          <div key={film.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={film.imgFilm}
              alt={film.nomFilm}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{film.nomFilm}</h3>
            <p className="text-gray-600 mb-4">{film.descFilm}</p>
            
               
                <button
                  type="button"
                  onClick={() => handleEnable(film.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                >
                  Activer
                </button>
              </div>
            
        ))}
      </div>
    </div>
  );
}
