import { ArrowRight } from "@mui/icons-material";
import { Button, IconButton, Link } from "@mui/material";

interface Props {
  data: {
    id: number;
    name: string;
    description: string;
  };
}

export default function ShopItem({ data }: Props) {
  return (
    <div className="flex gap-4 justify-between">
      <div>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p>{data.description}</p>
      </div>
      <div>
        <Button
          href={`/tiendas/${data.id}`}
          startIcon={<ArrowRight />}
          variant="outlined"
        >
          Ir a la Tienda
        </Button>
      </div>
    </div>
  );
}
