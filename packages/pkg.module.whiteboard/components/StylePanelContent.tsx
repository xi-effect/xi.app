import React from 'react';
import {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  ArrowheadStylePickerSet,
  CommonStylePickerSet,
  DefaultFontStyle,
  GeoShapeGeoStyle,
  GeoStylePickerSet,
  LineShapeSplineStyle,
  SplineStylePickerSet,
  TLUiStylePanelContentProps,
  TextStylePickerSet,
  getDefaultColorTheme,
  useIsDarkMode,
} from 'tldraw';

export const StylePanelContent = ({ styles }: TLUiStylePanelContentProps) => {
  const isDarkMode = useIsDarkMode();

  if (!styles) return null;

  const geo = styles.get(GeoShapeGeoStyle);
  const arrowheadEnd = styles.get(ArrowShapeArrowheadEndStyle);
  const arrowheadStart = styles.get(ArrowShapeArrowheadStartStyle);
  const spline = styles.get(LineShapeSplineStyle);
  const font = styles.get(DefaultFontStyle);

  const hideGeo = geo === undefined;
  const hideArrowHeads = arrowheadEnd === undefined && arrowheadStart === undefined;
  const hideSpline = spline === undefined;
  const hideText = font === undefined;

  const theme = getDefaultColorTheme({ isDarkMode });

  return (
    <>
      <CommonStylePickerSet theme={theme} styles={styles} />
      {!hideText && <TextStylePickerSet theme={theme} styles={styles} />}
      {!(hideGeo && hideArrowHeads && hideSpline) && (
        <div className="tlui-style-panel__section" aria-label="style panel styles">
          <GeoStylePickerSet styles={styles} />
          <ArrowheadStylePickerSet styles={styles} />
          <SplineStylePickerSet styles={styles} />
        </div>
      )}
    </>
  );
};
