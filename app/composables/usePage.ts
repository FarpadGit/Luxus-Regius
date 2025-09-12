export function usePage(apiEndpoint: string, isLoading: Ref<boolean>) {
  async function fetchMenu() {
    isLoading.value = true;
    const response = await useFetch<any>("/api/menuItems/" + apiEndpoint);
    const menuData = response.data.value;
    isLoading.value = false;
    return [menuData.menu, menuData.template];
  }

  async function saveData(data: {
    newMenu: categoryType[];
    newTemplateData: templateData;
  }) {
    isLoading.value = true;
    await $fetch<any>("/api/menuItems/" + apiEndpoint, {
      method: "POST",
      body: data,
    });
    isLoading.value = false;
  }

  async function reset() {
    isLoading.value = true;
    const menuData = await $fetch<any>("/api/menuItems/reset/" + apiEndpoint, {
      method: "POST",
    });
    isLoading.value = false;
    if (menuData.error) return [[], {}];
    return [menuData.menu, menuData.template];
  }

  return { fetchMenu, saveData, reset };
}
