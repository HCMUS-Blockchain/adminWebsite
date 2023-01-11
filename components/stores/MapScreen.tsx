import { useStore } from '@/hooks'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { Tooltip, Box, Typography } from '@mui/material'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Map, { MapRef, Marker, Popup, useMap } from 'react-map-gl'

export interface MapScreenInterface {
  info: any
  setInfo: any
  initialViewState: any
  setInitialViewState: any
}
export default function MapScreen({
  info,
  setInfo,
  initialViewState,
  setInitialViewState,
}: MapScreenInterface) {
  const { data } = useStore()
  const [markers, setMarkers] = useState([])
  useEffect(() => {
    if (data) setMarkers(data.data.stores)
  }, [data])

  const handleClick = (item: any) => {
    setInfo(item)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setInitialViewState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 15,
      })
    })
  }, [])
  const mapRef = useRef<MapRef>(null)
  const onSelectStore = useCallback((x: any) => {
    mapRef.current?.flyTo({
      center: [x.longitude, x.latitude],
      duration: 2000,
    })
  }, [])
  useEffect(() => {
    if (initialViewState) onSelectStore(initialViewState)
  }, [initialViewState])
  return (
    <>
      {!!initialViewState && (
        <Map
          ref={mapRef}
          initialViewState={initialViewState}
          style={{ width: 900, height: 600 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API}
        >
          {markers
            ? markers.map((item: any) => (
                <Marker
                  key={item._id}
                  longitude={item.coordinates.longitude}
                  latitude={item.coordinates.latitude}
                  color="red"
                  onClick={() => handleClick(item)}
                />
              ))
            : null}
          {!!info && (
            <Popup
              longitude={info.coordinates.longitude}
              latitude={info.coordinates.latitude}
              anchor="top"
              closeOnClick={false}
              onClose={() => setInfo(null)}
            >
              <Box>
                <Typography>{info.title}</Typography>
                <Box textAlign="center">
                  <Image alt="image" src={info.image} width={150} height={100} />
                </Box>
              </Box>
            </Popup>
          )}
        </Map>
      )}
    </>
  )
}
