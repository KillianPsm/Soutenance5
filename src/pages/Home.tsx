import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

interface Trip {
    id: number;
    cityStart: string;
    cityArrive: string;
    distance: number;
    tripDate: string;
    // Add other trip properties here
}

interface User {
    id: number;
    // Add other user properties here
}

const Home: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        fetchTrips();
        fetchCurrentUser(); // Appel de la fonction pour récupérer les informations de l'utilisateur
    }, []);

    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/trip`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrips(response.data);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const fetchCurrentUser = async () => { // Fonction pour récupérer les informations de l'utilisateur
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCurrentUser(response.data); // Définition de currentUser avec les informations de l'utilisateur
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleAddPassenger = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const confirmAdd = window.confirm('Êtes-vous sûr de vouloir vous inscrire à ce trajet ?');
                if (confirmAdd) {
                    await axios.post(`${BASE_URL}/trip/add/${id}`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchTrips();
                    alert('Inscription au trajet réussie !');
                }
            }
        } catch (error) {
            console.error('Error adding passenger:', error);
            alert('Erreur lors de l\'inscription au trajet.');
        }
    };

    const handleRemovePassenger = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const confirmRemove = window.confirm('Êtes-vous sûr de vouloir vous désinscrire de ce trajet ?');
                if (confirmRemove) {
                    await axios.delete(`${BASE_URL}/trip/remove/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchTrips();
                    alert('Désinscription au trajet réussie !');
                }
            }
        } catch (error) {
            console.error('Error removing passenger:', error);
            alert('Erreur lors de la désinscription au trajet.');
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Liste des trajets</h2>
                {trips.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucune donnée</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6">
                        {trips.map((trip: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h2 className="mb-2 text-gray-900 font-medium">Trajet {trip.id}</h2>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">{trip.cityStart} &#x279C; {trip.cityArrive}, {trip.distance} kms</li>
                                        <li className="text-gray-500 text-sm">Le {trip.tripDate}</li>
                                    </ul>
                                    <div className="mt-3">
                                        {currentUser && trip.userDrive.id !== currentUser.id && (
                                            <button
                                                className="mr-2 px-3 py-1 border rounded-md bg-indigo-600 text-white hover:bg-blue-600"
                                                onClick={() => handleAddPassenger(trip.id)}>
                                                S'inscrire
                                            </button>
                                        )}
                                        {currentUser && trip.userDrive.id !== currentUser.id && (
                                            <button
                                                className="px-3 py-1 border rounded-md bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => handleRemovePassenger(trip.id)}>
                                                Se désinscrire
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
