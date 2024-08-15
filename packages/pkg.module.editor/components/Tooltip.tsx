import * as React from 'react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    useDelayGroup,
    useDelayGroupContext,
    useMergeRefs,
    useTransitionStyles,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';

interface TooltipOptions {
    initialOpen?: boolean;
    placement?: Placement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
    initialOpen = false,
    placement = 'top',
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const { delay } = useDelayGroupContext();

    const data = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [offset(5), flip(), shift()],
    });

    const { context } = data;

    const hover = useHover(context, {
        move: false,
        enabled: controlledOpen == null,
        delay,
    });
    const focus = useFocus(context, {
        enabled: controlledOpen == null,
    });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const interactions = useInteractions([hover, focus, dismiss, role]);

    return React.useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data,
        }),
        [open, setOpen, interactions, data],
    );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipState = () => {
    const context = React.useContext(TooltipContext);

    if (context == null) {
        throw new Error('Tooltip components must be wrapped in <Tooltip />');
    }

    return context;
};

export function Tooltip({
    children,
    ...options
}: { children: React.ReactNode } & TooltipOptions) {
    const tooltip = useTooltip(options);
    return (
      <TooltipContext.Provider value={tooltip}>
        {children}
      </TooltipContext.Provider>
    );
}

// eslint-disable-next-line react/display-name
export const TooltipTrigger = React.forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(({ children, asChild = false, ...props }, propRef) => {
    const state = useTooltipState();

    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children,
            state.getReferenceProps({
                ref,
                ...props,
                ...children.props,
                'data-state': state.open ? 'open' : 'closed',
            }),
        );
    }

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        ref={ref}
            // The user can style the trigger based on the state
        data-state={state.open ? 'open' : 'closed'}
        {...state.getReferenceProps(props)}
      >
        {children}
      </button>
    );
});

// eslint-disable-next-line react/display-name
export const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
    const state = useTooltipState();
    const { isInstantPhase, currentId } = useDelayGroupContext();
    const ref = useMergeRefs([state.refs.setFloating, propRef]);

    useDelayGroup(state.context, { id: state.context.floatingId });

    const instantDuration = 0;
    const duration = 250;

    const { isMounted, styles } = useTransitionStyles(state.context, {
        duration: isInstantPhase
            ? {
                open: instantDuration,
                // `id` is this component's `id`
                // `currentId` is the current group's `id`
                close: currentId === state.context.floatingId ? duration : instantDuration,
            }
            : duration,
        initial: {
            opacity: 0,
        },
    });

    if (!isMounted) return null;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          className="bg-gray-0 overflow-hidden rounded-md px-3 py-1.5 text-sm text-gray-100 font-semibold shadow-[rgba(100,100,111,0.3)_0px_7px_29px_0px]"
          style={{
                    ...state.floatingStyles,
                    // eslint-disable-next-line react/prop-types
                    ...props.style,
                    ...styles,
                }}
          {...state.getFloatingProps(props)}
        />
      </FloatingPortal>
    );
});
