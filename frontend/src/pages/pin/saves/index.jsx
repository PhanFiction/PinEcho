import React, { useEffect, useState } from "react";
import '../../../styles/globals.css';
import Layout from "../../../components/Layout";
import ImageGrid from "../../../components/ImageGrid/ImageGrid";
import { getSavedPins } from "../../../service/pinService";

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedItems = ({ userId }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the list of all items
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items'); // Replace with your actual endpoint
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Fetch the user's saved items
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/saves`);
        setSavedItems(response.data);
      } catch (error) {
        console.error('Error fetching saved items:', error);
      }
    };

    fetchItems();
    fetchSavedItems();
  }, [userId]);

  // Function to check if an item is saved
  const isItemSaved = itemId => savedItems.includes(itemId);

  return (
    <div>
      <h2>Saved Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            {isItemSaved(item._id) ? <span> (Saved)</span> : <button onClick={() => saveItem(item._id)}>Save</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedItems; */

const Saves = () => {
  const [savedPins, setSavedPins] = useState([]);
  const [pinId, setPinId] = useState('');

  useEffect(() => {
    const fetchSinglePin = async () => {
      const req = await getSavedPins();
      setSavedPins(req.saves);
    }
    fetchSinglePin();
  }, []);

  return (
    <Layout>
      {
        savedPins?.length < 1 ? (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl">Empty Saves</h1>
          </div>
        )
        :
        (
          <ImageGrid initialImages={savedPins} additionalImages={savedPins} setPinId={setPinId}/>
        )
      }
    </Layout>
  )
};

export default Saves;