import React, {useEffect, useState} from 'react';
import BrandForm from "../components/BrandForm.tsx";
import {apiGet, apiPost, apiDelete} from '../api';
import {Brand} from "../utils/interfaces.tsx";

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const data = await apiGet('/brand');
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleAddBrand = async (brandName: string) => {
        try {
            await apiPost(`/brand/new/${brandName}`, null, {});
            fetchBrands();
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    const handleDeleteBrand = async (id: string) => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette marque ?');
            if (confirmDelete) {
                await apiDelete(`/brand/delete/${id}`);
                fetchBrands();
            }
        } catch (error) {
            console.error('Error deleting car:', error);
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
                        {brands.map((brand: Brand, index: number) => (
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
