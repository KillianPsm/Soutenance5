import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
                if (token) {
                    const response = await axios.get(`${BASE_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${token}` // Inclure le token JWT dans l'en-tête Authorization
                        }
                    });
                    setUsers(response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            {users.length === 0 ? (
                <p>Aucune donnée</p>
            ) : (
                <ul>
                    {users.map((user: any, index: number) => (
                        <li key={index} className="border-2">
                            <p>Nom: {user.lastName}</p>
                            <p>Prénom: {user.firstName}</p>
                            <p>Téléphone: {user.phone}</p>
                            <p>Mail: {user.mail}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
