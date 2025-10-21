import { useShops } from "../../api/shop/getShops";
import ShopItem from "./shopItem";

export default function ShopList() {
  // TODO: Return local array of store OR newly created
  return <div>Not implemented</div>;

  const page = 1;
  let { data, isLoading, isError } = useShops(page);

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  const noShops = data?.length === 0;
  if (noShops) return "No shops :(";

  console.log(data);

  return (
    <div className="flex gap-4 flex-col p-8">
      {data?.map((s) => {
        return <ShopItem data={s} key={s.id} />;
      })}
    </div>
  );
}
