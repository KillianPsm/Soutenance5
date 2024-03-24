import React, {useEffect} from 'react';
import axios from 'axios';
import TripForm from '../components/TripForm';

const BASE_URL = 'http://127.0.0.1:8000/api';

const AddTrip: React.FC = () => {
    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BASE_URL}/trip`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Handle the response data as needed
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const handleAddTrip = async () => {
        // Handle trip addition logic here
        try {
            fetchTrips(); // Fetch updated trips after adding a new trip
        } catch (error) {
            console.error('Error adding trip:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">Ajouter un nouveau trajet</h2>
                <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
                    <TripForm onAddTrip={handleAddTrip}/>
                </div>
            </div>
        </div>
    );
};

export default AddTrip;