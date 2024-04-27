import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Theme from "../theme";

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
export default function PersistentDrawerLeft() {
  const theme = useTheme(Theme);
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

  // Fonction pour gérer la fermeture du drawer lorsque la souris quitte la zone
  const handleMouseLeave = () => {
    handleDrawerClose();
  };

  useEffect(() => {
    if (window.annyang) {
      // Définition de la langue pour la reconnaissance vocale
      window.annyang.setLanguage("fr-FR");
      // Modification des commandes vocales pour utiliser navigate
      var commands = {
        dashboard: () => navigate("/"),
        agenda: () => navigate("/agenda"),
        patients: () => navigate("/ListePatient"),
        test: () => alert("test"),
        // Ajoutez d'autres commandes vocales ici
      };

      // Ajout des commandes vocales à Annyang
      window.annyang.addCommands(commands);

      // Optionnel: Démarrer l'écoute au chargement du composant
      // window.annyang.start();
    }

    return () => {
      // Assurez-vous d'arrêter Annyang lorsque le composant est démonté
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
          top: 0, // Positionner l'AppBar en haut
          right: 0, // Aligner l'AppBar à droite
          bgcolor: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "auto", // Ajuster la largeur automatiquement en fonction du contenu
          height: "auto", // Ajuster la hauteur automatiquement en fonction du contenu
          display: "flex",
          justifyContent: "flex-end", // Placer le contenu à droite

          borderBottomLeftRadius: 20, // Arrondir également le coin bas gauche
          boxShadow: "none", // Supprimer l'ombre pour un effet plus épuré
        }}
      >
        <Toolbar
          disableGutters // Désactiver les paddings par défaut du Toolbar
          sx={{
            minHeight: "64px", // Hauteur minimale pour aligner avec la hauteur standard d'AppBar
            justifyContent: "flex-end", // Placer le contenu à droite
            padding: "0 16px", // Ajouter du padding à droite et à gauche pour éviter que le contenu touche les bords
          }}
        >
          <Avatar
            alt="Dr Kawasaki"
            src="/Assets/photoDR.jpg"
            sx={{
              width: 50,
              height: 50,
              marginRight: 2, // Ajouter un petit espace à droite de l'avatar
            }}
          />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "white", // Couleur du texte
            }}
          >
            Dr Kawasaki
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
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
                      borderRadius: "10px", // More rounded corners
                      color: "black", // Initial text color
                      padding: "6px 12px", // Adjust padding to control the size
                      marginLeft: "10px", // Add some margin to the left
                      marginRight: "10px", // Add some margin to the right
                      ":hover": {
                        backgroundColor: "primary.main", // Background color on hover
                        color: "white", // Text color on hover to inverse the color scheme
                      },
                    }}
                    onClick={(event) => handleListItemClick(event, item.path)}
                  >
                    <ListItemIcon>
                      {/* Assure-toi d'utiliser item.iconPath pour obtenir la valeur dynamique */}
                      <img
                        src={item.iconPath}
                        alt={item.text}
                        style={{ maxWidth: 24, maxHeight: 24 }}
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
            justifyContent: "center", // Centre horizontalement
            alignItems: "center", // Centre verticalement
            height: "100%", // Prend toute la hauteur disponible
          }}
        >
          <IconButton
            onClick={toggleListening}
            color="primary"
            sx={{
              backgroundColor: "primary.main", // Fond orange
              "&:hover": {
                backgroundColor: "primary.main", // Fond plus clair au survol
              },
              color: "white", // Couleur de l'icône
              borderRadius: "20%", // Rend le fond complètement rond
              padding: "10px", // Espace entre l'icône et le bord du bouton
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
            ].map(
              (
                item // Utilise item ici pour accéder aux propriétés de chaque objet
              ) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: "10px", // More rounded corners
                      color: "grey", // Initial text color
                      padding: "6px 12px", // Adjust padding to control the size
                      marginLeft: "10px", // Add some margin to the left
                      marginRight: "10px", // Add some margin to the right
                      ":hover": {
                        backgroundColor: "primary.main", // Background color on hover
                        color: "white", // Text color on hover to inverse the color scheme
                      },
                    }}
                    onClick={(event) => handleListItemClick(event, item.text)}
                  >
                    <ListItemIcon>
                      {/* Assure-toi d'utiliser item.iconPath pour obtenir la valeur dynamique */}
                      <img
                        src={item.iconPath}
                        alt={item.text}
                        style={{ maxWidth: 24, maxHeight: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box
        sx={{
          width: "160px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
        onMouseEnter={handleMouseEnter} // Ajout de l'événement onMouseEnter sur la zone sensible
      ></Box>
    </Box>
  );
}
