import React, { Component, createRef } from 'react';
import Menu from './Menu';
import Identification from './Identification';
import Deconnexion from './Deconnexion';
import ListerProfils from './ListerProfils';
import EnregistrerUsers from './EnregistrerUsers';
import ListerFilmAvecCmnt from './ListerFilmAvecCmnt';
import ListerCmnt from './ListerCmnt';
import ListerFilmdesactiver from './ListerFilmdesactiver';
import AjouterFilm from './AjouterFilm';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem('token') !== null, // Vérifie si le token est présent dans sessionStorage
      page: 'listercmnt', // Initialise la page à afficher
    };
    this.listerFilmAvecCmntRef = createRef(); // Crée une référence au composant ListerFilmAvecCmnt
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleLogin(token) {
    sessionStorage.setItem('token', token); // Stocke le token dans sessionStorage
    this.setState({ isLoggedIn: true });
  }

  handleLogout() {
    sessionStorage.removeItem('token'); // Supprime le token de sessionStorage
    this.setState({ isLoggedIn: false });
  }

  handleMenuClick(value) {
    let contenuPage;

    if (value === 'listercmnt') {
      contenuPage = <ListerFilmAvecCmnt />;
    } else if (value === 'ident') {
      contenuPage = <Identification />;
    } else if (value === 'Profils') {
      contenuPage = <ListerProfils />;
    } else if (value === 'listercmnt2') {
      contenuPage = <ListerCmnt />;
    }else if (this.state.page === 'ListerFilmdesactiver') {
      contenuPage = <ListerFilmdesactiver />;
    }else if (this.state.page === 'AjouterFilm') {
      contenuPage = <AjouterFilm />;
    } else if (value === 'new') {
      contenuPage = <EnregistrerUsers />;
    } else if (value === 'deconnexion') {
      contenuPage = <Deconnexion />;
    }

    this.setState({ page: value }); // Met à jour la page à afficher
  }

  render() {
    const menuOptions = [];

    if (!this.state.isLoggedIn) {
      menuOptions.push({ label: 'Identifier', value: 'ident' });
      menuOptions.push({ label: 'Créer un compte', value: 'new' });
    }

    menuOptions.push({ label: 'Liste des films ', value: 'listercmnt' });
    menuOptions.push({ label: 'Liste des films avec commentaires', value: 'listercmnt2' });

    if (this.state.isLoggedIn) {
      menuOptions.push({ label: 'Liste des profils', value: 'Profils' });
      menuOptions.push({ label: 'Liste Film desactiver', value: 'ListerFilmdesactiver' });
      menuOptions.push({label : 'Ajouter film',value : 'AjouterFilm'});
      menuOptions.push({ label: 'Déconnexion', value: 'deconnexion' });
    }

    let contenuPage;
    
    if (this.state.page === 'listercmnt') {
      contenuPage = <ListerFilmAvecCmnt ref={this.listerFilmAvecCmntRef} onLogout={this.handleLogout} />;
    } else if (this.state.page === 'ident') {
      contenuPage = <Identification onLogin={this.handleLogin} />;
    } else if (this.state.page === 'Profils') {
      contenuPage = <ListerProfils />;
    } else if (this.state.page === 'listercmnt2') {
      contenuPage = <ListerCmnt />;
    } else if (this.state.page === 'ListerFilmdesactiver') {
      contenuPage = <ListerFilmdesactiver />;
    }else if (this.state.page === 'AjouterFilm') {
      contenuPage = <AjouterFilm />;
    }else if (this.state.page === 'new') {
      contenuPage = <EnregistrerUsers />;
    } else if (this.state.page === 'deconnexion') {
      contenuPage = <Deconnexion />;
    }

    return (
      <div>
        <Menu options={menuOptions} onSelect={this.handleMenuClick} />
        {contenuPage}
      </div>
    );
  }
}
