import React from 'react'
import styles from './product-info.module.scss';

const ProductColorsVariants = ({ colorsList, onChangeColor, activeColor }) => {

  function handleColorChange(c) {
    onChangeColor(c)
  }
  return (
    <>
      {colorsList.map((color, i) => <div
        onClick={() => handleColorChange(color)}
        className={styles.color_box}
        style={{ backgroundColor: color, border: `3px solid ${activeColor == color ? "#000" : color}` }}
      >
      </div>)}
    </>
  )
}

export default ProductColorsVariants;
