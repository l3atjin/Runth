"use client";
import React from 'react'
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

export default function MapComponent() {
  const position = {lat: 37, lng: -122};

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
      <div style={{height: "100vh"}}>
        <Map center={position} zoom={10}>
          <Marker position={position} />
        </Map>
      </div>
      
    </APIProvider>
  )
}
