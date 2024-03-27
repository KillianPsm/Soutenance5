import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {apiGet, apiPost, apiDelete} from '../api';
import {Trip} from "../utils/interfaces.tsx";

const TripDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        fetchTripDetails();
    }, []);

    const fetchTripDetails = async () => {
        try {
            const data = await apiGet(`/trip/${id}`);
            setTrip(data);
        } catch (error) {
            console.error('Error fetching trip details:', error);
        }
    };

    const handleAddPassenger = async () => {
        try {
            const confirmAdd = window.confirm('Êtes-vous sûr de vouloir vous inscrire à ce trajet ?');
            if (confirmAdd) {
                await apiPost(`/trip/add/${id}`, null, {});
                fetchTripDetails();
                alert('Inscription au trajet réussie !');
            }
        } catch (error) {
            console.error('Error adding passenger:', error);
            alert('Erreur lors de l\'inscription au trajet.');
        }
    };

    const handleRemovePassenger = async () => {
        try {
            const confirmRemove = window.confirm('Êtes-vous sûr de vouloir vous désinscrire de ce trajet ?');
            if (confirmRemove) {
                await apiDelete(`/trip/remove/${id}`);
                fetchTripDetails();
                alert('Désinscription au trajet réussie !');
            }
        } catch (error) {
            console.error('Error removing passenger:', error);
            alert('Erreur lors de la désinscription au trajet.');
        }
    };

    return (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg max-w-2xl mx-auto">
            {trip ? (
                <div>
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Trajet {trip.id}</h2>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Places restantes</div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trip.place}</div>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Distance</div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trip.distance} kms</div>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Date du trajet</div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trip.tripDate}</div>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Ville de départ</div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trip.cityStart}</div>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Ville d'arrivée</div>
                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{trip.cityArrive}</div>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <div className="text-sm font-medium text-gray-500">Conducteur</div>
                            <div
                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {trip.userDrive.lastName} {trip.userDrive.firstName}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        {trip.place > 0 ? (
                            <button
                                className="mr-2 px-3 py-1 border rounded-md bg-indigo-600 text-white hover:bg-blue-600"
                                onClick={handleAddPassenger}>
                                S'inscrire
                            </button>
                        ) : (
                            <button
                                className="mr-2 px-3 py-1 border rounded-md bg-gray-400 text-white"
                                disabled>
                                Complet
                            </button>
                        )}
                        <button
                            className="px-3 py-1 border rounded-md bg-red-500 text-white hover:bg-red-600"
                            onClick={handleRemovePassenger}>
                            Se désinscrire
                        </button>
                    </div>
                </div>
            ) : (
                <p className="px-4 py-5 sm:px-6">Chargement...</p>
            )}
        </div>
    );
};

export default TripDetails;