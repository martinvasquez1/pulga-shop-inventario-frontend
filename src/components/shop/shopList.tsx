export function ShopItem() {
  return (
    <div>
      <div>Shop item</div>
    </div>
  );
}

export default function ShopList() {
  return (
    <div className="flex gap-4 flex-col p-8">
      <ShopItem />
      <ShopItem />
      <ShopItem />
    </div>
  );
}
