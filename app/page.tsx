import Food from "@/components/Home/Food";
import Menu from "@/components/Home/Menu";
import { menus } from "@/constants/menus";
import { supabase } from "@/actions/getMeals";

export default async function Home() {
  const foods = [1, 2, 3];
  let {
    data: food,
    error,
    count,
    status,
    statusText,
  } = await supabase.from("food").select("*");

  console.log(food, "l");
  console.log(error);
  console.log(status);
  console.log(statusText);

  return (
    <main className="home">
      <h1 className="home-heading">Explore Menu</h1>
      <div className="home-menus">
        <div>
          {menus.map((menu) => (
            <Menu key={menu} text={menu} />
          ))}
        </div>
      </div>
      <div className="home-foods">
        {food?.map((item) => (
          <Food key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
