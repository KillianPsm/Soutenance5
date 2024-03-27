import React, {useEffect, useState} from 'react';
import {apiGet} from '../api';
import {Trip, City} from "../utils/interfaces.tsx";
import {Link} from "react-router-dom";
import Select from "react-select";

interface SelectOption {
    value: string;
    label: string;
}

const Home: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [tripDate, setTripDate] = useState('');
    const [cityStartId, setCityStartId] = useState<SelectOption | null>(null);
    const [cityArriveId, setCityArriveId] = useState<SelectOption | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // nouvel état

    useEffect(() => {
        fetchTrips();
        fetchCities();
    }, []);

    const fetchTrips = async () => {
        try {
            const data = await apiGet('/trip');
            setTrips(data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const fetchCities = async () => {
        try {
            const data = await apiGet('/city');
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setHasSearched(true); // mise à jour de l'état
        try {
            const data = await apiGet(`/trip/search/${tripDate}/${cityStartId?.value}/${cityArriveId?.value}`);
            if (data && typeof data === 'object' && data.constructor === Object) {
                setTrips([data]);
            } else {
                setTrips([]);
            }
        } catch (error) {
            console.error('Error searching for trip:', error);
        }
        setIsLoading(false);
    };

    const handleReset = () => {
        fetchTrips();
        setTripDate('');
        setCityStartId(null);
        setCityArriveId(null);
        setHasSearched(false);
    };

    const cityOptions = cities.map((city: City) => ({
        value: city.id.toString(),
        label: `${city.cityName} (${city.zipcode})`
    }));

    return (
        <div className="flex space-x-4 py-6 sm:px-6 lg:px-8">
            <div className="w-1/4">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Recherche de trajets</h2>
                <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                    <input type="datetime-local" value={tripDate} onChange={(e) => setTripDate(e.target.value)}
                           className="w-full p-2 border border-gray-300 rounded"
                           required/>
                    <Select
                        options={cityOptions}
                        onChange={(selectedOption) => setCityStartId(selectedOption)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Sélectionnez la ville de départ"
                        isSearchable={true}
                        value={cityStartId}
                        required
                    />
                    <Select
                        options={cityOptions}
                        onChange={(selectedOption) => setCityArriveId(selectedOption)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Sélectionnez la ville d'arrivée"
                        isSearchable={true}
                        value={cityArriveId}
                        required
                    />
                    <div className="flex space-x-4">
                        <button type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Chercher
                        </button>
                        <button type="button" onClick={handleReset}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Annuler
                            la recherche
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-3/4">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Liste des trajets</h2>
                {isLoading ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Chargement...</p>
                ) : hasSearched && trips.length === 0 ? (
                    <p className="mt-2 text-center text-sm text-gray-600">Aucun trajet trouvé</p>
                ) : (
                    <ul className="mt-8 grid grid-cols-1 gap-6">
                        {trips.map((trip: Trip, index: number) => (
                            <Link key={index} to={`/trip/${trip.id}`}>
                                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                    <div className="flex-1 flex flex-col p-3">
                                        <h2 className="text-gray-900 font-medium">{trip.cityStart} &#x279C; {trip.cityArrive}</h2>
                                        <ul className="mt-1 flex-grow flex flex-col justify-between">
                                            <li className="text-gray-500 text-sm">{trip.distance} kms</li>
                                            <li className="text-gray-500 text-sm">Le {trip.tripDate}</li>
                                        </ul>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;