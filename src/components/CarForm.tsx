import React, {useState} from "react";

const CarForm: React.FC<{
    onAddCar: (carData: { carName: string; place: string; matriculation: string; brandId: string }) => void;
    brands: { id: string; brandName: string }[];
}> = ({onAddCar, brands}) => {
    const [carName, setCarName] = useState('');
    const [place, setPlace] = useState('');
    const [matriculation, setMatriculation] = useState('');
    const [brandId, setBrandId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!carName || !place || !matriculation || !brandId) {
            console.error('Veuillez remplir tous les champs.');
            return;
        }
        onAddCar({carName, place, matriculation, brandId});
        setCarName('');
        setPlace('');
        setMatriculation('');
        setBrandId('');
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-1 text-center">
            <div className="flex flex-col px-4 py-1">
                <input
                    id="carName"
                    type="text"
                    placeholder="Modèle"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                    className="mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col px-4 py-1">
                <input
                    id="place"
                    type="text"
                    placeholder="Nombre de places"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col px-4 py-1">
                <input
                    id="matriculation"
                    type="text"
                    placeholder="Immatriculation"
                    value={matriculation}
                    onChange={(e) => setMatriculation(e.target.value)}
                    className="mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col px-4 py-1">
                <select
                    id="brandId"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    className="mt-1 h-10 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionnez une marque</option>
                    {brands.map((brand: any) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.brandName}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="my-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Ajouter
            </button>
        </form>
    );
};

export default CarForm;
