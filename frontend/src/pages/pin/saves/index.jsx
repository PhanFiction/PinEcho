import { useEffect, useState } from "react";
import Layout from "../../../src/components/Layout";
import ImageGrid from "../../../src/components/ImageGrid/ImageGrid";
import { getSavedPins } from "../../../src/service/pinService";
import withAuth from "../../../src/hocs/withAuth"

const Saves = () => {
  const [savedPins, setSavedPins] = useState([]);
  const [pinId, setPinId] = useState('');

  useEffect(() => {
    const fetchSinglePin = async () => {
      const req = await getSavedPins();
      setSavedPins(req.saves);
    };
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
          <ImageGrid initialImages={savedPins} setPinId={setPinId}/>
        )
      }
    </Layout>
  )
};

export default withAuth(Saves);