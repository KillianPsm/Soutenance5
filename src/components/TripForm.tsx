import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Select from "react-select";
import {City} from "../utils/interfaces.tsx";

const BASE_URL = 'http://127.0.0.1:8000/api';

interface SelectOption {
    value: string;
    label: string;
}

const TripForm: React.FC<{
    onAddTrip: (tripData: {
        distance: string;
        tripDate: string;
        cityStartId: string;
        cityArriveId: string;
    }) => void;
}> = ({onAddTrip}) => {
    const [distance, setDistance] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [cityStartId, setCityStartId] = useState<SelectOption | null>(null);
    const [cityArriveId, setCityArriveId] = useState<SelectOption | null>(null);
    const [cities, setCities] = useState<City[]>([]);

    const cityOptions = cities.map((city: City) => ({
        value: city.id.toString(),
        label: `${city.cityName} (${city.zipcode})` // Incluez le code postal dans le label
    }));

    const handleCityStartChange = (selectedOption: SelectOption | null) => {
        setCityStartId(selectedOption);
    };

    const handleCityArriveChange = (selectedOption: SelectOption | null) => {
        setCityArriveId(selectedOption);
    };

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/city`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCities(response.data);
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError('Error fetching cities');
            console.error('Error fetching cities:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token && cityStartId && cityArriveId) {
                await axios.post(
                    `${BASE_URL}/trip/new/${distance}/${tripDate}/${cityStartId.value}/${cityArriveId.value}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                onAddTrip({distance, tripDate, cityStartId: cityStartId.value, cityArriveId: cityArriveId.value});
                setDistance('');
                setTripDate('');
                setCityStartId(null);
                setCityArriveId(null);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setSuccess('Trip successfully added');
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError('Error adding trip');
            console.error('Error adding trip:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select
                options={cityOptions}
                onChange={handleCityStartChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Sélectionnez la ville de départ"
                isSearchable={true}
                required={true}
                value={cityStartId}
            />
            <Select
                options={cityOptions}
                onChange={handleCityArriveChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Sélectionnez la ville d'arrivée"
                isSearchable={true}
                required={true}
                value={cityArriveId}
            />
            <input
                type="datetime-local"
                placeholder="Date du trajet"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required={true}
            />
            <input
                type="text"
                placeholder="Distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required={true}
            />
            <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Ajouter un trajet</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    );
};

export default TripForm;