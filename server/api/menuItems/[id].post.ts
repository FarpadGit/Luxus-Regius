import { saveMenuToDB } from "../../serverUtils";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id") ?? "";
    const { newMenu, newTemplateData } = await readBody(event);
    const menuJSON = JSON.stringify({
      template: newTemplateData,
      menu: newMenu,
    });

    saveMenuToDB(id, menuJSON);
  } catch (error) {
    console.error("Failed to save to DB: ", error);
  }
});
