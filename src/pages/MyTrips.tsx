import React, {useEffect, useState} from 'react';
import {getToken, apiGet, apiDelete} from "../api.ts";

const MyTrips: React.FC = () => {
    const [trips, setTrips] = useState<any[]>([]);
    const [pTrips, setPTrips] = useState<any[]>([]);

    useEffect(() => {
        fetchDrivingTrips();
        fetchParticipatingTrips();
    }, []);

    const fetchDrivingTrips = async () => {
        try {
            const data = await apiGet('/user/drives');
            setTrips(data);
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
    };

    const fetchParticipatingTrips = async () => {
        try {
            const data = await apiGet('/user/participates');
            setPTrips(data);
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
    };

    const handleDeleteTrip = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Voulez vous vraiment supprimer ce trajet ?');
            if (confirmDelete) {
                await apiDelete(`/trip/delete/${id}`);
                fetchDrivingTrips();
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Mes trajets</h2>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Conducteur</h3>
                {trips.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucun trajet trouvé</p>
                ) : (
                    <ul className="mt-4 mb-8 grid grid-cols-1 gap-6">
                        {trips.map((trip: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h2 className="mb-2 text-gray-900 font-medium">Trajet {trip.id}</h2>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">{trip.cityStart} &#x279C; {trip.cityArrive}, {trip.distance} kms</li>
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
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Passager</h3>
                {pTrips.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucun trajet trouvé</p>
                ) : (
                    <ul className="my-4 grid grid-cols-1 gap-6">
                        {pTrips.map((trip: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h2 className="mb-2 text-gray-900 font-medium">Trajet {trip.id}</h2>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">{trip.cityStart} &#x279C; {trip.cityArrive}, {trip.distance} kms</li>
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

export default MyTrips;
