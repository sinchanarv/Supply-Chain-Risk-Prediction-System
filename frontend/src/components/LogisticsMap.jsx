import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mockThreats from '../data/mockThreats.json';

const LogisticsMap = () => {
  // Center the map roughly over the Pacific/Asia to see global trade
  const mapCenter = [20.0, 0.0]; 
  const zoomLevel = 2;

  // Example Shipping Route (Shanghai to Los Angeles)
  const safeRoute = [[31.2304, 121.4737], // Shanghai[34.0522, -118.2437] // Los Angeles
  ];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden z-0 relative">
      <MapContainer 
        center={mapCenter} 
        zoom={zoomLevel} 
        minZoom={2} // Prevents zooming out too far
        worldCopyJump={true} // Smoothly wraps the map when dragging
        maxBounds={[[-90, -180],[90, 180]]} // Stops the user from dragging off the edge of the earth
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
        zoomControl={false}
      >
        {/* Dark Mode Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Draw a Safe Shipping Line */}
        <Polyline 
          positions={safeRoute} 
          color="#3b82f6" // Blue
          weight={3} 
          opacity={0.6} 
          dashArray="5, 10" // Makes the line dashed
        />

        {/* Plot the AI Threats as Glowing Red Dots */}
        {mockThreats.map((threat) => {
          // Fallback coordinates if we haven't added them to JSON yet
          const coords = threat.coordinates || 
            (threat.location.includes("Mumbai") ? [19.0760, 72.8777] : 
             threat.location.includes("Miami") ?[25.7617, -80.1918] :[30.5852, 32.2654]); // Suez Canal fallback

          return (
            <CircleMarker 
              key={threat.id}
              center={coords} 
              radius={8}
              fillColor="#ef4444" // Red
              color="#ef4444"
              weight={2}
              opacity={1}
              fillOpacity={0.6}
              className="animate-pulse" // Tailwind animation makes it blink!
            >
              <Popup className="custom-popup">
                <div className="font-sans">
                  <strong className="text-red-600 text-lg">{threat.threat_type}</strong>
                  <br/>
                  <span className="text-slate-600">Location: {threat.location}</span>
                  <br/>
                  <span className="text-slate-600">Affected: {threat.affected_shipments} Orders</span>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LogisticsMap;