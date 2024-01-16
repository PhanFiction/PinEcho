import { useState, useEffect } from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import { getAllPins } from '../service/pinService';
import { useRouter } from 'next/router';
import { fetchCredentials } from '../utils/auth';

const Home = () => {
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = fetchCredentials();
    if (!loggedIn) {
      router.push('/landing');
    }

    const fetchPosts = async () => {
      const req = await getAllPins();
      setData(req.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      {
        data?.length < 1 ? (
          <h1></h1>
        )
        : 
        (
          <ImageGrid initialImages={data}/>
        )
      }
    </>
  )
};

export default Home;