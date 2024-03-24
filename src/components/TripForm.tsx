import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

interface City {
    id: number;
    cityName: string;
    // Add other city properties here
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
    const [cityStartId, setCityStartId] = useState('');
    const [cityArriveId, setCityArriveId] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [cityStartOptions, setCityStartOptions] = useState<JSX.Element[]>([]);
    const [cityArriveOptions, setCityArriveOptions] = useState<JSX.Element[]>([]);
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
                const cityOptions = response.data.map((city: any) => (
                    <option key={city.id} value={city.id}>
                        {city.cityName}
                    </option>
                ));
                setCityStartOptions(cityOptions);
                setCityArriveOptions(cityOptions);
            }
        } catch (error) {
            setError('Error fetching cities');
            console.error('Error fetching cities:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(
                    `${BASE_URL}/trip/new/${distance}/${tripDate}/${cityStartId}/${cityArriveId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                onAddTrip({distance, tripDate, cityStartId, cityArriveId});
                setDistance('');
                setTripDate('');
                setCityStartId('');
                setCityArriveId('');
                setSuccess('Trip successfully added');
            }
        } catch (error) {
            setError('Error adding trip');
            console.error('Error adding trip:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="datetime-local"
                placeholder="Date du trajet"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <select value={cityStartId} onChange={(e) => setCityStartId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded">
                <option value="">Sélectionnez la ville de départ</option>
                {cityStartOptions}
            </select>
            <select value={cityArriveId} onChange={(e) => setCityArriveId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded">
                <option value="">Sélectionnez la ville d'arrivée</option>
                {cityArriveOptions}
            </select>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Ajouter un trajet</button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    );
};

export default TripForm;