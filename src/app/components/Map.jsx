"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProvider } from "../providers/map-provider";
import { useState, useEffect } from "react";

const defaultMapCenter = {
  lat: -7.772263,
  lng: 110.379116,
};

const defaultMapZoom = 13;

const mapsTheme = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#a0daf2",
      },
    ],
  },
];

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  styles: mapsTheme,
};

const MapComponent = ({
  height = "70vh",
  markers = [],
  latitude,
  longitude,
  children,
}) => {
  const [location, setLocation] = useState({
    lat: latitude || defaultMapCenter.lat,
    lng: longitude || defaultMapCenter.lng,
  });

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setLocation({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [latitude, longitude]);

  const defaultMapContainerStyle = {
    width: "100%",
    height,
    borderRadius: "15px",
  };

  return (
    <MapProvider>
      <div className="w-full">
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={location}
          zoom={defaultMapZoom}
          options={defaultMapOptions}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
          ))}
          {children}
        </GoogleMap>
      </div>
    </MapProvider>
  );
};

export { MapComponent };
