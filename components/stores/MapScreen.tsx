import { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export default function MapScreen() {
  // const [viewport, setViewport] = useState({

  //   // The latitude and longitude of the center of London
  //   latitude: 10.765963704951895,
  //   longitude: 106.69705000164117,
  //   zoom: 15,
  // })
  function onPlaceSelect(value: any) {
    console.log(value)
  }

  function onSuggectionChange(value: any) {
    console.log(value)
  }
  return (
    <>
      <Map
        initialViewState={{
          latitude: 10.765932085198404,
          longitude: 106.69700708586993,
          zoom: 14,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API}
      >
        {/* <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API}>
          <GeoapifyGeocoderAutocomplete
            placeSelect={onPlaceSelect}
            suggestionsChange={onSuggectionChange}
          />
        </GeoapifyContext> */}
        <Marker longitude={106.69700708586993} latitude={10.765932085198404} color="red" />
      </Map>
    </>
  )
}
