const useLocalStorage = (key: string) => {
  const set = (value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const get = () => {
    return JSON.parse(window.localStorage.getItem(key) || "");
  };

  const remove = () => {
    window.localStorage.removeItem(key);
  };

  return { set, get, remove };
};

export default useLocalStorage;
