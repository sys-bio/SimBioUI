import React from 'react';
import { ClipLoader } from 'react-spinners';

const loaderStyle = {
  display: 'flex'
};

/**
 * @description Loader component
 * @param {boolean} loading - The loading boolean
 * @returns - Loader component
 */
const CustomLoader = ({ loading }) => {
  return (
    <div style={loaderStyle}>
      <ClipLoader size={10} color={'#09a7f0'} loading={loading} />
    </div>
  );
};

export default CustomLoader;
