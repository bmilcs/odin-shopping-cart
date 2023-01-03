const loadLocalData = (key) => {
  if (key in localStorage) {
    const json = localStorage.getItem(key);
    const data = JSON.parse(json);
    return data;
  }
};

const saveDataLocally = (key, data) => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export { loadLocalData, saveDataLocally };
