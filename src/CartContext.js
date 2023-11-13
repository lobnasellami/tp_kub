import React, { createContext, useState, useContext } from 'react';
import { sortArticlesByPrice, articlesFetched } from './articles';
import { ArticlesContext } from './articlesContext';
// Create the CartContext
export const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
    const { articles } = useContext(ArticlesContext);
    const data = sortArticlesByPrice(articles);
    const [cartItems, setCartItems] = useState(() => {
        const selectedItemsIds = localStorage.getItem('selectedItemsIds');
        if (selectedItemsIds) {
            const parsedIds = JSON.parse(selectedItemsIds);
            const filteredItems = data.filter(item => parsedIds.includes(item.id));
            return filteredItems;
        } else {
            return [];
        }
    });

    // Function to add an item to the cart
    const addToCart = (item) => {
        // Check if the item's id already exists in the cartItems list
        const itemExists = cartItems.some((prevItem) => prevItem.id === item.id);

        // If the item doesn't exist, add it to the cart
        if (!itemExists) {
            setCartItems((prevItems) => [...prevItems, item]);
        }
    };


    // Function to remove an item from the cart
    const removeFromCart = (item) => {
        setCartItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== item.id));
    };

    // Context value to be provided
    const cartContextValue = {
        cartItems,
        addToCart,
        removeFromCart,
    };

    // Provide the cart items and functions to descendant components
    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};