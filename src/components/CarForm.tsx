import React, {useState} from "react";
import Select from "react-select";
import {apiPost} from "../api"; // Importez apiPost de api.ts

interface Brand {
    id: string;
    brandName: string;
}

interface SelectOption {
    value: string;
    label: string;
}

const CarForm: React.FC<{
    onAddCar: (carData: { carName: string; place: string; matriculation: string; brandId: string }) => void;
    brands: Brand[];
}> = ({onAddCar, brands}) => {
    const [carName, setCarName] = useState('');
    const [place, setPlace] = useState('');
    const [matriculation, setMatriculation] = useState('');
    const [brandId, setBrandId] = useState<SelectOption | null>(null);

    const brandOptions = brands.map((brand: Brand) => ({
        value: brand.id,
        label: brand.brandName
    }));

    const handleBrandChange = (selectedOption: SelectOption | null) => {
        setBrandId(selectedOption);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!carName || !place || !matriculation || !brandId) {
            console.error('Veuillez remplir tous les champs.');
            return;
        }
        const carData = {
            carName,
            place, // laissez 'place' en tant que chaîne
            matriculation,
            brandId: brandId.value
        };
        const response = await apiPost(`/car/new/${carData.carName}/${carData.place}/${carData.matriculation}/${carData.brandId}`, null, null);
        if (response) {
            onAddCar(carData);
            setCarName('');
            setPlace('');
            setMatriculation('');
            setBrandId(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-1 text-center">
            <input
                id="carName"
                type="text"
                placeholder="Modèle"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="px-4 py-1 mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required={true}
            />
            <input
                id="place"
                type="text"
                placeholder="Nombre de places"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="px-4 py-1 mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required={true}
            />
            <input
                id="matriculation"
                type="text"
                placeholder="Immatriculation"
                value={matriculation}
                onChange={(e) => setMatriculation(e.target.value)}
                className="px-4 py-1 mt-1 h-8 ps-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required={true}
            />
            <Select
                options={brandOptions}
                onChange={handleBrandChange}
                className="text-start w-full p-2 border border-gray-300 rounded"
                placeholder="Sélectionnez une marque"
                isSearchable={true}
                required={true}
                value={brandId}
            />
            <button
                type="submit"
                className="my-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Ajouter
            </button>
        </form>
    );
};

export default CarForm;
