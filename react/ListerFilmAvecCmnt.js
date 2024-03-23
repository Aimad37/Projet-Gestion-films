import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListerFilmAvecCmnt() {
  const [listeFilms, setListeFilms] = useState([]);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/recuperer_liste');
      setListeFilms(response.data.tab);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des films :", error);
    }
  };

  const handleSubmitComment = async (event, filmId) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez d'abord vous identifier pour ajouter un commentaire.");
      return;
    }

    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      await axios.post(`/ajouter_commentaire/${filmId}`, { comment }, headers);
      setMessage('Commentaire ajouté avec succès !');
      fetchData();
      event.target.comment.value = ''; // Vide le champ de saisie après l'ajout du commentaire
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      if (error.response && error.response.status === 401) {
        setMessage("Vous devez d'abord vous identifier pour ajouter un commentaire.");
      } else {
        setMessage("Une erreur s'est produite lors de l'ajout du commentaire.");
      }
    }
  };

  const handleDisable = async (filmId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez d'abord vous identifier pour désactiver un film.");
      return;
    }

    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.put(`/desactiver_film/${filmId}`, null, headers);
      

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
        {listeFilms.map(film => (
          <div key={film.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={film.imgFilm}
              alt={film.nomFilm}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{film.nomFilm}</h3>
            <p className="text-gray-600 mb-4">{film.descFilm}</p>
            <form onSubmit={(event) => handleSubmitComment(event, film.id)}>
              <input
                type="text"
                name="comment"
                placeholder="Ajouter un commentaire"
                className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mb-2"
              />
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => handleDisable(film.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                >
                  Désactiver
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
