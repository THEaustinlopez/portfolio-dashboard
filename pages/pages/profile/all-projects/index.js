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
import axios from "axios";

import {
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

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

  // Create a React Query client
  const queryClient = new QueryClient()

  const fetchPokemon = async (pokemon) => {
    const pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    console.log(pokemonData);
    if (pokemonData.status !== 200 || !pokemonData.data) {
      throw new Error('Failed to fetch pokemon data');
      // TODO: Handle error with React Query and Load an error card in place of a normal card so other cards can still be displayed
    }
    const pokemonId = pokemonData.data.id;
    const pokemonName = pokemonData.data.name;
    const pokemonTypes = pokemonData.data.types;
    const spriteUrl = pokemonData.data.sprites.other?.["official-artwork"].front_default || pokemonData.data.sprites.front_default;
    const speciesData = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + pokemonId);
    if (pokemonData.status !== 200 || !pokemonData.data) {
      throw new Error('Failed to fetch species data');
    }
    console.log(speciesData);
    const pokemonDescription = await getRandomFlavorText(speciesData.data.flavor_text_entries);
    console.log(pokemonDescription);
    return {
          id: pokemonId,
          name: pokemonName,
          types: pokemonTypes,
          sprite: spriteUrl,
          description: pokemonDescription,
      };
  };
  // Temp for now
  const pokemonName = 'bulbasaur';
    const {
        isLoading,
        isSuccess,
        error,
        status,
        data: pokemon,
    } = useQuery(['fetch', pokemonName], () => fetchPokemon(pokemonName));

    const getRandomFlavorText = (flavorTexts) => {
      const englishFlavorTexts = flavorTexts
        .filter((text) => text.language.name === 'en')
        .map((text) => text.flavor_text);
    
      const uniqueEnglishFlavorTexts = [...new Set(englishFlavorTexts)];
    
      const randomIndex = Math.floor(
        Math.random() * uniqueEnglishFlavorTexts.length
      );
    
      return uniqueEnglishFlavorTexts[randomIndex];
    };
    

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
            {isLoading ?
            <p>Loading</p>
            :
            error || !isSuccess ?
            <p>error</p>
            :
            pokemon && (
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5} mt={1.5}>
                <PokemonCard
                {...pokemon}
                  // image={logoSlack}
                  // title="slack bot"
                  // description="If everything I did failed - which it doesn't, I think that it actually succeeds."
                  // dateTime="02.03.22"
                  // members={[team1, team2, team3, team4, team5]}
                  // dropdown={{
                  //   action: openSlackBotMenu,
                  //   menu: renderMenu(slackBotMenu, closeSlackBotMenu),
                  // }}
                />
              </MDBox>
            </Grid>
            )
            }
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AllProjects;
