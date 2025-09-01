import { GoogleMap, LoadScript, Marker, InfoBox } from '@react-google-maps/api';
import React from 'react';
import properties from '../data/properties.json';
import { PropertyCardMap } from './PropertyCardMap';
import Link from 'next/link';

export const MapSection = () => {
  const [googleLoaded, setGoogleLoaded] = React.useState(false);
  const [markerHoveredId, setMarkerHoveredId] = React.useState(null);
  const [boxHoveredId, setBoxHoveredId] = React.useState(null);

  const mapStyles = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 },
        { lightness: -20 }
      ]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { color: "#1b1b1b" } // dark background
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#141414" } // very dark blue-gray water
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { color: "#2b2b2b" } // dark gray roads
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" } // hide road names
      ]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        { visibility: "off" } // hide points of interest
      ]
    },
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        { visibility: "off" } // hide admin boundaries
      ]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#cccccc" }, // light gray city labels
        { visibility: "on" }
      ]
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#aaaaaa" }, // medium gray neighborhood labels
        { visibility: "on" }
      ]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        { visibility: "off" }   // hide transit
      ]
    }
  ];

  const mapContainerStyle = {
    height: '100%',
    minHeight: '500px',
  };

  const center = {
    lat: 47.6101,
    lng: -122.2015, // Center of Bellevue, WA
  };

  const mapRef = React.useRef(null);
  const [mapCenter, setMapCenter] = React.useState(center);

  return (
    <div className='map-section' id="map-section">
      <LoadScript
        googleMapsApiKey="AIzaSyDgDtxwsgerBru8KAWc9YjLj0qnFC9yc1Q"
        libraries={['geometry']}
        onLoad={() => {
          if (window.google && window.google.maps) setGoogleLoaded(true);
        }}
      >
        {googleLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
            options={{ styles: mapStyles }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onDragEnd={() => {
              if (mapRef.current) {
                const newCenter = mapRef.current.getCenter();
                setMapCenter({
                  lat: newCenter.lat(),
                  lng: newCenter.lng(),
                });
              }
            }}
          >
            {properties.map((property, i) => {
              return (
                <Marker
                  key={property.id}
                  position={{ lat: property.lat, lng: property.lng }}
                  onMouseOver={() => {
                    setMarkerHoveredId(property.id)
                  }
                  }
                  onMouseOut={() => {
                    setTimeout(() => {
                      setMarkerHoveredId(null);
                    }, 200);
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE, // built-in circle
                    fillColor: (markerHoveredId === property.id || boxHoveredId === property.id) ? "#ff5252" : "#4285F4", // red on hover, blue otherwise
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    scale: 10, // radius of circle (in px)
                  }}
                >
                  {(property.id == boxHoveredId || markerHoveredId == property.id) && (
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
                        <Link href={`/about-us`} style={{ textDecoration: 'none' }}>
                          <PropertyCardMap property={property} />
                        </Link>
                      </div>
                    </InfoBox>
                  )}
                </Marker>
              );
            })}
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
      </LoadScript>
    </div>
  );
};

export default MapSection;
