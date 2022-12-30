import { MainLayout } from '@/components/layout'
import Map from '@/components/map'
import { Box } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
function StoreScreen() {
  return <Map />
}

StoreScreen.Layout = MainLayout

export default StoreScreen
