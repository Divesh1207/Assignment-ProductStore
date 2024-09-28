import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
    );
};

export default Spinner;
