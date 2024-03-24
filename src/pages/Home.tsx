import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const Home: React.FC = () => {
    const [trips, setTrips] = useState<never[]>([]);

    useEffect(() => {
        fetchTrips();
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
                                    <h3 className="mb-2 text-gray-900 text-sm font-medium">Trajet {trip.id}</h3>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">De {trip.cityStart} à {trip.cityArrive}</li>
                                        <li className="text-gray-500 text-sm">{trip.distance} kms</li>
                                        <li className="text-gray-500 text-sm">Le {trip.tripDate}</li>
                                    </ul>
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
