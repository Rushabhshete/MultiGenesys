import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </List>
            <List>
        <ListItemButton onClick={() => navigate("/add")}>
          <ListItemText primary="Add Employee" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;