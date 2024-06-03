const useLocalStorage = <T>() => {
  function get(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
  function set(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { get, set };
};

export default useLocalStorage;
