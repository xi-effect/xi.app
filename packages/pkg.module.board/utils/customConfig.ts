import {
  // TLUiActionsContextType,
  TLUiComponents,
  // TLUiOverrides,
  // TLUiToolsContextType,
} from 'tldraw';

/*
This is necessary because if we set hiddenUi to the
Tldraw components, all keyboard shortcuts will be hidden as well,
and you'll have to add them by handling keydown events,
which is very time-consuming and not optimized.
*/

export const hiddenComponents: Required<TLUiComponents | any> = {
  ContextMenu: null,
  ActionsMenu: null,
  CursorChatBubble: null,
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

export const colorOptions = [
  { name: 'black', class: 'bg-gray-100' },
  { name: 'blue', class: 'bg-brand-80' },
  { name: 'red', class: 'bg-red-80' },
  { name: 'green', class: 'bg-green-80' },
  { name: 'orange', class: 'bg-orange-80' },
  { name: 'yellow', class: 'bg-yellow-100' },
  { name: 'violet', class: 'bg-violet-100' },
  { name: 'light-violet', class: 'bg-pink-100' },
  { name: 'light-blue', class: 'bg-cyan-100' },
  { name: 'grey', class: 'bg-gray-60' },
] as const;

/*
This example shows how you can replace tldraw's default keyboard shortcuts with your own,
or add a shortcut for an action that doesn't have one. An example of how to add shortcuts
for custom tools or default tools.

You can describe modifier keys with the following syntax:

shift: !
 ctrl/cmd: $
 alt: ?

*/
// const overrides: TLUiOverrides = {
//   actions(_editor, actions): TLUiActionsContextType {
//     const newActions = {
//       ...actions,
//       'toggle-grid': { ...actions['toggle-grid'], kbd: 'x' },
//       'copy-as-png': { ...actions['copy-as-png'], kbd: '$1' },
//     };

//     return newActions;
//   },
//   tools(_editor, tools): TLUiToolsContextType {
//     const newTools = { ...tools, draw: { ...tools.draw, kbd: 'p' } };
//     return newTools;
//   },
// };
