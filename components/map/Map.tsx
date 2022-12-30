'use-client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import uploadImg from '@/images/map_marker.png'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import * as L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { TextField, Box, Typography, MenuItem, Autocomplete } from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from './utility'

function Map() {
  const provider = new OpenStreetMapProvider()
  const searchControl = GeoSearchControl({
    provider: new OpenStreetMapProvider(),
    style: 'bar',
  })
  const [value, setValue] = useState('')
  const [list, setList] = useState<Array<any>>([])
  const debouncedSearchTerm = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      const x = async () => {
        const results = await provider.search({ query: value })
        setList(results)
        console.log(results)
      }
      x()
    }
  }, [debouncedSearchTerm])
  //   const handleChange = async (event) => {
  //     const results = await provider.search({ query: event.target.value })
  //     console.log(results)
  //   }
  //   const results = await provider.search({ query: input.value })

  return (
    <Box>
      <MapContainer
        center={[10.774961096595817, 106.6813896184403]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '80vh', width: '80vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[10.774961096595817, 106.6813896184403]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={list}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            onChange={(e) => setValue(e.target.value)}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        sx={{ width: '150px' }}
      />

      {list.map((item, index) => (
        <MenuItem key={index}>{item.label}</MenuItem>
      ))}
    </Box>
  )
}

export default Map
