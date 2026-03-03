import { Paper, IconButton, Box, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo } from "react";
import { NoRowsOverlay } from "../common/NoRowsOverlay";

const EmployeeTable = ({
  rows,
  loading,
  onEdit,
  onDelete,
  searchActive,
  searchedId,
}) => {
  //  Memoize columns 
  const columns = useMemo(
    () => [
      // {
      //   field: "id",
      //   headerName: "ID",
      //   minWidth: 80,
      //   flex: 0.4,
      // },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.2,
        minWidth: 160,
      },
      {
        field: "mobile",
        headerName: "Mobile",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "country",
        headerName: "Country",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        minWidth: 110,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" gap={0.5} justifyContent="center">
            <Tooltip title="Edit employee" arrow>
              <IconButton
                size="small"
                color="primary"
                aria-label={`Edit employee ${params.row.name}`}
                onClick={() => onEdit(params.row.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete employee" arrow>
              <IconButton
                size="small"
                color="error"
                aria-label={`Delete employee ${params.row.name}`}
                onClick={() => onDelete(params.row.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <Paper sx={{ width: "100%", mt: 2 }} elevation={2}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        slots={{
          noRowsOverlay: () => (
            <NoRowsOverlay
              searchActive={searchActive}
              searchedId={searchedId}
            />
          ),
        }}
        sx={{
      minHeight: 400, 
    }}
      />
    </Paper>
  );
};

export default EmployeeTable;
