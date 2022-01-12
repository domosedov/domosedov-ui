import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ToolbarPrimitive.Root className="h-16 flex items-center justify-between bg-fuchsia-300">
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Trigger>Open</DialogPrimitive.Trigger>
        <DialogPrimitive.Close>Close</DialogPrimitive.Close>
        <AnimatePresence>
          {isOpen && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  className="bg-emerald-100 fixed top-16 left-0 bottom-0 w-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: "linear" }}
                >
                  <DialogPrimitive.Close asChild>
                    <button className="border p-5">Close</button>
                  </DialogPrimitive.Close>
                  <div className="p-4">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Numquam ex repellat praesentium veritatis, quas provident
                      veniam et rem amet sint perferendis architecto totam fuga
                      ea sit optio accusamus ipsum iste dicta dolor, distinctio
                      molestias sapiente! Vel pariatur nam odit sunt, qui libero
                      cumque obcaecati, consequatur eos necessitatibus
                      reiciendis corrupti quidem.
                    </p>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </ToolbarPrimitive.Root>
  );
};
