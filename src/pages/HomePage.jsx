import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import CategorySelector from '../components/CategorySelector';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
      
        dispatch(fetchProducts({ category: selectedCategory, page: 1, search: searchTerm }));
    }, [dispatch, searchTerm, selectedCategory]);

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">Product Store</h1>
            
            {/* Search Bar */}
            <div className="mb-4">
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>

            
            <div className="mb-4">
                <CategorySelector setSelectedCategory={setSelectedCategory} />
            </div>

            
            <div className="mt-8">
                <ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default HomePage;
