import * as React from "react";
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

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      identifiant: data.get("identifiant"),
      password: data.get("password"),
    });
  };

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
              backgroundColor: "primary.main",
              backgroundImage: 'url("/Assets/a.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
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
                marginTop: "auto",
                textAlign: "center",
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
            <Paper
              sx={{
                backgroundColor: "primary.main",
                padding: "8px 16px",
                width: "100%",
                marginTop: 0,
                textAlign: "center",
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
              sx={{ width: 50, height: 50, margin: "auto", color: "fill" }}
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
}
