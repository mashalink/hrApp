import { alpha, createTheme } from "@mui/material/styles";

const headingFont = '"Palatino Linotype", "Book Antiqua", Georgia, serif';
const bodyFont = '"Trebuchet MS", "Gill Sans", "Avenir Next", sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f6f66",
      dark: "#184f49",
      light: "#d8ebe7",
    },
    secondary: {
      main: "#c46f44",
      dark: "#8b4926",
      light: "#f4dfd2",
    },
    background: {
      default: "#f4eee3",
      paper: alpha("#fffaf4", 0.84),
    },
    text: {
      primary: "#18322f",
      secondary: "#5a6d69",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h3: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h4: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h5: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    h6: {
      fontFamily: headingFont,
      fontWeight: 700,
    },
    button: {
      fontFamily: bodyFont,
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top left, rgba(196, 111, 68, 0.18), transparent 28%), radial-gradient(circle at right 20%, rgba(31, 111, 102, 0.16), transparent 24%), linear-gradient(180deg, #fbf7ef 0%, #f3ecdf 100%)",
          backgroundAttachment: "fixed",
        },
        "#root": {
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(18px)",
          border: `1px solid ${alpha("#ffffff", 0.72)}`,
          boxShadow: "0 24px 56px rgba(24, 50, 47, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 18,
          textTransform: "none",
        },
        contained: {
          background: "linear-gradient(135deg, #1f6f66 0%, #2d8479 60%, #3d988d 100%)",
          boxShadow: "0 14px 26px rgba(31, 111, 102, 0.18)",
        },
        outlined: {
          borderColor: alpha("#18322f", 0.14),
          backgroundColor: alpha("#fffaf4", 0.68),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: alpha("#ffffff", 0.7),
          "& fieldset": {
            borderColor: alpha("#18322f", 0.1),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#18322f",
        },
      },
    },
  },
});

export default theme;
