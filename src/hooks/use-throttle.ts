const useThrottle = (fn: Function, delay: number) => {
  let lastExTime = 0;
  return function (...args: any[]) {
    const currTime = Date.now();
    if (currTime - lastExTime < delay) return;
    lastExTime = currTime;
    return fn(...args);
  };
};
export default useThrottle;
