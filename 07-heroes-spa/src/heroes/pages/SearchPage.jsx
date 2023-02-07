import {HeroCard} from '../components';
import {useForm} from '../../hooks/useForm';
import {useLocation, useNavigate} from 'react-router-dom';
import {getHeroesByName} from '../helpers';

export const SearchPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const {q = ''} = Object.fromEntries(searchParams.entries());

    const heroes = getHeroesByName(q);

    const { searchText, handleInputChange } = useForm({
        searchText: q
    });

    const handleSearchSubmit = (ev) => {
        ev.preventDefault();
        navigate(`?q=${ searchText }`);
    };

    return (
        <>
            <h1>Search</h1>
            <hr/>

            <div className="row">


                <div className="col-5">
                    <h4>Searching</h4>
                    <hr/>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-outline-primary mt-2">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '')
                            ? (
                                <div className="alert alert-primary animate__animated animate__fadeIn">
                                    Search a hero
                                </div>
                            )
                            : (heroes.length === 0) && (
                            <div className="alert alert-danger animate__animated animate__fadeIn">
                                No hero with <b>{q}</b>
                            </div>
                        )
                    }


                    {
                        heroes.map( hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }

                </div>
            </div>

        </>
    );
};