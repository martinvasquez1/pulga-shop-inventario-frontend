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
import { Box, IconButton, Pagination } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SegmentSharp from "@mui/icons-material/SegmentSharp";
import UpdateProduct from "./updateProduct";
import ProductDrawer from "./product-drawer";
import { Product } from "../../types/api";
import { mockFotos } from "../../mocks/data";

interface UpdateButtonProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}

export default function ProductsTable({ storeId }: { storeId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [page, setPage] = useState(1);
  const take = 2;
  let { data, isLoading, isError } = useProducts(page, take, storeId);

  if (isLoading) return "Loading...";
  if (isError) return "Error!";
  if (!data) return null;
  if (!data.data) return null;

  const noProducts = !data.data.length;
  if (noProducts)
    return (
      <EmptyState
        title="No hay productos disponibles"
        body={
          'Parece que aún no hay productos. Puedes agregar tu propio producto haciendo clic en el \nbotón "Agregar" en la esquina superior derecha.'
        }
      />
    );

  function setProduct(sku: string) {
    const product = data!.data.find((p) => p.sku == sku);
    if (product) {
      setSelectedProduct(product);
    }
  }

  function UpdateButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="update"
        onClick={() => {
          setProduct(params.row.sku);
          setIsModalOpen(true);
        }}
      >
        <CreateIcon />
      </IconButton>
    );
  }

  function DetailsButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="details"
        onClick={() => {
          setProduct(params.row.sku);
          setIsDrawerOpen(true);
        }}
      >
        <SegmentSharp />
      </IconButton>
    );
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const rows: any = [];
  for (const p of data.data) {
    const newColumn = { id: p.sku, ...p };
    rows.push(newColumn);
  }

  const columns: GridColDef[] = [
    {
      field: "foto",
      headerName: "Foto",
      renderCell: () => {
        return (
          <div className="aspect-square max-h-full">
            <img src={mockFotos[0]} />{" "}
          </div>
        );
      },
    },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "id", headerName: "SKU", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "precio", headerName: "Precio", type: "number", flex: 1 },
    {
      field: "action",
      headerName: "Acción",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <UpdateButton params={params} /> <DetailsButton params={params} />
        </div>
      ),
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
        <ProductDrawer
          open={isDrawerOpen}
          toggleDrawer={setIsDrawerOpen}
          product={selectedProduct}
        />
        <UpdateProduct
          open={isModalOpen}
          setOpen={setIsModalOpen}
          product={selectedProduct}
        />
      </StyledCard>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={data.meta.pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
