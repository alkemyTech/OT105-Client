const API_KEY = 'AIzaSyDgfYwSowXWmnmMoinPDssta_aXp-NHAKg';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({ address }) => {
  const [latitude, setLatitude] = useState(-34.55881726737178);
  const [longitude, setLongitude] = useState(-58.47476996280374);

  useEffect(async () => {
    if (address) {
      try {
        const res = await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`,
          )
          .then((res) => {
            setLatitude(res.data.results[0].geometry.location.lat);
            setLongitude(res.data.results[0].geometry.location.lng);
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
          });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  }, [address]);

  return (
    <div style={{ height: '60vh', width: '620px', padding: '20px' }}>
      <GoogleMap
        center={{
          lat: latitude,
          lng: longitude,
        }}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        zoom={15}>
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </div>
  );
};

export default Map;
