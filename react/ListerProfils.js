import React, { Component } from 'react';
import axios from 'axios';

export default class ListerProfils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listeProfils: []
    };
  }

  componentDidMount() {
    // Récupérer la liste des profils depuis le serveur lors du chargement du composant
    this.fetchProfils();
  }

  async fetchProfils() {
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      this.setState({ message: "Vous devez d'abord vous identifier pour afficher la liste des profils." });
      return;
    }
  
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    try {
      const response = await axios.get('/recuperer_liste_profils',headers);
      const listeProfils = response.data.tab; // Extraire la liste des profils de la réponse
      this.setState({ listeProfils, message: "" }); // Mettre à jour l'état avec la liste des profils
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste des profils :", error);
      this.setState({ message: "Une erreur s'est produite lors de la récupération de la liste des profils." });
    }
  }
  
  handleDeleteProfil(id) {
    // Envoyer une requête HTTP DELETE pour supprimer le profil
     axios.delete(`/supprimer_profil/${id}`)
      .then(res => {
        console.log("Profil supprimé avec succès !");
        // Rafraîchir la liste des profils après la suppression
          this.fetchProfils();
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du profil :", error);
      });
  }
  handleChangeRole(id, newRole) {
    // Envoyer une requête HTTP PUT pour changer le rôle du profil
    axios.put(`/changer_role_profil/${id}`, { role: newRole })
      .then(res => {
        console.log("Rôle du profil modifié avec succès !");
        // Rafraîchir la liste des profils après la modification
        this.fetchProfils();
      })
      .catch(error => {
        console.error("Erreur lors de la modification du rôle du profil :", error);
      });
  }

  render() {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-medium text-black text-center mb-4">Liste des profils</h2>
        <div className="w-full max-w-4xl mx-auto overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Nom</th>
                <th className="px-4 py-2 border-b">Prénom</th>
                <th className="px-4 py-2 border-b">Mail</th>
                <th className="px-4 py-2 border-b">Rôle</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listeProfils&&this.state.listeProfils.map(profil => (
                <tr key={profil.idProfil}>
                  <td className="border px-4 py-2">{profil.username}</td>
                  <td className="border px-4 py-2">{profil.prenom}</td>
                  <td className="border px-4 py-2">{profil.mail}</td>
                  <td className="border px-4 py-2">{profil.role}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button onClick={() => this.handleDeleteProfil(profil.idProfil)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Supprimer</button>
                    <button onClick={() => this.handleChangeRole(profil.idProfil, profil.role)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Changer rôle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
