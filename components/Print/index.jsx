import React from "react";
import { useReactToPrint } from "react-to-print";

const Print = ({ children, print }) => {
  const [count, setCount] = React.useState(0);
  let ref = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  React.useEffect(() => {
    if (print && count === 0) {
      setCount(prev => prev + 1);
      handlePrint();
    }
  }, [print, handlePrint, count]);

  React.useEffect(() => {
    if (!print) setCount(0);
  }, [print]);

  return <div ref={ref}>{children}</div>;
};

export default React.memo(Print);
