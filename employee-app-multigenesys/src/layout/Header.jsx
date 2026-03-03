import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      elevation={2}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Tooltip title="Open menu" arrow>
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMenuClick}
              sx={{ display: { md: "none" } }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Logo + Name Clickable */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src="/MG_logo.png"
              alt="MultiGenesys Logo"
              sx={{ width: 36, height: 36 }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
              letterSpacing={0.5}
              color="white"
            >
              MultiGenesys
            </Typography>
          </Box>
        </Box>

        {/* Center Section */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ display: { xs: "none", md: "block" } }}
              color="white"

        >
          Employee Management System
        </Typography>

        {/* Right Section */}
        <Tooltip title="Account" arrow>
          <IconButton sx={{color:"white"}} aria-label="account">
            <AccountCircle />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;