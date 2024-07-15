import { TLUiComponents } from 'tldraw';

/* 
This is necessary because if we set hiddenUi to the 
Tldraw components, all keyboard shortcuts will be hidden as well,
and you'll have to add them by handling keydown events,
which is very time-consuming and not optimized.
*/

export const hiddenComponents: Required<TLUiComponents> = {
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
  Toolbar: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugPanel: null,
  DebugMenu: null,
  SharePanel: null,
  MenuPanel: null,
  TopPanel: null,
};
