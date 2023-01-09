import dynamic from 'next/dynamic'
import { DialogComponent } from '../employees'

const DialogComponentStore = dynamic(() => import('./DialogComponentStore'), {
  ssr: false,
})
export default DialogComponentStore
