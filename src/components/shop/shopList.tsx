import { CreateShopResponse } from "../../api/shop/createShop";
import ShopItem from "./shopItem";

export default function ShopList() {
  /*
  const page = 1;
  let { data, isLoading, isError } = useShops(page);

  if (isLoading) return "Loading...";
  if (isError) return "Error!";
  */

  // TODO: Remove, it's temp
  const data = JSON.parse(localStorage.getItem("stores")) || [];

  const noShops = data?.length === 0;
  if (noShops) return "No shops :(";

  console.log(data);

  return (
    <div className="flex gap-8 flex-col">
      {data?.map((s: CreateShopResponse) => {
        return <ShopItem data={s} key={s.id_tienda} />;
      })}
    </div>
  );
}
