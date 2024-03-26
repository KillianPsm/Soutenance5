export interface Account {
    id: number;
    login: string;
}

export interface User {
    id: number;
    lastName: string;
    firstName: string;
    phone: string;
    mail: string;
    account: Account;
    city: City;
    Trips: Trip[];
}

export interface Car {
    id: number;
    matriculation: string;
    model: string;
    place: number;
    user: User;
    brand: Brand;
}

export interface Trip {
    id: number;
    distance: number;
    tripDate: string;
    cityStart: string;
    cityArrive: string;
    userDrive: User;
    userPassengers: User[];
    places: number;
}

export interface City {
    id: number;
    cityName: string;
    zipcode: string;
}

export interface Brand {
    id: string;
    brandName: string;
}