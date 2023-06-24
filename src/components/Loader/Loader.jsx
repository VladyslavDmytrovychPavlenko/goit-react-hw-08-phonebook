import React from 'react';
import { MoonLoader } from 'react-spinners';

const CustomLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <MoonLoader
        color="#e15b64"
        size={80}
        loading={true}
        aria-label="CustomLoader-loading"
      />
    </div>
  );
};

export default CustomLoader;
