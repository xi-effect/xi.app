import React from 'react';
import { DefaultStylePanel, TLUiStylePanelProps, useRelevantStyles } from 'tldraw';
import { StylePanelContent } from './StylePanelContent';

export const StylePanel = (props: TLUiStylePanelProps) => {
  const styles = useRelevantStyles();

  return (
    <div className="absolute right-4 top-20">
      <DefaultStylePanel {...props}>
        <StylePanelContent styles={styles} />
      </DefaultStylePanel>
    </div>
  );
};
