import React from 'react';

export default function Deconnexion() {
  const handleDeconnexion = () => {
    // Supprimer le jeton JWT de sessionStorage
    sessionStorage.removeItem('token');
    // Rediriger l'utilisateur vers la page d'identification
    window.location.href = '/identification';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Déconnexion</h2>
      <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <button
        onClick={handleDeconnexion}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Déconnexion
      </button>
    </div>
  );
}
