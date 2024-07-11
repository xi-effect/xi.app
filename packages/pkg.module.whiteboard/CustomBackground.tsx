import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DefaultGrid } from './DefaultGrid';

export function CustomBackground() {
  return <DefaultGrid x={0} y={0} z={1} size={10} />;
}
