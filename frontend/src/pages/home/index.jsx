"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/globals.css';
import Layout from '../../components/Layout';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import { getAllPins } from '../../service/pinService';

const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const req = await getAllPins();
      setData(req.data);
    }
    fetchPosts();
  }, []);

  return (
    <Layout>
      {
        data?.length < 1 ? (
          <h1>Empty</h1>
        )
        : 
        (
          <ImageGrid initialImages={data} additionalImages={data}/>
        )
      }
    </Layout>
  )
};

export default Home;