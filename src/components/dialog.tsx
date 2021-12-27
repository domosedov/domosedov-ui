import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { XIcon } from "@domosed/shared/ui/icons/outline";

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

type DialogContextProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DialogContext = React.createContext<DialogContextProps>(null!);

type DialogProps = {
  trigger: JSX.Element;
  children: React.ReactNode;
  title?: JSX.Element;
  description?: JSX.Element;
};

type DialogRef = {
  open: () => void;
  enableInteractOutside: () => void;
  disableInteractOutside: () => void;
};

const Dialog = React.forwardRef<DialogRef, DialogProps>(
  ({ trigger, children, title, description }, forwardedRef) => {
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
      <DialogContext.Provider value={contextValue}>
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
          <AnimatePresence>
            {isOpen && (
              <DialogPrimitive.Portal forceMount key="portal">
                <DialogPrimitive.Overlay key="overlay" forceMount asChild>
                  <motion.div
                    className="fixed inset-0 bg-black/20"
                    variants={overlayVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  />
                </DialogPrimitive.Overlay>
                <DialogPrimitive.Content
                  key="content"
                  forceMount
                  asChild
                  onEscapeKeyDown={handleInteractOutside}
                  onPointerDownOutside={handleInteractOutside}
                  onInteractOutside={handleInteractOutside}
                >
                  <motion.div
                    className="bg-white fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform w-[90vw] h-fit overflow-y-auto max-h-[80vh] max-w-sm px-6 py-8 rounded-2xl outline-none focus:outline-none lg:p-10"
                    variants={contentVariants}
                    initial="hide"
                    animate="show"
                    exit="hide"
                  >
                    <DialogPrimitive.Close
                      className="absolute top-0 right-0 mt-3 mr-3 rounded"
                      disabled={!interactOutside}
                    >
                      <AccessibleIcon.Root label="Закрыть">
                        <XIcon className="w-8 h-8 stroke-2 stroke-current" />
                      </AccessibleIcon.Root>
                    </DialogPrimitive.Close>
                    {title && (
                      <DialogPrimitive.Title asChild>
                        {title}
                      </DialogPrimitive.Title>
                    )}
                    {description && (
                      <DialogPrimitive.Description asChild>
                        {description}
                      </DialogPrimitive.Description>
                    )}
                    {children}
                  </motion.div>
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            )}
          </AnimatePresence>
        </DialogPrimitive.Root>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = "Dialog";

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogContext");
  }
  return context;
};

export { Dialog, useDialogContext, type DialogProps, type DialogRef };
