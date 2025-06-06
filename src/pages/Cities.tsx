import React, {useEffect, useState} from 'react';
import CityForm from '../components/CityForm';
import {apiGet, apiPost, apiDelete} from '../api';
import {City} from "../utils/interfaces.tsx";

const Cities: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const data = await apiGet('/city');
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleAddCity = async (cityData: { cityName: string; zipcode: string }) => {
        try {
            await apiPost(`/city/new/${cityData.cityName}/${cityData.zipcode}`, null, {});
            fetchCities();
        } catch (error) {
            console.error('Error adding city:', error);
        }
    };

    const handleDeleteCity = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette ville ?');
            if (confirmDelete) {
                await apiDelete(`/city/delete/${id}`);
                fetchCities(); // Mettre à jour la liste des villes après la suppression
            }
        } catch (error) {
            console.error('Error deleting city:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Liste des villes</h2>
                <CityForm onAddCity={handleAddCity}/>
                {cities.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucune donnée</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cities.map((city: City, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h3 className="mb-2 text-gray-900 text-sm font-medium">{city.cityName}</h3>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">{city.zipcode}</li>
                                    </ul>
                                </div>
                                <div>
                                    <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        type="button"
                                        onClick={() => handleDeleteCity(city.id)}>
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

export default Cities;
