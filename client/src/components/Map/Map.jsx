import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'
import 'leaflet/dist/leaflet.css';


const Map = ({address, city, country}) => {
  return (
    <MapContainer
    center={[53.35, 18.8]}
    zoom={1}
    scrollWheelZoom={false}
    style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 1,
       position:"relative"
    }}
    >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  )
}

export default Map