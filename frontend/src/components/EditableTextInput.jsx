import React from "react";
import { Html } from "react-konva-utils";

function getStyle(width, height, color) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    color: {color},
    fontSize: "24px",
    fontFamily: "sans-serif"
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    margintop: "-4px"
  };
}

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  color,
  onChange,
  onKeyDown,
  onDoubleClick
}) {
  const style = getStyle(width, height, color);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        onDoubleClick={onDoubleClick}
      />
    </Html>
  );
}
