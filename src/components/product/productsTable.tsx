import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns: GridColDef[] = [
  { field: "id", headerName: "SKU", flex: 2 },
  { field: "stock", headerName: "Stock", type: "number", flex: 1 },
  { field: "precio", headerName: "Precio", type: "number", flex: 1 },
  { field: "disponible", headerName: "Disponible", type: "boolean", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsTable({ storeId }: { storeId: number }) {
  const AllProducts = JSON.parse(localStorage.getItem("products")) || [];
  const products = AllProducts.filter((p) => p.id_tienda === storeId);

  if (products.length === 0) return "No products";

  const rows: any = [];
  for (const p of products) {
    const newColumn = {
      id: p.sku,
      stock: p.stock,
      precio: p.precio,
      disponible: p.disponible,
    };
    rows.push(newColumn);
  }

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
