import { ArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { CreateShopResponse } from "../../api/shop/createShop";

interface ShopItemProps {
  data: CreateShopResponse;
}

export default function ShopItem({ data }: ShopItemProps) {
  return (
    <div className="flex gap-4 justify-between">
      <div>
        <h2 className="text-xl font-bold">{data.nombre}</h2>
        <p>{data.descripcion}</p>
      </div>
      <div>
        <Button
          href={`/tiendas/${data.id_tienda}`}
          startIcon={<ArrowRight />}
          variant="outlined"
        >
          Ir a la Tienda
        </Button>
      </div>
    </div>
  );
}
