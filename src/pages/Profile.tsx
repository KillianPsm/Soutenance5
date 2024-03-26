import React, {useEffect, useState} from 'react';
import CarForm from "../components/CarForm.tsx";
import {apiGet, apiPost, apiDelete} from '../api';
import {Brand} from "../utils/interfaces.tsx";

const Profile: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [hasCar, setHasCar] = useState<boolean | null>(null);

    const fetchBrands = async () => {
        try {
            const data = await apiGet('/brand');
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const userData = await apiGet('/user/select');
            setUser(userData);

            if (userData && userData.id) {
                const carData = await apiGet(`/user/car`);
                setHasCar(carData !== null && carData !== undefined && carData.id !== undefined);

                if (carData && carData.id) {
                    setUser((prevState: any) => ({
                        ...prevState,
                        car: carData
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchBrands();
    }, []);

    useEffect(() => {
        console.log(hasCar);
    }, [hasCar]);

    const handleAddCar = async (carData: {
        carName: string;
        place: string;
        matriculation: string;
        brandId: string;
    }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await apiPost(`/car/new/${carData.carName}/${carData.place}/${carData.matriculation}/${carData.brandId}`); // Assurez-vous que l'URL de l'API est correcte
            fetchUserProfile(); // Récupérez le profil de l'utilisateur après l'ajout d'une voiture
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleDeleteCar = async () => {
        try {
            const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');
            if (confirmDelete) {
                await apiDelete(`/car/delete/${user.car.id}`);
                fetchUserProfile();
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <>
            <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Profil Utilisateur</h2>
            <div className="flex flex-col md:flex-row justify-center gap-20">
                <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                    {user ? (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Vos informations</h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <ul>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Nom</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.lastName}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Prénom</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.firstName}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Pseudo</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.account.login}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Téléphone</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Mail</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.mail}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Ville</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.city.name}</span>
                                    </li>
                                    <li className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <span className="text-sm font-medium text-gray-500">Code Postal</span>
                                        <span
                                            className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.city.zipcode}</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    ) : (
                        <p className="mt-2 text-center text-sm text-gray-600">Chargement en cours...</p>
                    )}
                </div>
                {hasCar && user.car && user.car.brand && (
                    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Votre voiture</h3>
                            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-3">
                                        <h3 className="mb-2 text-gray-900 text-sm font-medium">{user.car.matriculation}</h3>
                                        <ul className="mt-1 flex-grow flex flex-col justify-between">
                                            <li className="text-gray-500 text-sm">{user.car.model}</li>
                                            <li className="text-gray-500 text-sm">{user.car.user.lastName}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <button
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            type="button"
                                            onClick={() => handleDeleteCar(user.car.id)}>
                                            Supprimer
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {!hasCar && (
                    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter une voiture</h3>
                                </div>
                                <div className="border-t border-gray-200">
                                    <CarForm onAddCar={handleAddCar} brands={brands}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;