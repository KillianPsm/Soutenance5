import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.tsx'; // Assurez-vous que le chemin d'accès est correct

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Nouveau state pour la confirmation du mot de passe
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const userData = {login: username, password: password};
            const registerResponse = await axios.post('http://127.0.0.1:8000/api/account/register', userData);
            console.log('Compte créé avec succès:', registerResponse.data);

            // Connectez automatiquement l'utilisateur après l'inscription réussie
            const loginResponse = await axios.post('http://127.0.0.1:8000/api/login_check', {username, password});
            const token = loginResponse.data.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            console.log('Utilisateur connecté');

            // Redirigez l'utilisateur vers le formulaire pour entrer des informations supplémentaires
            navigate('/userform');
        } catch (error) {
            setError('Problème de création de compte. Veuillez réessayer.');
            console.error('Erreur lors de la création de compte:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscription</h2>
                {error && <div className="mt-2 text-center text-sm text-red-600">{error}</div>}
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom
                                d'utilisateur:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de
                                passe:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmez
                                le mot de passe:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex flex-col">
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                S'inscrire
                            </button>
                            <div className="text-center text-indigo-600 underline hover:text-indigo-700">
                                <Link to="/login">
                                    Déjà inscrit ? Connectez-vous
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
