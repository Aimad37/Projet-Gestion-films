import React, { Component } from 'react';
import axios from 'axios';

export default class listerLivres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listeFilms: []
    };
  }

  componentDidMount() {
    // Récupérer la liste des films depuis le serveur lors du chargement du composant
    axios.get('/recuperer_liste')
      .then(res => {
        const listeFilms = res.data.tab; // Extraire la liste des films de la réponse
        this.setState({ listeFilms }); // Mettre à jour l'état avec la liste des films
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la liste des films :", error);
      });
  }

  render() {
    return (
      <div>
        <h2>Liste des films</h2>
        <ul>
          {this.state.listeFilms.map(film => (
            <li key={film.id}>
              <strong>Titre:</strong> {film.description}, <strong>Description:</strong> {film.description}, <strong>Image:</strong> {film.image}, <strong>ID Compte:</strong> {film.idCompte}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
