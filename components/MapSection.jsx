import { GoogleMap, LoadScript, Marker, InfoBox } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import properties from "../data/properties.json";
import { PropertyCard } from "./PropertyCard";
import Link from "next/link";

export const MapSection = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [markerHoveredId, setMarkerHoveredId] = useState(null);
  const [boxHoveredId, setBoxHoveredId] = useState(null);
  const mapRef = useRef(null);

  const [mapCenter, setMapCenter] = useState({ lat: 47.6101, lng: -122.2015 });

  const mapStyles = [
    { featureType: "all", elementType: "all", stylers: [{ saturation: -100 }, { lightness: -20 }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#141414" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2b2b2b" }] },
    { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "administrative", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#cccccc" }, { visibility: "on" }] },
    { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#aaaaaa" }, { visibility: "on" }] },
    { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
  ];

  const getMarkerColor = (status, isHovered) => {
    if (isHovered) return "#ff5252";
    if (status === "Available") return "#4285F4";
    if (status === "Sold") return "#f44336";
    return "#f57c00"; // Under Construction
  };

  // ✅ Function to fit map bounds to all markers
  const fitBoundsToMarkers = (map) => {
    if (!window.google || !properties.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    properties.forEach((property) => bounds.extend({ lat: property.lat, lng: property.lng }));
    map.fitBounds(bounds);
  };

  return (
    <div className="map-section" id="map-section">
      <LoadScript
        googleMapsApiKey="AIzaSyDgDtxwsgerBru8KAWc9YjLj0qnFC9yc1Q"
        libraries={["geometry"]}
        onLoad={() => {
          if (window.google && window.google.maps) setGoogleLoaded(true);
        }}
      >
        {googleLoaded ? (
          <>
            <GoogleMap
              mapContainerClassName="map-container"
              center={mapCenter}
              zoom={10}
              options={{ styles: mapStyles, fullscreenControl: false }}
              onLoad={(map) => {
                mapRef.current = map;
                fitBoundsToMarkers(map); // ✅ Center on all markers
              }}
              onDragEnd={() => {
                if (mapRef.current) {
                  const newCenter = mapRef.current.getCenter();
                  setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
                }
              }}
            >
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={{ lat: property.lat, lng: property.lng }}
                  onMouseOver={() => setMarkerHoveredId(property.id)}
                  onMouseOut={() => setTimeout(() => setMarkerHoveredId(null), 200)}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    fillColor: getMarkerColor(property.status, markerHoveredId === property.id || boxHoveredId === property.id),
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    scale: 10,
                  }}
                >
                  {(property.id === boxHoveredId || markerHoveredId === property.id) && (
                    <InfoBox
                      key={property.id}
                      defaultPosition={new window.google.maps.LatLng(property.lat, property.lng)}
                      options={{
                        pixelOffset: new window.google.maps.Size(-140, 0),
                        alignBottom: true,
                        closeBoxURL: "",
                        enableEventPropagation: true,
                        disableAutoPan: true,
                      }}
                    >
                      <div
                        onMouseEnter={() => setBoxHoveredId(property.id)}
                        onMouseLeave={() => setBoxHoveredId(null)}
                        className="infobox-container"
                      >
                        <Link
                          href={`/property/${property.address
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replace(",", "")}`}
                          className="infobox-link"
                        >
                          <PropertyCard property={property} variant={"map"} />
                        </Link>
                      </div>
                    </InfoBox>
                  )}
                </Marker>
              ))}
            </GoogleMap>

            {/* ✅ React-based legend overlay */}
            <div className="map-legend">
              <div>
                <span className="legend-dot available"></span>Available
              </div>
              <div>
                <span className="legend-dot sold"></span>Sold
              </div>
              <div>
                <span className="legend-dot under-construction"></span>Under Construction
              </div>
            </div>
          </>
        ) : (
          <div className="map-loading">Loading map...</div>
        )}
      </LoadScript>
    </div>
  );
};

export default MapSection;
