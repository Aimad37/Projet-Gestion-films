import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListerCmnt() {
  const [listeFilms, setListeFilms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/recuperer_liste_film_avec_cmnts');
      setListeFilms(response.data.tab);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des films :", error);
    }
  };
  const handleDeleteComment = async (id_commentaire) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez d'abord vous identifier pour supprimer un commentaire.");
      return;
    }

    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const reponse = await axios.delete(`/supprimer_commentaire/${id_commentaire}`, headers);
      if (reponse.data.res === false) {
        setMessage(reponse.data.mess); // affiche le message d'erreur envoyé par Node
      } else {
        setMessage("Commentaire supprimé avec succès.");
        fetchData();
      }
    } catch (error) {
      console.error("Erreur lors du suppression du commentaire :", error);
      if (error.response && error.response.status === 401) {
        setMessage("Vous devez d'abord vous identifier pour ajouter un commentaire.");
      } else {
        setMessage("Une erreur s'est produite lors du suppression du commentaire.");
      }
    }
  };

  return (
    <div className="p-6">
  <h2 className="text-2xl font-semibold mb-4">Galerie de films avec commentaires</h2>
  <div>
    <p className="font-bold">{message}</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {listeFilms && listeFilms.map(filmAvecCommentaires => (
      <div key={filmAvecCommentaires.film.id} className="bg-white rounded-lg shadow-md p-4">
        <img
          src={filmAvecCommentaires.film.imgFilm} // ajoute un slash avant le chemin d'accès à l'image
          alt={filmAvecCommentaires.film.nomFilm}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{filmAvecCommentaires.film.nomFilm}</h3>
        <p className="text-gray-600 mb-4">{filmAvecCommentaires.film.descFilm}</p>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Commentaires :</h4>
          <ul>
            {filmAvecCommentaires.commentaires.map(commentaire => (
              <li key={commentaire.id_commentaire} className="flex items-center justify-between mb-2">
                <div className="text-gray-600">{commentaire.commentaire}</div>
                <button
                  type="button"
                  onClick={() => handleDeleteComment(commentaire.id_commentaire)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Supprimer
                </button>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</div>


  );
}
