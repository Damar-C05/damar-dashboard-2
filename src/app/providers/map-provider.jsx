"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { Spinner } from "@nextui-org/react";

const libraries = ["places", "drawing", "geometry"];

export function MapProvider({ children }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;
  if (!scriptLoaded)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return children;
}
