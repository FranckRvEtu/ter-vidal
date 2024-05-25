import Avatar from "@mui/material/Avatar";
import {
  InputAdornment,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";


export default function Login(){

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const controller = new AbortController();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email", email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("bloc try");

      const response = await axios.post("http://localhost:11000/loginMedecin",
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );

      console.log(JSON.stringify(response?.data));
      if (response.status === 200) {
        console.log("Login successful");
        const data = response.data;
        console.log("data:", data);
        const accessToken = data.accessToken; //récupère le token
        console.log("accessToken:", accessToken);
        setAuth({ email, password, accessToken}) //stocke les données de connexion
        setEmail(""); //réinitialise les champs
        setPassword(""); //réinitialise les champs
        navigate(from, { replace: true }); //redirige vers la page précédente
      } else {
        console.log("Login failed", response.status);
        alert("Login Failed", response.status);
        window.location.href = "/login";
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              my: 8,
              p: 3,
              backgroundColor: "#ff9c6d", // Arrière-plan coloré, sera partiellement visible autour de l'image
              backgroundImage: 'url("/Assets/a.png")', // Ajoutez votre image de fond ici
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Centrer l'image de fond
              backgroundSize: "cover", // Couvrir tout l'espace disponible, ajustez selon besoin
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0",
              width: "100%",
              height: "80vh",
              color: "white",
            }}
          >
            <Typography variant="body2" color="textSecondary" align="center">
              © 2024 Nom app. Tous droits réservés.
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: "Black",
                marginTop: "auto", // Centrer dans le conteneur parent
                textAlign: "center", // Alignement du texte
                fontFamily: "Open Sans, sans-serif",
              }}
            ></Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              my: 8,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "0",
              width: "100%",
              height: "80vh",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
            <Paper
              sx={{
                backgroundColor: "#ff9c6d", // Couleur de fond orange
                padding: "8px 16px", // Espacement intérieur pour le texte
                width: "100%", // Prend toute la largeur
                marginTop: 0, // Supprime la marge supérieure
                textAlign: "center", // Centrer le texte
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "white", width: "100%" }}
              >
                Bienvenue sur Nom app
              </Typography>
            </Paper>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Avatar
              src="/Assets/steto.png"
              sx={{ width: 50, height: 50, margin: "auto" }}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate  
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{ mb: 5 }}
                variant="standard"
                margin="normal"
                onChange={(event) => setEmail(event.target.value)}
                required
                fullWidth
                id="identifiant"
                label="Identifiant"
                name="identifiant"
                autoComplete="identifiant"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={{ mb: 15 }}
                variant="standard"
                margin="normal"
                onChange={(event) => setPassword(event.target.value)}
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                onSubmit={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Mot de passe oublié?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
