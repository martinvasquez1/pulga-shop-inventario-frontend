import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EmptyState from "../EmptyState";
import { StyledCard } from "../Card";

import { useProducts } from "../../api/product/getProducts";

const columns: GridColDef[] = [
  { field: "id", headerName: "SKU", flex: 2 },
  { field: "stock", headerName: "Stock", type: "number", flex: 1 },
  { field: "precio", headerName: "Precio", type: "number", flex: 1 },
  { field: "disponible", headerName: "Disponible", type: "boolean", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsTable({ storeId }: { storeId: number }) {
  const page = 1;
  let { data, isLoading, isError } = useProducts(page, storeId);

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  const noProducts = !data?.length;
  if (noProducts)
    return (
      <EmptyState
        title="No hay productos disponibles"
        body={
          'Parece que aún no hay productos. Puedes agregar tu propio producto haciendo clic en el \nbotón "Agregar" en la esquina superior derecha.'
        }
      />
    );

  const rows: any = [];
  for (const p of data) {
    const newColumn = {
      id: p.sku,
      stock: p.stock,
      precio: p.precio,
      disponible: p.disponible,
    };
    rows.push(newColumn);
  }

  return (
    <StyledCard>
      <Paper
        sx={{
          width: "100%",
          outline: "3px solid",
          outlineColor: "hsla(210, 98%, 48%, 0.5)",
          outlineOffset: "2px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          style={{ marginTop: 20, minHeight: 200 }}
        />
      </Paper>
    </StyledCard>
  );
}
