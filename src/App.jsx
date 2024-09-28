import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Provider store={store}>
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                    <HomePage />
                </div>
            </div>
        </Provider>
    );
};

export default App;
