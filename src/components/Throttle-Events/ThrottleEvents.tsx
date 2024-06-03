import { useEffect, useState } from "react";
import useThrottle from "../../hooks/use-throttle";

export const ThrottleWindowResize = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      const { innerHeight: height, innerWidth: width } = window;
      setDimensions({ width, height });
    };
    window.addEventListener("resize", useThrottle(handler, 1000));
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div>
      window size {dimensions.width} X {dimensions.height}
    </div>
  );
};
export default ThrottleWindowResize;
