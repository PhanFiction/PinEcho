import { useState, useEffect } from 'react';
import ImageGrid from '../src/components/ImageGrid/ImageGrid';
import { getAllPins } from '../src/service/pinService';
import Layout from '../src/components/Layout';

const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const req = await getAllPins();
        setData(req.data);
      } catch (error) {
        console.log('failed', error)
      }
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