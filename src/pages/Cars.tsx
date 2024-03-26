import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CarForm from '../components/CarForm';

const BASE_URL = 'http://127.0.0.1:8000/api';

const Cars: React.FC = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);

    const fetchBrands = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/brand`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBrands(response.data);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    useEffect(() => {
        const fetchAndSetBrands = async () => {
            await fetchBrands();
        };

        fetchAndSetBrands();
    }, []);

    const fetchCars = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/car`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCars(response.data);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleAddCar = async (carData: {
        carName: string;
        place: string;
        matriculation: string;
        brandId: string;
    }) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(
                    `${BASE_URL}/car/new/${carData.carName}/${carData.place}/${carData.matriculation}/${carData.brandId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                fetchCars();
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleDeleteCar = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete(`${BASE_URL}/car/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchCars();
                }
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Liste des voitures</h2>
                <CarForm onAddCar={handleAddCar} brands={brands}/>
                {cars.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucune donnée</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h3 className="mb-2 text-gray-900 text-sm font-medium">{car.matriculation}</h3>
                                    <ul className="mt-1 flex-grow flex flex-col justify-between">
                                        <li className="text-gray-500 text-sm">{car.model}</li>
                                        <li className="text-gray-500 text-sm">{car.user.lastName}</li>
                                    </ul>
                                </div>
                                <div>
                                    <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        type="button"
                                        onClick={() => handleDeleteCar(car.id)}>
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

export default Cars;
