"use client";
import React, { useCallback, useEffect, useState } from 'react'
import {APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

export default function MapComponent() {
  const position = {lat: 37.773972, lng: -122.431297};
  const map = useMap();
  const geocodingLibrary = useMapsLibrary('geocoding');

  const mapOptions = {
    zoom: 13,
    center: position,
    mapId: process.env.NEXT_PUBLIC_MAP_ID
  };

  useEffect( () => {
    if (map) {
      if (!map.getMapCapabilities().isDataDrivenStylingAvailable) return;
      const featureLayer = map.getFeatureLayer("POSTAL_CODE")
      const featureStyleOptions = {
        strokeColor: "#810FCB",
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: "#810FCB",
        fillOpacity: 0.5,
      };
      const geocoder = new geocodingLibrary.Geocoder();

      featureLayer.style = ( options ) => {
        const placeId = options.feature.placeId;
        let zipCode = "";

        geocoder
          .geocode({ placeId: placeId })
          .then(({ results }) => {
            if (results[0]) {
              const address = results[0].formatted_address;
              const zipRegex = /\b\d{5}\b/;
              const zipCodeMatch = address.match(zipRegex);

              // Check if ZIP code was found
              if (zipCodeMatch) {
                zipCode = zipCodeMatch[0];
                console.log("ZIP code:", zipCode);
              } else {
                console.log("ZIP code not found.");
              }
            } else {
              console.log("No results found");
            }
          })
          .catch((e) => console.log("address not found"));
        
        return 
      };
      
    }
    
  }, [map])

  return (
    <div style={{height: "70vh"}}>
      <Map {...mapOptions} >
        <Marker position={position} />
      </Map>
    </div>
  )
}

function addZoneLayer(map) {
  if (!map.getMapCapabilities().isDataDrivenStylingAvailable) return;
  const featureLayer = map.getFeatureLayer("POSTAL_CODE")
  console.log("FEATURE LAYER IS", featureLayer)

  featureLayer.style = ({ options }) => {
    console.log(options.feature)
  };
}