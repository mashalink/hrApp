import { alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "Employees", to: "/" },
  { label: "Table", to: "/table" },
  { label: "Add Employee", to: "/add_employee" },
  { label: "About", to: "/about" },
];

const navLinkStyles = {
  px: 1.5,
  py: 1,
  borderRadius: 0,
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "text.secondary",
  transition: "all 180ms ease",
  "&:hover": {
    color: "text.primary",
    backgroundColor: alpha("#18322f", 0.04),
  },
  "&.active": {
    color: "text.primary",
    backgroundColor: alpha("#18322f", 0.08),
  },
};

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{ top: 0, backgroundImage: "none" }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          px: { xs: 2, md: 3 },
          py: 1.5,
          backdropFilter: "blur(18px)",
          backgroundColor: alpha("#fff8f0", 0.72),
          borderBottom: `1px solid ${alpha("#18322f", 0.08)}`,
          boxShadow: "0 10px 24px rgba(24, 50, 47, 0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 1 }}>
            HR App
          </Typography>
        </Box>

        <Box
          component="nav"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1,
          }}
        >
          {navigationItems.map((item) => (
            <Box
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === "/"}
              sx={navLinkStyles}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
