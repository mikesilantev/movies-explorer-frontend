import React from 'react'

const useChangeWindowWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const chengeWidth = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", chengeWidth);
    return () => window.removeEventListener("resize", chengeWidth);
  });

  return {
    width,
  }

}

export default useChangeWindowWidth