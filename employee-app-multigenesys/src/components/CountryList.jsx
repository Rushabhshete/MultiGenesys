import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

const CountryList = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return (
      <Paper sx={{ mt: 2, p: 3 }}>
        <Box display="flex" justifyContent="center">
          <Typography color="text.secondary">
            No country data loaded
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <List>
        {countries.map((country) => (
          <ListItem key={country.id}>
            <Avatar
              src={country.flag}
              alt={country.country}
              sx={{ mr: 2 }}
            />
            <ListItemText primary={country.country} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CountryList;