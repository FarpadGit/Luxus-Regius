import { addMenuProperties, resetMenuInDB } from "../../../serverUtils";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id") ?? "";

    const resetMenu = await resetMenuInDB(id);

    if (resetMenu == null)
      return { error: "Failed to reset menu: No such item in database" };

    return {
      ...resetMenu,
      menu: addMenuProperties(resetMenu.menu),
    };
  } catch (error) {
    console.error("Failed to reset menu in DB: ", error);
  }
});
