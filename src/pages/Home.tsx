import React, {useEffect, useState} from 'react';
import {apiGet} from '../api';
import {Trip} from "../utils/interfaces.tsx";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const data = await apiGet('/trip');
            setTrips(data);
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
                        {trips.map((trip: Trip, index: number) => (
                            <Link key={index} to={`/trip/${trip.id}`}>
                                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-3">
                                        <h2 className="mb-2 text-gray-900 font-medium">Trajet {trip.id}</h2>
                                        <ul className="mt-1 flex-grow flex flex-col justify-between">
                                            <li className="text-gray-500 text-sm">{trip.cityStart} &#x279C; {trip.cityArrive}, {trip.distance} kms</li>
                                            <li className="text-gray-500 text-sm">Le {trip.tripDate}</li>
                                        </ul>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
