/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "react-query";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import PokemonCard from "/examples/Cards/ProjectCards/PokemonCard";

// Project page components
import Header from "/pagesComponents/pages/profile/components/Header";

// Images
import team1 from "/assets/images/team-1.jpg";
import team2 from "/assets/images/team-2.jpg";
import team3 from "/assets/images/team-3.jpg";
import team4 from "/assets/images/team-4.jpg";
import team5 from "/assets/images/team-5.jpg";
import logoSlack from "/assets/images/small-logos/logo-slack.svg";
import logoSpotify from "/assets/images/small-logos/logo-spotify.svg";
import logoXD from "/assets/images/small-logos/logo-xd.svg";
import logoAsana from "/assets/images/small-logos/logo-asana.svg";
import logoInvision from "/assets/images/small-logos/logo-invision.svg";
import logoAtlassian from "/assets/images/small-logos/logo-atlassian.svg";

function AllProjects() {
  // PokemonCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
  const [designToolsMenu, setDesignToolsMenu] = useState(null);
  const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
  const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  const openPremiumSupportMenu = (event) =>
    setPremiumSupportMenu(event.currentTarget);
  const closePremiumSupportMenu = () => setPremiumSupportMenu(null);
  const openDesignToolsMenu = (event) =>
    setDesignToolsMenu(event.currentTarget);
  const closeDesignToolsMenu = () => setDesignToolsMenu(null);
  const openLookingGreatMenu = (event) =>
    setLookingGreatMenu(event.currentTarget);
  const closeLookingGreatMenu = () => setLookingGreatMenu(null);
  const openDeveloperFirstMenu = (event) =>
    setDeveloperFirstMenu(event.currentTarget);
  const closeDeveloperFirstMenu = () => setDeveloperFirstMenu(null);

  // Dropdown menu template for the PokemonCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  const fetchPokemon = async (pokemon) => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    console.log(res);
      return {
          name: res.data.name,
          types: res.data.types,
          sprite: res.data.sprites.front_default,
      };
  };
  // Temp for now
  const pokemonName = 'bulbasaur';
  const { isLoading, error, data: pokemon } = useQuery(`fetch-${pokemonName}`, () =>
    fetchPokemon(pokemonName)
  );

  return (
    <DashboardLayout>
      <MDBox width="calc(100% - 48px)" position="absolute" top="1.75rem">
        <DashboardNavbar light absolute />
      </MDBox>
      <Header />
      <MDBox pb={3}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={7}>
            <MDBox mb={1}>
              <MDTypography variant="h5">
                Pokedex Pro
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDTypography variant="body2" color="text">
                Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon. 
                Each Pokémon belongs to a specific species but may take on a variant which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: "right" }}>
            <MDButton variant="gradient" color="dark">
              <Icon>add</Icon>&nbsp; Add New
            </MDButton>
          </Grid>
        </Grid>
        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                  image={logoSlack}
                  title="slack bot"
                  description="If everything I did failed - which it doesn't, I think that it actually succeeds."
                  dateTime="02.03.22"
                  members={[team1, team2, team3, team4, team5]}
                  dropdown={{
                    action: openSlackBotMenu,
                    menu: renderMenu(slackBotMenu, closeSlackBotMenu),
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                {!isLoading ?
                <PokemonCard
                  {...pokemon}
                  image={logoSpotify}
                  title="premium support"
                  description="Pink is obviously a better color. Everyone’s born confident, and everything’s taken away from you."
                  dateTime="22.11.21"
                  members={[team1, team2, team3]}
                  dropdown={{
                    action: openPremiumSupportMenu,
                    menu: renderMenu(
                      premiumSupportMenu,
                      closePremiumSupportMenu,
                    )
                  }}
                />
                :
                <></>
                }
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                  image={logoXD}
                  title="design tools"
                  description="Constantly growing. We’re constantly making mistakes from which we learn and improve."
                  dateTime="06.03.20"
                  members={[team1, team2, team3, team4]}
                  dropdown={{
                    action: openDesignToolsMenu,
                    menu: renderMenu(designToolsMenu, closeDesignToolsMenu),
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                  image={logoAsana}
                  title="looking great"
                  description="You have the opportunity to play this game of life you need to appreciate every moment."
                  dateTime="14.03.24"
                  members={[team1, team2, team3, team4, team5, team3]}
                  dropdown={{
                    action: openLookingGreatMenu,
                    menu: renderMenu(lookingGreatMenu, closeLookingGreatMenu),
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                  image={logoInvision}
                  title="developer first"
                  description="For standing out. But the time is now to be okay to be the greatest you."
                  dateTime="16.01.22"
                  members={[team1, team2, team3, team4]}
                  dropdown={{
                    action: openDeveloperFirstMenu,
                    menu: renderMenu(
                      developerFirstMenu,
                      closeDeveloperFirstMenu,
                    ),
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                  image={logoAtlassian}
                  title="Product Development"
                  description="We strive to embrace and drive change in our industry. We are happy to work at such a project."
                  dateTime="16.01.22"
                  members={[team1, team2, team3, team4]}
                  dropdown={{
                    action: openDeveloperFirstMenu,
                    menu: renderMenu(
                      developerFirstMenu,
                      closeDeveloperFirstMenu,
                    ),
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllProjects;
