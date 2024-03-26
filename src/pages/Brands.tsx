import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BrandForm from "../components/BrandForm.tsx";

const BASE_URL = 'http://127.0.0.1:8000/api';

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<any[]>([]);

    useEffect(() => {
        fetchBrands();
    }, []);

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

    const handleAddBrand = async (brandName: string) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(
                    `${BASE_URL}/brand/new/${brandName}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                fetchBrands();
            }
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    const handleDeleteBrand = async (id: number) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette marque ?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.delete(`${BASE_URL}/brand/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchBrands();
                }
            }
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Liste des marques</h2>
                <BrandForm onAddBrand={handleAddBrand}/>
                {brands.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucune donnée</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {brands.map((brand: any, index: number) => (
                            <li key={index}
                                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="flex-1 flex flex-col p-3">
                                    <h3 className="text-gray-900 text-sm font-medium">{brand.brandName}</h3>
                                </div>
                                <div>
                                    <button
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        type="button"
                                        onClick={() => handleDeleteBrand(brand.id)}>
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

export default Brands;
