import React, {useEffect, useState} from 'react';
import CarForm from "../components/CarForm.tsx";
import {apiDelete, apiGet, apiPost, apiPut} from '../api';
import {Brand, City, User} from "../utils/interfaces.tsx";
import Select from "react-select";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface SelectOption {
    value: string;
    label: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [hasCar, setHasCar] = useState<boolean | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [cityId, setCityId] = useState<SelectOption | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        lastName: user?.lastName || '',
        firstName: user?.firstName || '',
        phone: user?.phone || '',
        mail: user?.mail || '',
        cityId: user?.city?.id || '',
    });

    useEffect(() => {
        fetchCities();
        fetchUserProfile();
        fetchBrands();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await apiGet('/city');
            setCities(response);
        } catch (error) {
            console.error('Error fetching cities:', error);
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

    const fetchBrands = async () => {
        try {
            const data = await apiGet('/brand');
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateUser = async (event: React.FormEvent) => {
        event.preventDefault();

        // Vérifiez si tous les champs sont remplis
        if (!updateForm.lastName || !updateForm.firstName || !updateForm.phone || !updateForm.mail || !cityId) {
            alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
            return;
        }

        try {
            await apiPut(`/user/update/${updateForm.lastName}/${updateForm.firstName}/${updateForm.phone}/${updateForm.mail}/${cityId?.value}`, {});
            fetchUserProfile();
            closeModal();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

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
                if (user && user.car) {
                    await apiDelete(`/car/delete/${user.car.id}`);
                    fetchUserProfile();
                }
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const cityOptions = cities.map((city: City) => ({
        value: city.id.toString(),
        label: city.cityName
    }));

    const handleCityChange = (selectedOption: SelectOption | null) => {
        setCityId(selectedOption);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateForm({
            ...updateForm,
            [event.target.name]: event.target.value
        });
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
                            <button onClick={openModal}
                                    className="mt-4 w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Modifier
                                informations
                            </button>
                        </div>
                    ) : (
                        <p className="mt-2 text-center text-sm text-gray-600">Chargement en cours...</p>
                    )}
                </div>
                {user && user.car && user.car.brand && (
                    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Votre voiture</h3>
                                </div>
                                <div className="border-t border-gray-200">
                                    <ul className="grid grid-cols-1 gap-6">
                                        <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                            <div className="flex-1 flex flex-col p-3">
                                                <h3 className="mb-2 text-gray-900 text-sm font-medium">{user.car.matriculation}</h3>
                                                <ul className="mt-1 flex-grow flex flex-col justify-between">
                                                    <li className="text-gray-500 text-sm">{user.car.brand.name}</li>
                                                    <li className="text-gray-500 text-sm">{user.car.model}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <button
                                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-b-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    type="button"
                                                    onClick={handleDeleteCar}>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modifier informations"
                className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Modifier mes informations</h2>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <label className="block">
                                Nom:
                                <input type="text" name="lastName" value={updateForm.lastName}
                                       onChange={handleInputChange}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </label>
                            <label className="block">
                                Prénom:
                                <input type="text" name="firstName" value={updateForm.firstName}
                                       onChange={handleInputChange}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </label>
                            <label className="block">
                                Téléphone:
                                <input type="text" name="phone" value={updateForm.phone}
                                       onChange={handleInputChange}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </label>
                            <label className="block">
                                Email:
                                <input type="text" name="mail" value={updateForm.mail}
                                       onChange={handleInputChange}
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            </label>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville:</label>
                            <Select
                                id="city"
                                options={cityOptions}
                                onChange={handleCityChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Sélectionnez une ville"
                                isSearchable={true}
                                required={true}
                                value={cityId}
                            />
                            <button type="submit"
                                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md"
                                    onClick={handleUpdateUser}>
                                Mettre à jour
                            </button>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={closeModal}
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:ml-3 sm:w-auto sm:text-sm">
                            Fermer
                        </button>
                    </div>
                </div>
            </ReactModal>
        </>
    );
};

export default Profile;