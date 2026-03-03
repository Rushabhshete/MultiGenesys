import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ onMenuClick }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={2}>
    <Toolbar sx={{ minHeight: 64 }}>
      <IconButton
        color="inherit"
        edge="start"
        onClick={onMenuClick}
        sx={{ display: { md: "none" }, mr: 1,color:"white" }}
        aria-label="open navigation"
        
      >
        <MenuIcon />
      </IconButton>
      <Box display="flex" alignItems="center" gap={1.5}>
        <Box
          component="img"
          src="/MG_logo.png"
          alt="MultiGenesys Logo"
          sx={{ width: 36, height: 36 }}
        />
        <Typography variant="h6" fontWeight={700} letterSpacing={0.5} color="white">
          MultiGenesys CRM
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
