import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";
import { getDatabase, ref, set, push } from "firebase/database";

import {db} from '../firebase.db'
// console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);


const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          resolve(location);
        },
        (error) => {
          reject(error); // Handle geolocation errors here
        }
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
}

const center = await getLocation();

function Map(props) {

  const uid = props.data.uid
  const origin = props.data.origin 
  const destination = props.data.destination

  useEffect(() => {
    if (props.confirmation) {
      // If confirmation becomes true, call the calculateRoute function
      calculateRoute();
    }
  }, [props.confirmation]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey : 'AIzaSyAoNWze06RB-8J87kZq7lwicy1AdiTF4i8',
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.GoogleMap*/ null);
  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const originRef = useRef(origin)

  const destinationRef = useRef(destination)

  async function writeHistoryData (uid)  {
    let date = new Date().toJSON()
    const currentLocation = await getLocation();
    const data = {
      date : date,
      origin : originRef.current.value,
      destination : destinationRef.current.value,
      isFavorite : false
    }

    const postListRef = ref(db,`user/` + uid + `/history`)
    const newPostRef = push(postListRef)
    set(newPostRef, data)
  }

  async function calculateRoute() {
    if(destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionService = new window.google.maps.DirectionsService()
    const currentLocation = await getLocation();
    const results = await directionService.route({
        origin : originRef.current.value === '' ? new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng) : originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })

    alert('นำทาง')

    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    
    writeHistoryData(uid)

  }

  function clearRoute() {
    setDirectionResponse(null)
    setDistance(null)
    setDuration(null)
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return isLoaded ? (
    <div>
      {origin}

      <button onClick={() => map.panTo(center)}>Current</button>
      <Autocomplete>
        <input type="text" placeholder='origin' value = {origin} ref={originRef}></input>
      </Autocomplete>

      <Autocomplete>
        <input type="text" placeholder="destination"  value = {destination} ref={destinationRef}></input>
      </Autocomplete>

      <button onClick={calculateRoute}>Route</button>
      <button onClick={clearRoute}>Clear</button>

      Distance : {distance}
      Duration : {duration}
      <div style={{ height: "100vh", width: "100%" }}>
        {/* goole map box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* Display marker, direction */}
          {console.log("Marker position :" + center.lat  + " " + center.lng)}
          <Marker position={center}></Marker>
          {directionResponse && <DirectionsRenderer directions={directionResponse}></DirectionsRenderer>}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Map;
