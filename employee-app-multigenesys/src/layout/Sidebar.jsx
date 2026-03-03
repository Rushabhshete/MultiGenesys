import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 230;

// FIX: Route config defined here (single source of truth for Sidebar)
const NAV_ITEMS = [
  {
    label: "Employees",
    path: "/",
    icon: <PeopleIcon />,
    // Active when on "/" or "/updateemployee/:id"
    matchPaths: ["/"],
    startsWith: ["/updateemployee"],
  },
  {
    label: "Add Employee",
    path: "/createnewemployee",
    icon: <PersonAddIcon />,
    matchPaths: ["/createnewemployee"],
    startsWith: [],
  },
];

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (item) =>
    item.matchPaths.includes(location.pathname) ||
    item.startsWith.some((prefix) => location.pathname.startsWith(prefix));

  const drawerSx = {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      borderRight: "1px solid",
      borderColor: "divider",
    },
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ px: 1.5, pt: 2 }}>
        <Typography
          variant="caption"
          color="text.disabled"
          fontWeight={700}
          sx={{ px: 1, letterSpacing: 1, textTransform: "uppercase" }}
        >
          Navigation
        </Typography>
      </Box>
      <Divider sx={{ mx: 2, my: 1 }} />

      <Box sx={{ px: 1 }}>
        <List disablePadding>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <ListItemButton
                key={item.path}
                selected={active}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onMobileClose();
                }}
                data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  px: 2,
                  py: 1.2,
                  borderLeft: active ? "4px solid" : "4px solid transparent",
                  borderColor: "primary.main",
                  bgcolor: active ? "primary.50" : "transparent",
                  transition: "all 0.15s ease",
                  "&:hover": { bgcolor: "action.hover" },
                  "&.Mui-selected": { bgcolor: "primary.50" },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 38, color: active ? "primary.main" : "text.secondary" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 700 : 400,
                    color: active ? "primary.main" : "text.primary",
                    fontSize: "0.92rem",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onMobileClose}
      ModalProps={{ keepMounted: true }}
      sx={drawerSx}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer variant="permanent" open sx={drawerSx}>
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
