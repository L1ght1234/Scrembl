import React from 'react';
import { CANVAS_COLORS } from '../../../utils/constants';
import styles from './DrawingTools.module.css';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className={styles.colorPicker}>
      {CANVAS_COLORS.map((color) => (
        <button
          key={color}
          className={`${styles.colorButton} ${
            selectedColor === color ? styles.selected : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};

