import React from "react";
import { useReactToPrint } from "react-to-print";

const Print = ({ children, print }) => {
  let ref = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  React.useEffect(() => {
    if (print) handlePrint();
  }, [print, handlePrint]);

  return <div ref={ref}>{children}</div>;
};

export default Print;
