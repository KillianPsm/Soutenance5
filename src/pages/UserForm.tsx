import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {apiGet} from '../api';
import Select from "react-select";
import {City} from "../utils/interfaces.tsx";

interface SelectOption {
    value: string;
    label: string;
}

const UserForm: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [cityId, setCityId] = useState<SelectOption | null>(null);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const cityOptions = cities.map((city: City) => ({
        value: city.id.toString(),
        label: city.cityName
    }));

    const handleCityChange = (selectedOption: SelectOption | null) => {
        setCityId(selectedOption);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token && cityId) {
                const userData = {
                    lastName: lastName,
                    firstName: firstName,
                    phone: phone,
                    mail: mail,
                    cityId: cityId.value
                };
                await axios.post(
                    `http://127.0.0.1:8000/api/user/new/${userData.lastName}/${userData.firstName}/${userData.phone}/${userData.mail}/${userData.cityId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Profil utilisateur créé avec succès');
                navigate('/profile');
            }
        } catch (error) {
            setError('Erreur lors de la création du profil utilisateur. Veuillez réessayer.');
            console.error('Erreur lors de la création du profil utilisateur:', error);
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            const response = await apiGet('/city');
            setCities(response);
        };
        fetchCities();
    }, []);

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">Création du profil</h2>
                {error && <div className="mt-2 text-center text-sm text-red-600">{error}</div>}
            </div>
            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <label className="block">
                            Nom:
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </label>
                        <label className="block">
                            Prénom:
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </label>
                        <label className="block">
                            Téléphone:
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </label>
                        <label className="block">
                            Email:
                            <input type="email" value={mail} onChange={e => setMail(e.target.value)}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        </label>
                        <div>
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
                        </div>
                        <div className="flex flex-col">
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Créer le profil
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;