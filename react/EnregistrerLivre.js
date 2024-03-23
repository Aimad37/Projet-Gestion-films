import React, { Component } from 'react';
import axios from 'axios';

export default class LivreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livre: {
        titre: "",
        auteur: "",
        annee: ""
      }
    };
    // Binding de la fonction handleChange pour qu'elle accède correctement à this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Fonction pour mettre à jour l'état lorsque les champs sont modifiés
  handleChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      livre: {
        ...prevState.livre,
        [name]: value
      }
    }));
  }
  
  // Fonction pour soumettre le formulaire
  handleSubmit(event) {
    event.preventDefault();
    // Envoi de l'objet livre vers la route "enregistrer"
    axios({
      method: "post",
      url: '/enregistrer_livre',
      headers: { 'Content-Type': 'application/json' },
      data: this.state.livre
    }).then(res => {
      console.log(JSON.stringify(res.data));
      // Réinitialiser les champs du formulaire après l'envoi
      this.setState({
        livre: {
          titre: "",
          auteur: "",
          annee: ""
        }
      });
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <div>
          <label>Titre:</label>
          <input type="text" name="titre" value={this.state.livre.titre} onChange={this.handleChange} />
        </div>
        <div>
          <label>Auteur:</label>
          <input type="text" name="auteur" value={this.state.livre.auteur} onChange={this.handleChange} />
        </div>
        <div>
          <label>Année:</label>
          <input type="text" name="annee" value={this.state.livre.annee} onChange={this.handleChange} />
        </div>
        <button onClick={this.handleSubmit}>Enregistrer</button>
      </div>
    );
  }
}
