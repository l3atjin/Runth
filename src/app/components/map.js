"use client";
import React, { useCallback, useEffect, useState } from 'react'
import {APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { data } from '../../../public/runnable_idx';
import { placeIdToZipCode } from '../../../public/zipcodes';


export default function MapComponent() {
  const position = {lat: 37.773972, lng: -122.431297};
  const map = useMap();
  const geocodingLibrary = useMapsLibrary('geocoding');

  const mapOptions = {
    zoom: 13,
    center: position,
    mapId: process.env.NEXT_PUBLIC_MAP_ID
  };

  const featureStyleOptionsRed = {
    strokeColor: "#FF0000", // Red
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#FF0000", // Red
    fillOpacity: 0.5,
  };
  
  const featureStyleOptionsYellow = {
    strokeColor: "#FFFF00", // Yellow
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#FFFF00", // Yellow
    fillOpacity: 0.5,
  };
  
  const featureStyleOptionsGreen = {
    strokeColor: "#00FF00", // Green
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#00FF00", // Green
    fillOpacity: 0.5,
  };

  const featureStyleOptionsGrey = {
    strokeColor: "#808080", // Grey
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#808080", // Grey
    fillOpacity: 0.5,
  };
  

  useEffect( () => {
    const setMapStyles = async () => {
      if (map) {
        if (!map.getMapCapabilities().isDataDrivenStylingAvailable) return;
        const featureLayer = map.getFeatureLayer("POSTAL_CODE")
        
        const geocoder = new geocodingLibrary.Geocoder();

        featureLayer.style = ( options ) => {
          const placeId = options.feature.placeId;
          let zipCode = placeIdToZipCode[placeId];
          if (!data[zipCode]) {
            // console.log("This zipcode unavailable", zipCode)
            // console.log("place id is", placeId)
            return featureStyleOptionsGrey
          }
          const runnnableIdx = data[zipCode]["safety"] + data[zipCode]["scenery"] + data[zipCode]["traffic"];
          
          // console.log("Runnable idx is", runnnableIdx)
          if (runnnableIdx > 20) {
            return featureStyleOptionsGreen;
          } else if (runnnableIdx > 10) {
            return featureStyleOptionsYellow;
          } else {
            return featureStyleOptionsRed;
          }

          
        };
        
      }
    }

    setMapStyles();
    
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