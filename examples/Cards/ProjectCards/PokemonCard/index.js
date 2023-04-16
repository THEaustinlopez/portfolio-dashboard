// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

// Custom styles for PokemonCard
function PokemonCard({
  color,
  image,
  title,
  dateTime,
  description,
  members,
  dropdown,
  ...pokemon
}) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <MDAvatar
        key={memberKey}
        src={member.src || member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  if (pokemon) {
  return (
    <Card>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center">
          <MDAvatar
            src={pokemon?.sprite}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{
              p: 1,
              mt: -6,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
          />
          <MDBox ml={2} mt={-2} lineHeight={0}>
            <MDTypography
              variant="h6"
              textTransform="capitalize"
              fontWeight="medium"
            >
              {pokemon?.name.toUpperCase()}
            </MDTypography>
            {members.length > -1 ? (
              <MDBox display="flex">{renderMembers}</MDBox>
            ) : null}
          </MDBox>
          {dropdown && (
            <MDTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon
                fontSize="default"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
              >
                more_vert
              </Icon>
            </MDTypography>
          )}
          {dropdown.menu}
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
            <MDBox display="flex" flexDirection="column" lineHeight={0}>
              <MDTypography variant="button" fontWeight="medium">
                {pokemon.id}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                No.
              </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" lineHeight={0}>
              {pokemon.types && pokemon.types.map((type, key) => {
                return (
                  <MDTypography key={key} variant="button" fontWeight="medium">
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                  </MDTypography>
                )
                })
              }
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                Type
              </MDTypography>
            </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
  }
}

// Setting default values for the props of PokemonCard
PokemonCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the PokemonCard
PokemonCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  // image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  // title: PropTypes.string.isRequired,
  // dateTime: PropTypes.string,
  // description: PropTypes.node.isRequired,
  // members: PropTypes.arrayOf(
  //   PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  // ),
  // dropdown: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.shape({
  //     action: PropTypes.func,
  //     menu: PropTypes.node,
  //   }),
  // ]),
  // pokemon: PropTypes.object.isRequired
};

export default PokemonCard;
