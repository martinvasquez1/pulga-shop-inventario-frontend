import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Product } from "../../types/api";

interface DrawerItemProps {
  name: string;
  text: string;
  icon: React.ReactNode;
}

function DrawerItem({ name, text, icon }: DrawerItemProps) {
  return (
    <ListItem disablePadding>
      {icon}
      <ListItemText primary={name} />
      <p>{text}</p>
    </ListItem>
  );
}
interface ProductDrawerProps {
  open: boolean;
  toggleDrawer: (v: boolean) => void;
  product: Product | null;
}

export default function ProductDrawer({
  open,
  toggleDrawer,
  product,
}: ProductDrawerProps) {
  if (!product) return null;

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{ width: 500, padding: 2 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div>
            <Typography variant="h6" gutterBottom>
              {product.nombre}
            </Typography>
            <Typography>SKU: {product.sku}</Typography>
          </div>
        </Box>

        <List>
          <DrawerItem
            name="Descripción"
            text={product.descripcion}
            icon={<MailIcon />}
          />
          <DrawerItem name="Marca" text={product.marca} icon={<MailIcon />} />
          <DrawerItem
            name="Precio"
            text={String(product.precio)}
            icon={<MailIcon />}
          />
          <DrawerItem
            name="Condición"
            text={product.condicion}
            icon={<MailIcon />}
          />
          <DrawerItem
            name="Stock"
            text={String(product.stock)}
            icon={<MailIcon />}
          />

          <DrawerItem name="Categorias" text="" icon={<MailIcon />} />
          <div>
            {product.categorias.map((c) => (
              <p>{c}</p>
            ))}
          </div>

          <DrawerItem
            name="Rating"
            text={String(product.rating)}
            icon={<MailIcon />}
          />
          <DrawerItem
            name="Disponible"
            text={String(product.disponible)}
            icon={<MailIcon />}
          />
        </List>
        <Divider />
        <p>Fotos</p>
        <div>
          {product.fotos.map((f) => {
            return (
              <div className="aspect-square">
                <img src={f} />
              </div>
            );
          })}
        </div>
      </Box>
    </Drawer>
  );
}
