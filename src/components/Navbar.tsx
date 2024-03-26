import {Link} from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-800">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between sm:w-auto">
                        {isLoggedIn && (
                            <>
                                <Link to={"/"}
                                      className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                                    Accueil</Link>
                                <Link to={"/add-trip"}
                                      className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                                    Ajouter un trajet</Link>
                                <Link to={"/my-trips"}
                                      className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                                    Mes trajets</Link>
                            </>
                        )}
                    </div>
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link to={"/login"}
                                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Login</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile"
                                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                        <i className="fas fa-user text-lg leading-lg text-white opacity-75"></i><span
                                        className="ml-2">Profil</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                        href="#"
                                        onClick={handleLogout}
                                    >
                                        <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span
                                        className="ml-2">Déconnexion</span>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;