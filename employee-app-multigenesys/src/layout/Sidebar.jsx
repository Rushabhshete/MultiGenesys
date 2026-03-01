import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Employees", path: "/", icon: <PeopleIcon /> },
    { label: "Add Employee", path: "/add", icon: <AddIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ px: 1 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
<ListItemButton
  selected={isActive}
  onClick={() => navigate(item.path)}
  sx={{
    borderRadius: 2,
    mb: 1,
    px: 2,
    py: 1.2,
    borderLeft: isActive
      ? "4px solid"
      : "4px solid transparent",
    borderColor: "primary.main",
    bgcolor: isActive ? "action.hover" : "transparent",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "action.hover",
    },
  }}
>
  <ListItemIcon
    sx={{
      minWidth: 36,
      color: isActive ? "primary.main" : "text.secondary",
    }}
  >
    {item.icon}
  </ListItemIcon>

  <ListItemText
    primary={item.label}
    sx={{
      "& .MuiTypography-root": {
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "primary.main" : "text.primary",
      },
    }}
  />
</ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;