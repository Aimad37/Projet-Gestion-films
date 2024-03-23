import React, { useState } from 'react';
import axios from 'axios';

export default function Identification() {
  const [ident, setIdent] = useState("");
  const [mdp, setMdp] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [verification, setVerification] = useState({});
  const [token, setToken] = useState("");
  const [identIncorrect, setIdentIncorrect] = useState(false);
  const [message, setMessage] = useState(""); // État pour stocker le message du serveur

  const handleChangeIdent = event => {
    setIdent(event.target.value);
    setIdentIncorrect(false);
  };

  const handleChangeMdp = event => {
    setMdp(event.target.value);
  };

  const initForm = () => {
    setErreurs({});
  };

  const handleSubmit = async event => {
    event.preventDefault();
    initForm();
  
    try {
      const response = await axios.post('/identification', { ident, mdp });
      const data = response.data;
  
      if (data.res) {
        setVerification(data);
        setToken(data.token);
        sessionStorage.setItem("token", data.token);
        console.log("identification jeton : " + sessionStorage.getItem("token"));
        setMessage("vous êtes connecté")
        setIdent("")
        setMdp("")
        if (data.verif.identCorrecte) {
          window.location.href = '/listercmnt';
        } else {
          setIdentIncorrect(true);
        }
      } else {
        setErreurs(data.err.reduce((acc, err) => {
          acc[err.champ] = err.err;
          return acc;
        }, {}));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErreurs({ identOuMdpIncorrect: "Identifiant ou mot de passe incorrect" });
      } else {
        console.error(error);
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Identification</h2>
        <div>
        <p className="font-bold">{message}</p>
      </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ident" className="block mb-1">Identifiant (Email) :</label>
            <input type="email" id="ident" value={ident} onChange={handleChangeIdent} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            {identIncorrect && <span className="text-red-500"></span>}
          </div>
          <div>
            <label htmlFor="mdp" className="block mb-1">Mot de passe :</label>
            <input type="password" id="mdp" value={mdp} onChange={handleChangeMdp} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            {erreurs.mdp && <span className="text-red-500">{erreurs.mdp}</span>}
            {erreurs.identOuMdpIncorrect && <span className="text-red-500">{erreurs.identOuMdpIncorrect}</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Valider</button>
        </form>
        {verification.identCorrecte !== undefined && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Résultats de vérification :</h3>
            <p>Identification correcte : {verification.identCorrecte ? 'Oui' : 'Non'}</p>
            <p>Token JWT : {token}</p>
          </div>
        )}
      </div>
    </div>
  );
}
