

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetProducts } from '../redux/productSlice';
import Spinner from './Spinner'; 

const ProductList = ({ searchTerm }) => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const [batchSize] = useState(10); 
    const [currentBatch, setCurrentBatch] = useState(1); 

    useEffect(() => {
        dispatch(resetProducts());
        setCurrentBatch(1);
        dispatch(fetchProducts({ category: selectedCategory, page: currentBatch, search: searchTerm }));
    }, [selectedCategory, searchTerm, dispatch]);

    
    const loadMoreProducts = () => {
        const nextBatch = currentBatch + 1;
        setCurrentBatch(nextBatch);
        dispatch(fetchProducts({ category: selectedCategory, page: nextBatch, search: searchTerm }));
    };

    return (
        <div className="container mx-auto p-4">
           
            <div className="grid font-serif grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl"
                            style={{ animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s` }} // Staggered fade-in animation
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                {product.description.substring(0, 60)}...
                            </p>
                            <p className="text-xl font-bold text-blue-500 mb-1">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className={`text-sm font-semibold mb-3 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <p className="text-yellow-500 font-semibold">
                                Rating: {product.rating} ★
                            </p>
                        </div>
                    ))
                ) : (
                    status !== 'loading' && (
                        <div className="col-span-full flex justify-center items-center h-64">
                            <p className="text-2xl font-bold text-white text-center">
                                No products found
                            </p>
                        </div>
                    )
                )}
            </div>

           
            {status === 'loading' && <Spinner />}

           
            {products.length > 0 && status !== 'loading' && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={loadMoreProducts}
                        className="bg-blue-500 text-white px-4 py-2 font-mono rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none"
                    >
                        Load More Products
                    </button>
                </div>
            )}

        
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductList;


