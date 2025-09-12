import { addMenuProperties, getMenuFromDB } from "../../serverUtils";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id") ?? "";
    const dbMenu = await getMenuFromDB(id);

    return {
      ...dbMenu,
      menu: addMenuProperties(dbMenu.menu),
    };
  } catch (error) {
    console.error("Failed to read from DB: ", error);
  }
});
