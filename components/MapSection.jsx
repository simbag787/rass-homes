import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';
import properties from '../data/properties.json';
import { PropertyCard } from './PropertyCard';
import Link from 'next/link';

const LegendControl = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    const controlDiv = document.createElement('div');
    controlDiv.style.backgroundColor = 'rgba(255,255,255,0.9)';
    controlDiv.style.padding = '10px 14px';
    controlDiv.style.borderRadius = '8px';
    controlDiv.style.fontSize = '14px';
    controlDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    
    controlDiv.innerHTML = `
      <div style="margin-bottom: 6px;">
        <span style="display:inline-block;width:12px;height:12px;background:#4285F4;border-radius:50%;margin-right:6px;"></span>Available
      </div>
      <div style="margin-bottom: 6px;">
        <span style="display:inline-block;width:12px;height:12px;background:#f44336;border-radius:50%;margin-right:6px;"></span>Sold
      </div>
      <div>
        <span style="display:inline-block;width:12px;height:12px;background:#f57c00;border-radius:50%;margin-right:6px;"></span>Under Construction
      </div>
    `;

    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
  }, [map]);

  return null;
};

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
    { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] }
  ];

  const mapContainerStyle = { height: '100%', minHeight: '500px' };

  return (
    <div className='map-section' id="map-section" style={{ height: '100%', position: 'relative' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDgDtxwsgerBru8KAWc9YjLj0qnFC9yc1Q"
        libraries={['geometry']}
        onLoad={() => { if (window.google && window.google.maps) setGoogleLoaded(true); }}
      >
        {googleLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
            options={{ styles: mapStyles }}
            onLoad={(map) => { mapRef.current = map; }}
            onDragEnd={() => {
              if (mapRef.current) {
                const newCenter = mapRef.current.getCenter();
                setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
              }
            }}
          >
            <LegendControl map={mapRef.current} />

            {properties.map((property, i) => (
              <Marker
                key={property.id}
                position={{ lat: property.lat, lng: property.lng }}
                onMouseOver={() => setMarkerHoveredId(property.id)}
                onMouseOut={() => setTimeout(() => setMarkerHoveredId(null), 200)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor:
                    markerHoveredId === property.id || boxHoveredId === property.id
                      ? "#ff5252"
                      : property.status === "Available"
                      ? "#4285F4"
                      : property.status === "Sold"
                      ? "#f44336"
                      : "#f57c00",
                  fillOpacity: 1,
                  strokeColor: "#fff",
                  strokeWeight: 2,
                  scale: 10,
                }}
              >
                {(property.id === boxHoveredId || markerHoveredId === property.id) && (
                  <InfoBox
                    key={i}
                    defaultPosition={new window.google.maps.LatLng(property.lat, property.lng)}
                    options={{
                      pixelOffset: new window.google.maps.Size(-140, 0),
                      alignBottom: true,
                      closeBoxURL: '',
                      enableEventPropagation: true,
                      disableAutoPan: true,
                    }}
                  >
                    <div
                      onMouseEnter={() => setBoxHoveredId(property.id)}
                      onMouseLeave={() => setBoxHoveredId(null)}
                      style={{ textDecoration: 'none' }}
                    >
                      <Link
                        href={`/property/${property.address.toLowerCase().replaceAll(' ', '-').replace(',', '')}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <PropertyCard property={property} variant={"map"} />
                      </Link>
                    </div>
                  </InfoBox>
                )}
              </Marker>
            ))}
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
      </LoadScript>
    </div>
  );
};

export default MapSection;
