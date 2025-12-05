import React from 'react';
import { BRUSH_SIZES } from '../../../utils/constants';
import styles from './DrawingTools.module.css';

interface BrushSizePickerProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

export const BrushSizePicker: React.FC<BrushSizePickerProps> = ({
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className={styles.brushSizePicker}>
      {BRUSH_SIZES.map((size) => (
        <button
          key={size}
          className={`${styles.sizeButton} ${
            selectedSize === size ? styles.selected : ''
          }`}
          onClick={() => onSizeChange(size)}
          aria-label={`Brush size ${size}`}
        >
          <div
            className={styles.sizeIndicator}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        </button>
      ))}
    </div>
  );
};

