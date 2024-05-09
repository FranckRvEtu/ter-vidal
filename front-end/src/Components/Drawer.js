import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  backgroundColor: "primary.main",
}));
const drawerTheme = createTheme({
  palette: {
    background: {
      paper: "#001e3c",
    },
    text: {
      primary: "white",
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "white",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});
export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  function handleListItemClick(event, path) {
    navigate(path);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    handleDrawerOpen();
  };

  useEffect(() => {
    if (window.annyang) {
      window.annyang.setLanguage("fr-FR");
      // Liste des commandes vocales
      var commands = {
        dashboard: () => navigate("/"),
        agenda: () => navigate("/agenda"),
        patients: () => navigate("/ListePatient"),
        test: () => alert("test"),
      };

      window.annyang.addCommands(commands);
    }

    return () => {
      if (window.annyang) window.annyang.abort();
    };
  }, [navigate]);

  const toggleListening = () => {
    if (isListening) {
      window.annyang.abort();
    } else {
      window.annyang.start({ autoRestart: true, continuous: false });
    }
    setIsListening(!isListening);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          top: 0,
          right: 0,
          bgcolor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "flex-end",
          borderBottomLeftRadius: 20,
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: "primary.main",
            minHeight: "64px",
            justifyContent: "flex-end",
            padding: "0 16px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <Avatar
            alt="Dr Kawasaki"
            src="/Assets/photoDR.jpg"
            sx={{
              width: 50,
              height: 50,
              marginRight: 2,
            }}
          />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "white",
            }}
          >
            Dr Kawasaki
          </Typography>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={drawerTheme}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onMouseLeave={handleDrawerClose}
        >
          <DrawerHeader sx={{ backgroundColor: "primary.main" }}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ color: "white" }}
            >
              Nom app
            </Typography>
          </DrawerHeader>
          <Box sx={{}}>
            <Divider />
            <List>
              {[
                { text: "Dashboard", iconPath: "/Assets/grid.png", path: "/" },
                {
                  text: "Patients",
                  iconPath: "/Assets/iconPeople.png",
                  path: "/listePatient",
                },
                {
                  text: "Agenda",
                  iconPath: "/Assets/calendar.png",
                  path: "/agenda",
                },
              ].map(
                (
                  item // Utilise item ici pour accéder aux propriétés de chaque objet
                ) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      sx={{
                        borderRadius: "10px",
                        color: "black",
                        padding: "6px 12px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        ":hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      onClick={(event) => handleListItemClick(event, item.path)}
                    >
                      <ListItemIcon>
                        <img
                          src={item.iconPath}
                          alt={item.text}
                          style={{
                            maxWidth: 24,
                            maxHeight: 24,
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Box>

          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton
              onClick={toggleListening}
              color="primary"
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
                color: "white",
                borderRadius: "20%",
                padding: "10px",
              }}
            >
              {isListening ? (
                <MicIcon sx={{ fontSize: "2rem" }} /> // Icône du micro active avec une taille plus grande
              ) : (
                <MicOffIcon sx={{ fontSize: "2rem" }} /> // Icône du micro éteint avec une taille plus grande
              )}
            </IconButton>
          </Box>
          <Box sx={{ width: "100%", marginTop: "Auto" }}>
            <List>
              {[
                { text: "Parametres", iconPath: "/Assets/setting.png" },
                { text: "Aide", iconPath: "/Assets/help.png" },
                { text: "Deconnexion", iconPath: "/Assets/logout.png" },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: "10px",
                      color: "grey",
                      padding: "6px 12px",
                      marginLeft: "10px",
                      marginRight: "10px",
                      ":hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                    onClick={(event) => handleListItemClick(event, item.text)}
                  >
                    <ListItemIcon>
                      <img
                        src={item.iconPath}
                        alt={item.text}
                        style={{
                          maxWidth: 24,
                          maxHeight: 24,
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </ThemeProvider>

      <Box
        sx={{
          width: "160px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
        onMouseEnter={handleMouseEnter} // permet au drawer d'avoir une detection de souris au lieu de devoir utiliser un boutton
      ></Box>
    </Box>
  );
}
