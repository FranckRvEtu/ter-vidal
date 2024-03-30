import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleListItemClick(event, path) {
    navigate(path);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        open={open}
        sx={{ bgcolor: '#ff7644', zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Nom app
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar 
            alt="Dr Kawasaki" 
            src="/Assets/photoDR.jpg"
            sx={{ width: 50, height: 50, marginLeft: 'auto' }}
          />

          <Typography 
            variant="h4"
            marginLeft="auto"
            noWrap component="div"
          
          
          >
            Dr Kawasaki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Box sx={{ overflowY: 'auto' }}>

        <Divider />
        <List>
            {[
              { text: 'Dashboard', iconPath: '/Assets/grid.png', path: '/addPatient' },
              { text: 'Patients', iconPath: '/Assets/iconPeople.png', path: '/listePatient' },
              { text: 'Agenda', iconPath: '/Assets/calendar.png', path: '/agenda' },
            ]
            .map((item) => ( // Utilise item ici pour accéder aux propriétés de chaque objet
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  sx={{
                    borderRadius: '10px', // More rounded corners
                    color: 'black', // Initial text color
                    padding: '6px 12px', // Adjust padding to control the size
                    marginLeft: '10px', // Add some margin to the left
                    marginRight: '10px', // Add some margin to the right
                    ':hover': {
                      backgroundColor: '#ff7644', // Background color on hover
                      color: 'white', // Text color on hover to inverse the color scheme
                    },
                  }}                        
                  onClick={(event) => handleListItemClick(event, item.path)}>
                  <ListItemIcon>
                    {/* Assure-toi d'utiliser item.iconPath pour obtenir la valeur dynamique */}
                    <img src={item.iconPath} alt={item.text} style={{ maxWidth: 24, maxHeight: 24 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Box>

        <Divider />
        <Box sx={{ width: '100%', marginTop: 'Auto' }}>

        <List>
            {[
              { text: 'Parametres', iconPath: '/Assets/setting.png' },
              { text: 'Aide', iconPath: '/Assets/help.png' },
              { text: 'Deconnexion', iconPath: '/Assets/logout.png' },
            ].map((item) => ( // Utilise item ici pour accéder aux propriétés de chaque objet
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  sx={{
                    borderRadius: '10px', // More rounded corners
                    color: 'grey', // Initial text color
                    padding: '6px 12px', // Adjust padding to control the size
                    marginLeft: '10px', // Add some margin to the left
                    marginRight: '10px', // Add some margin to the right
                    ':hover': {
                      backgroundColor: '#ff7644', // Background color on hover
                      color: 'white', // Text color on hover to inverse the color scheme
                    },
                  }}                        
                  onClick={(event) => handleListItemClick(event, item.text)}>
                  <ListItemIcon>
                    {/* Assure-toi d'utiliser item.iconPath pour obtenir la valeur dynamique */}
                    <img src={item.iconPath} alt={item.text} style={{ maxWidth: 24, maxHeight: 24 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Box>
      </Drawer>
      
    </Box>
  );
}