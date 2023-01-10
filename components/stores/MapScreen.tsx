import { useStore } from '@/hooks'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { Tooltip, Box, Typography } from '@mui/material'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'

export default function MapScreen() {
  const { data } = useStore()
  const [markers, setMarkers] = useState([])
  const [info, setInfo] = useState<any>()
  const [initialViewState, setInitialViewState] = useState<any>()

  useEffect(() => {
    if (data) setMarkers(data.data.stores)
  }, [data])

  const handleClick = (item: any) => {
    setInfo(item)
  }

  const position = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setInitialViewState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 15,
      })
    })
  }

  position()

  console.log(initialViewState)

  // const closePopUp = () => {
  //   setInfo(undefined)
  // }
  // console.log(info)
  return (
    <>
      <Map
        initialViewState={{
          latitude: 10.762563013932072,
          longitude: 106.68246451403486,
          zoom: 15,
        }}
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
              <Image alt="image" src={info.image} width={100} height={100} />
            </Box>
          </Popup>
        )}
      </Map>
    </>
  )
}
