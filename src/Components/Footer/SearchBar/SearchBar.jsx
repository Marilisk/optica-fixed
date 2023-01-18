import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults, fetchSearch } from '../../../redux/productsSlice';
import c from './SearchBar.module.scss';
import useDebounce from '../../common/useDebounce.jsx';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';



export const SearchBar = () => {
    const dispatch = useDispatch();
    const [touched, setTouched] = useState(false);
    const searchResult = useSelector(s => s.products.searchResult);

    const results = searchResult.items;
    const noResults = !results.length && touched;

    const [query, setQueryValue] = useState('');

    const onSearchChange = (value) => {
        setQueryValue(value);
        if (!touched) setTouched(true);
        if (!value) {
            dispatch(clearSearchResults())
        }
    }

    const debouncedSearch = useDebounce(query, 600);
    useEffect(() => {
        if (debouncedSearch) {
            dispatch(fetchSearch(debouncedSearch));
        }
    }, [debouncedSearch])

    const onExit = () => {
        setTouched(false);
        setQueryValue('');
    }

    return <div className={c.searchBar} /* onClick={} */>
        <div className={c.searchIcon}></div>
        <h3>Поиск</h3>


        <input value={query}
            onChange={(e) => onSearchChange(e.target.value)} />
        <NavLink to={`/search`}>
            <button type='button' onClick={() => onExit()}>
                найти
            </button>
        </NavLink>

        {Boolean(results.length && searchResult.status === 'loaded' && touched) &&
            <div className={c.hints}>
                {results.map(obj => {
                    return <NavLink to={`/product/${obj._id}`}>
                        <div key={obj.name} className={c.hintsBox} onClick={() => {
                            dispatch(clearSearchResults());
                            onExit();
                        }}>

                            <h3>{obj.name}</h3>
                            <img alt='' src={`http://localhost:4444${obj.imageUrl.main}`} />

                        </div>
                    </NavLink>

                })}
            </div>}

        {Boolean(noResults) && <div>Ничего не нашлось...</div>}

    </div>

}
