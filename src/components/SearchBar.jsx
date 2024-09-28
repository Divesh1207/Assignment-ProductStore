
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetProducts } from '../redux/productSlice';

const SearchBar = ({ setSearchTerm }) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {
        
        const timer = setTimeout(() => {
            if (debouncedSearch) {
                setSearchTerm(debouncedSearch);
            }
        }, 500); 

        
        return () => clearTimeout(timer);
    }, [debouncedSearch, setSearchTerm]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value); 
        setDebouncedSearch(value); 
        dispatch(resetProducts());
    };

    const handleSearchSubmit = () => {
        if (search) {
            setSearchTerm(search); 
            setSearch(''); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(); 
        }
    };

    return (
        <div className="flex items-center justify-center mb-6">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="border-2 border-blue-400 p-3 w-full max-w-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 mr-4"
            />
            <button
                onClick={handleSearchSubmit}
                className="bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
