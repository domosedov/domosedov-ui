import * as React from "react";
import * as AlertPrimitive from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const overlayVariants: Variants = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const contentVariants: Variants = {
  hide: {
    opacity: 0,
    y: "-48%",
    x: "-50%",
    scale: 0.96,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  show: {
    opacity: 1,
    y: "-50%",
    x: "-50%",
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

type AlertDialogContextProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AlertDialogContext = React.createContext<AlertDialogContextProps>(null!);

type AlertDialogProps = {
  trigger: JSX.Element;
  action: JSX.Element;
  cancel: JSX.Element;
  children?: React.ReactNode;
  title?: JSX.Element;
  description?: JSX.Element;
};

type AlertDialogRef = {
  open: () => void;
  enableInteractOutside: () => void;
  disableInteractOutside: () => void;
};

const AlertDialog = React.forwardRef<AlertDialogRef, AlertDialogProps>(
  ({ trigger, children, title, description, action, cancel }, forwardedRef) => {
    console.log(title);
    const [isOpen, setIsOpen] = React.useState(false);
    const open = React.useCallback(() => setIsOpen(true), []);
    const close = React.useCallback(() => setIsOpen(false), []);
    const contextValue = React.useMemo(
      () => ({ isOpen, open, close }),
      [close, isOpen, open]
    );
    const [interactOutside, setInteractOutside] = React.useState(true);
    const enableInteractOutside = React.useCallback(
      () => setInteractOutside(true),
      []
    );
    const disableInteractOutside = React.useCallback(
      () => setInteractOutside(false),
      []
    );

    const handleInteractOutside = (event: Event) =>
      interactOutside ? close() : event.preventDefault();

    React.useImperativeHandle(forwardedRef, () => ({
      open,
      enableInteractOutside,
      disableInteractOutside,
    }));

    return (
      <AlertDialogContext.Provider value={contextValue}>
        <AlertPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <AlertPrimitive.Trigger asChild>{trigger}</AlertPrimitive.Trigger>
          <AnimatePresence>
            {isOpen && (
              <AlertPrimitive.Portal forceMount key="portal">
                <AlertPrimitive.Overlay key="overlay" forceMount asChild>
                  <motion.div
                    className="fixed inset-0 bg-black/20"
                    variants={overlayVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  />
                </AlertPrimitive.Overlay>
                <AlertPrimitive.Content
                  key="content"
                  forceMount
                  asChild
                  onEscapeKeyDown={handleInteractOutside}
                >
                  <motion.div
                    className="bg-white fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform w-[90vw] h-fit overflow-y-auto max-h-[80vh] max-w-sm px-6 py-8 rounded-2xl outline-none focus:outline-none lg:p-10"
                    variants={contentVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  >
                    {title && (
                      <AlertPrimitive.Title asChild>
                        {title}
                      </AlertPrimitive.Title>
                    )}
                    {description && (
                      <AlertPrimitive.Description asChild>
                        {description}
                      </AlertPrimitive.Description>
                    )}
                    {children}
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
                      <AlertPrimitive.Action asChild>
                        {action}
                      </AlertPrimitive.Action>
                      <AlertPrimitive.Cancel asChild>
                        {cancel}
                      </AlertPrimitive.Cancel>
                    </div>
                  </motion.div>
                </AlertPrimitive.Content>
              </AlertPrimitive.Portal>
            )}
          </AnimatePresence>
        </AlertPrimitive.Root>
      </AlertDialogContext.Provider>
    );
  }
);

AlertDialog.displayName = "AlertDialog";

const useAlertDialogContext = () => {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "useAlertDialogContext must be used within a AlertDialogContext"
    );
  }
  return context;
};

export {
  AlertDialog,
  useAlertDialogContext,
  type AlertDialogProps,
  type AlertDialogRef,
};
