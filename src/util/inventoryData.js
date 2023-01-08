import { loadLocalData, saveDataLocally } from "./storage";

const INVENTORY_KEY = "facadeInventory";

// load inventory from localstorage if it exists
// else fetch it via api
const getInventory = async (url, setIsFetching, setProductList) => {
  if (INVENTORY_KEY in localStorage) {
    setIsFetching(false);
    setProductList(loadLocalData(INVENTORY_KEY));
    return;
  }

  try {
    const data = await fetchData(url);
    saveDataLocally(INVENTORY_KEY, data);
    setProductList(data);
    setIsFetching(false);
  } catch (error) {
    console.warn(`Facade Error: ${error}`);
  }
};

const fetchData = async (url) => {
  return fetch(url).then((response) => response.json());
};

export { getInventory };
