import { useState, useEffect } from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import { getAllPins } from '../service/pinService';
import Layout from '../components/Layout';

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
        data.length < 1 ? (
          <h1></h1>
        )
        : 
        (
          <ImageGrid initialImages={data}/>
        )
      }
    </Layout>
  )
};

export default Home;