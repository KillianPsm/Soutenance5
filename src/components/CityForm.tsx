import React, {useState} from 'react';

const CityForm: React.FC<{
    onAddCity: (cityData: { cityName: string; zipcode: string }) => void;
}> = ({onAddCity}) => {
    const [cityName, setCityName] = useState('');
    const [zipcode, setZipcode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cityName || !zipcode) {
            console.error('Veuillez remplir tous les champs.');
            return;
        }
        onAddCity({cityName, zipcode});
        setCityName('');
        setZipcode('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="cityName" className="text-sm font-medium text-gray-700">Nom de la ville</label>
                <input
                    id="cityName"
                    type="text"
                    placeholder="Nom"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="zipcode" className="text-sm font-medium text-gray-700">Code postal</label>
                <input
                    id="zipcode"
                    type="text"
                    placeholder="Code postal"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Ajouter
            </button>
        </form>
    );
};

export default CityForm;
