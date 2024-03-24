import React, {useState} from "react";

const BrandForm: React.FC<{ onAddBrand: (brandName: string) => void }> = ({onAddBrand}) => {
    const [brandName, setBrandName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddBrand(brandName);
        setBrandName('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="brandName" className="text-sm font-medium text-gray-700">Nom de la marque</label>
                <input
                    id="brandName"
                    type="text"
                    placeholder="Nom"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
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

export default BrandForm;