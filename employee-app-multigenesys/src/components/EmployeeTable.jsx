// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const EmployeeTable = ({ employees, onEdit, onDelete }) => {
//   if (!employees || employees.length === 0) {
//     return (
//       <Paper sx={{ mt: 2, p: 3 }}>
//         <Typography color="text.secondary">
//           No employees found
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <TableContainer component={Paper} sx={{ mt: 2 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Mobile</TableCell>
//             <TableCell>Country</TableCell>
//             <TableCell align="center">Actions</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {employees.map((emp) => (
//             <TableRow key={emp.id}>
//               <TableCell>{emp.name}</TableCell>
//               <TableCell>{emp.email}</TableCell>
//               <TableCell>{emp.mobile}</TableCell>
//               <TableCell>{emp.country}</TableCell>
//               <TableCell align="center">
//                 <IconButton
//                   size="small"
//                   onClick={() => onEdit(emp.id)}
//                 >
//                   <EditIcon fontSize="small" />
//                 </IconButton>

//                 <IconButton
//                   size="small"
//                   color="error"
//                   onClick={() => onDelete(emp.id)}
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default EmployeeTable;

import { Paper, IconButton, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EmployeeTable = ({ rows, loading, onEdit, onDelete }) => {
  const columns = [
    { field: "id", headerName: "ID", minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "mobile", headerName: "Mobile", flex: 1, minWidth: 130 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 120,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => onEdit(params.row.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />
    </Paper>
  );
};

export default EmployeeTable;