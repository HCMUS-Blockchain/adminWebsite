import Logo from '@/images/logo.png'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material'
import Image from 'next/image'
// import Link from 'next/link'
const drawerList = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    ref: '/',
  },
  {
    title: 'Campaigns',
    icon: <CampaignOutlinedIcon />,
    ref: '/campaigns',
  },
  {
    title: 'Stores',
    icon: <StoreOutlinedIcon />,
    ref: '/stores',
  },
  {
    title: 'Employees',
    icon: <BadgeOutlinedIcon />,
    ref: '/employees',
  },
  {
    title: 'Games',
    icon: <SportsEsportsOutlinedIcon />,
    ref: '/games',
  },
]
export const drawer = (
  <div>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Image src={Logo} alt="logo" width={150} height={64} />
    </Box>
    <List>
      {drawerList.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <Link sx={{ width: '100%' }} href={item.ref}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
)
