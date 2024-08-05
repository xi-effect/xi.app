/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Menu } from './components/Menu';
import { Content } from './Content';
import { useInterfaceStore } from './interfaceStore';
import { ConfirmSave } from './ConfirmSave';
import { Header } from './components/Header';

declare module 'notistack' {
  interface VariantOverrides {
    // adds `myCustomVariant` variant
    confirmSave: {
      onReset: () => void;
    };
  }
}

export const CommunitySettings = () => {
  const isMenu = useInterfaceStore((state) => state.isMenu);

  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={1}
      Components={{
        confirmSave: ConfirmSave,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      dense
      autoHideDuration={null}
    >
      <div className="flex w-full justify-center">
        <div className="flex h-full min-h-full w-full max-w-[1132px] flex-col">
          <Header />
          <div className="mt-4 hidden h-full flex-row sm:flex">
            <Menu />
            <Content />
          </div>
          <div className="mt-4 flex h-full flex-row sm:hidden">
            {isMenu ? <Menu /> : <Content />}
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};
