import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "stock", headerName: "Stock", flex: 1 },
  { field: "precio", headerName: "Precio", type: "number", flex: 1 },
];

const rows = [
  { id: 1, nombre: "Abc", stock: 5, precio: 35 },
  { id: 2, nombre: "Xyz", stock: 2, precio: 23 },
  { id: 3, nombre: "Auto", stock: 1, precio: 12 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        style={{ marginTop: 20 }}
      />
    </Paper>
  );
}
