import { useState } from "react";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EmptyState from "../EmptyState";
import { StyledCard } from "../Card";

import { useProducts } from "../../api/product/getProducts";
import { IconButton, Pagination } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UpdateProduct from "./updateProduct";

interface UpdateButtonProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}

export default function ProductsTable({ storeId }: { storeId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(1);
  const take = 2;
  let { data, isLoading, isError } = useProducts(page, take, storeId);

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  const noProducts = !data?.data.length;
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
  for (const p of data.data) {
    const newColumn = {
      id: p.sku,
      sku: p.sku,
      stock: p.stock,
      precio: p.precio,
      disponible: p.disponible,
    };
    rows.push(newColumn);
  }

  function UpdateButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="update"
        onClick={() => {
          setSelectedProduct(params.row);
          setIsModalOpen(true);
        }}
      >
        <CreateIcon />
      </IconButton>
    );
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "SKU", flex: 2 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "precio", headerName: "Precio", type: "number", flex: 1 },
    { field: "disponible", headerName: "Disponible", type: "boolean", flex: 1 },
    {
      field: "action",
      headerName: "Acción",
      type: "actions",
      flex: 1,
      renderCell: (params) => <UpdateButton params={params} />,
    },
  ];

  return (
    <>
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
            checkboxSelection
            style={{ marginTop: 20, minHeight: 200 }}
          />
        </Paper>

        <UpdateProduct
          open={isModalOpen}
          setOpen={setIsModalOpen}
          product={selectedProduct}
        />
      </StyledCard>
      <Pagination
        count={data.meta.pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
}
