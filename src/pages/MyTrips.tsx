import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const MyTrips: React.FC = () => {
    const [trips, setTrips] = useState<any[]>([]);

    useEffect(() => {
        fetchUserTrips();
    }, []);

    const fetchUserTrips = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/user/trips`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrips(response.data);
            }
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
    };

    const handleDeleteTrip = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce trajet ?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete(`${BASE_URL}/trip/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchUserTrips(); // Fetch updated trips after deleting a trip
                }
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Vos trajets</h2>
                {trips.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucun trajet trouvé</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6">
                        {trips.map((trip: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h3 className="mb-2 text-gray-900 text-sm font-medium">Trajet {trip.id}</h3>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">De {trip.cityStart} à {trip.cityArrive}</li>
                                        <li className="text-gray-500 text-sm">{trip.distance} kms</li>
                                        <li className="text-gray-500 text-sm">Le {trip.tripDate}</li>
                                    </ul>
                                </div>
                                <div>
                                <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        type="button"
                                        onClick={() => handleDeleteTrip(trip.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyTrips;
