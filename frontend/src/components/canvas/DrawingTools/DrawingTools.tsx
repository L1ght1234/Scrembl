import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { BrushSizePicker } from './BrushSizePicker';
import { ToolButton } from './ToolButton';
import styles from './DrawingTools.module.css';

interface DrawingToolsProps {
  onColorChange?: (color: string) => void;
  onBrushSizeChange?: (size: number) => void;
  onClear?: () => void;
  defaultColor?: string;
  defaultBrushSize?: number;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  onColorChange,
  onBrushSizeChange,
  onClear,
  defaultColor = '#000000',
  defaultBrushSize = 6,
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [brushSize, setBrushSize] = useState(defaultBrushSize);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    if (onBrushSizeChange) {
      onBrushSizeChange(size);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={styles.container}>
      <ColorPicker selectedColor={selectedColor} onColorChange={handleColorChange} />
      <BrushSizePicker
        selectedSize={brushSize}
        onSizeChange={handleBrushSizeChange}
      />
      <ToolButton icon="🗑️" label="Clear" onClick={handleClear} />
    </div>
  );
};

