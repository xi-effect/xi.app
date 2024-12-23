/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { createRef } from 'react';
import { Button } from '@xipkg/button';
import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import { useInterfaceStore } from './interfaceStore';

interface ConfirmSaveProps extends CustomContentProps {
  onReset: () => void;
}

export const ConfirmSave = React.forwardRef<HTMLDivElement, ConfirmSaveProps>((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    // id,
    // message,
    // autoHideDuration,
    // anchorOrigin,
    // hideIconVariant,
    // iconVariant,
    // persist,
    // as well as your own custom props 👇🏼,
    onReset,
    ...other
  } = props;

  const [isLoading, setIsLoading] = React.useState(false);

  const { closeSnackbar } = useSnackbar();

  const handleReset = () => {
    onReset();
    closeSnackbar();
  };

  const buttonRef = createRef<HTMLButtonElement>();

  const onButtonClick = () => {
    if (buttonRef && buttonRef.current && buttonRef.current.click) buttonRef.current.click();
    setIsLoading(true);
  };

  const isAnimation = useInterfaceStore((state) => state.isAnimate);

  return (
    // @ts-expect-error TODO: разобраться с типизацией
    <SnackbarContent ref={ref} role="alert" {...other} className="justify-center">
      <div
        className={`${isAnimation && 'animate-shake'} bg-gray-0 border-gray-30 flex min-h-[80px] w-fit flex-col items-center gap-4 rounded-[16px] border p-4 pl-8 md:flex-row`}
      >
        <span className="mr-2 w-full text-[20px] text-gray-100">
          У вас есть несохраненные изменения
        </span>
        <div className="flex-сol flex h-[48px] gap-4">
          <Button
            disabled={isLoading}
            onClick={handleReset}
            className="pointer w-[120px]"
            variant="ghost"
          >
            Сбросить
          </Button>
          <div>
            {isLoading ? (
              <Button variant="default-spinner" className="w-[160px]" />
            ) : (
              <>
                <Button onClick={onButtonClick} variant="default" className="pointer w-[160px]">
                  Сохранить
                </Button>
                <Button
                  ref={buttonRef}
                  type="submit"
                  form="community-settings-main-page-form"
                  className="sr-only"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </SnackbarContent>
  );
});

ConfirmSave.displayName = 'ConfirmSave';
