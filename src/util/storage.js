const loadFromLocalStorage = (key) => {
  if (key in localStorage) {
    const json = localStorage.getItem(key);
    const data = JSON.parse(json);
    return data;
  }
};

const saveToLocalStorage = (key, data) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export { loadFromLocalStorage, saveToLocalStorage };
