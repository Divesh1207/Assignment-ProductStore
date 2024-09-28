
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, setSelectedCategory, selectCategories } from '../redux/categorySlice';
import { resetProducts } from '../redux/productSlice'; 
import { FaListUl } from 'react-icons/fa'; 

const CategorySelector = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);  

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setSelectedCategory(selectedCategory));  
        dispatch(resetProducts());  
    };

    return (
        <div className="mt-4">
            <div className="relative">
                <select
                    onChange={handleCategoryChange}
                    defaultValue=""
                    className="block appearance-none w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaListUl className="text-gray-600" />
                </div>
            </div>
        </div>
    );
};

export default CategorySelector;

