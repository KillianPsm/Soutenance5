import React, {useEffect, useState} from 'react';
import CarForm from '../components/CarForm';
import {apiGet, apiPost, apiDelete} from '../api';
import {Brand, Car} from "../utils/interfaces.tsx";

const Cars: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const fetchBrands = async () => {
        try {
            const data = await apiGet('/brand');
            setBrands(data);
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
            const data = await apiGet('/car');
            setCars(data);
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
            await apiPost(`/car/new/${carData.carName}/${carData.place}/${carData.matriculation}/${carData.brandId}`, null, {});
            fetchCars();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleDeleteCar = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');
            if (confirmDelete) {
                await apiDelete(`/car/delete/${id}`);
                fetchCars();
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
                        {cars.map((car: Car, index: number) => (
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
