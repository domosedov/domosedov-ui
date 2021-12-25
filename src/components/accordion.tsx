import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDownIcon } from "../shared/ui/icons/outline";

const accordionVariants: Variants = {
  open: { height: "auto", transition: { ease: "easeIn", duration: 0.2 } },
  closed: { height: 0, transition: { ease: "easeOut", duration: 0.1 } },
};

const items = {
  key1: "Content 1",
  key2: "Content 2",
  key3: "Content 3",
} as const;

type ItemKey = keyof typeof items;

export const Accordion: React.FC = () => {
  const [currentKeys, setCurrentKeys] = React.useState<ItemKey[]>([]);
  const changeValue = React.useCallback(
    (value: ItemKey[]) => setCurrentKeys(value),
    []
  );

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={currentKeys}
      onValueChange={changeValue}
      className="flex flex-col divide-y border-y"
    >
      {Object.entries(items).map(([key, content]) => (
        <AccordionPrimitive.Item key={key} value={key}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group w-full flex items-center justify-between px-4 py-2">
              <span>{key}</span>
              <ChevronDownIcon className="w-6 h-6 will-change-transform transform duration-200 group-radix-state-open:rotate-180 stroke-red-500 stroke-2" />
            </AccordionPrimitive.Trigger>
            <AnimatePresence>
              {currentKeys.includes(key as ItemKey) && (
                <AccordionPrimitive.Content asChild forceMount>
                  <motion.div
                    className="overflow-hidden"
                    variants={accordionVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <div className="p-4 bg-slate-100">{content}</div>
                  </motion.div>
                </AccordionPrimitive.Content>
              )}
            </AnimatePresence>
          </AccordionPrimitive.Header>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};
