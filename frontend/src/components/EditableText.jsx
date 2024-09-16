import React from "react";
import { EditableTextInput } from "./EditableTextInput";
import { ResizableText } from "./ResizableText";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableText({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  color,
  text,
  width,
  onClick,
  height
}) {
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  function handleTextChange(e) {
    onChange(e.currentTarget.value);
  }

  if (isEditing) {
    return (
      <EditableTextInput
        x={x}
        y={y}
        width={width}
        height={height}
        value={text}
        color={color}
        onDoubleClick={onToggleEdit}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
      />
    );
  }
  return (
    <ResizableText
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onClick}
      color={color}
      onDoubleClick={onToggleEdit}
      onResize={onResize}
      text={text}
      width={width}
    />
  );
}
