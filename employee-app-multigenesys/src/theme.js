import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6495ED",
    },
    secondary: {
      main: "#0ea5e9",
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  components: {
    /* =========================
       TextField Styling
    ========================== */

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: 8,
          fontSize: 12,

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498db",
          },
        },
        notchedOutline: {
          borderColor: "#bbb9b9",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        outlined: {
          "&.Mui-focused": {
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "0 6px",
            borderRadius: 12,
          },
        },
        asterisk: {
          color: "red",
        },
      },
    },

    /* =========================
       DataGrid Styling
    ========================== */
MuiDataGrid: {
  styleOverrides: {
    root: {
      border: "none",
      backgroundColor: "#ffffff",
    },

    columnHeaders: {
      backgroundColor: "#6495ED !important", 
      color: "#ffffff",
    },

    columnHeader: {
      backgroundColor: "#6495ED !important",
      color: "#ffffff !important",
    },

    columnHeaderTitle: {
      color: "#ffffff !important",
      fontWeight: 600,
    },


    row: {
      "&:nth-of-type(even)": {
        backgroundColor: "#f4f7fc",
      },
    },
  },
},
  },
});

export default theme;