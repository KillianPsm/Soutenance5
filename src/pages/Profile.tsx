import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${BASE_URL}/user/select`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Profil Utilisateur</h2>
                {user ? (
                    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Informations personnelles</h3>
                        </div>
                        <div className="border-t border-gray-200">
                            <ul>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Nom</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.lastName}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Prénom</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.firstName}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Téléphone</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Mail</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.mail}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Compte</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.account.login}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Ville</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.city.name}</span>
                                </li>
                                <li className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <span className="text-sm font-medium text-gray-500">Code Postal</span>
                                    <span
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.city.zipcode}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="mt-2 text-center text-sm text-gray-600">Chargement en cours...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;