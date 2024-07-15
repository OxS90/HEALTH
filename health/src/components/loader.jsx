import React from "react";
import { Hourglass } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";

function Loader({ size }) {
  const less768px = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div style={styles.loaderWrapper}>
      <Hourglass
        visible={true}
        height="80"
        width={less768px ? "60" : size || "100"}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["grey", "#A4BE5C"]}
      />
    </div>
  );
}

const styles = {
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#F0F1F3',
    zIndex: 9999,
  },
};

export default Loader;
