import Menu from "./assets/Menu.json";
import Pizzas from "./assets/Pizzas.json";
import Cakes from "./assets/Cakes.json";
import Sushis from "./assets/Sushis.json";
import Cocktails from "./assets/Cocktails.json";
import Wines from "./assets/Wines.json";
import Empty from "./assets/Empty.json";

// I originally tried doing this with dynamic imports but the Nitro server doesn't seem to like that idea - or dynamic imports in general
export function getByName(menu: string) {
  switch (menu) {
    case "Menu":
      return Menu;
    case "Pizzas":
      return Pizzas;
    case "Cakes":
      return Cakes;
    case "Sushis":
      return Sushis;
    case "Cocktails":
      return Cocktails;
    case "Wines":
      return Wines;
    case "Weekly":
      return Empty;
    case "Empty":
      return Empty;

    default:
      return null;
  }
}
