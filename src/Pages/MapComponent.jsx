import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapComponent() {
  return (
    <LoadScript
      googleMapsApiKey="YOUR_API_KEY" // replace with your API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14596.90107406525!2d90.3654296!3d23.84613325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1698050471538!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
