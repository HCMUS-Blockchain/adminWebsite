import png from '@/images/png.png'
import jpg from '@/images/jpg.png'
import svg from '@/images/svg.png'
import defaultImage from '@/images/default.png'
import jpeg from '@/images/jpeg.png'
import { BoxProps } from '@mui/material'

export const ImageConfig: {
  png: string
  jpg: string
  svg: string
  default: string
  jpeg: string
  'svg+xml': string
} = {
  png,
  jpg,
  svg,
  'svg+xml': svg,
  default: defaultImage,
  jpeg,
}

export interface IFileUploadProps extends BoxProps {
  limit: number
  multiple: boolean
  name: string
}
