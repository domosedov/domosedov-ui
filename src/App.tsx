import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDownIcon } from "./shared/ui/icons/outline";

const accordionVariants: Variants = {
  open: { height: "auto" },
  closed: { height: 0 },
};

const items = {
  key1: "Content 1",
  key2: "Content 2",
  key3: "Content 3",
} as const;

type ItemKey = keyof typeof items;

const App: React.FC = () => {
  const [currentKeys, setCurrentKeys] = React.useState<ItemKey[]>(["key1"]);
  const changeValue = React.useCallback(
    (value: ItemKey[]) => setCurrentKeys(value),
    []
  );
  return (
    <div className="container mx-auto">
      {/* <AccordionPrimitive.Root
        type="single"
        value={currentKey}
        onValueChange={changeValue}
      >
        {Object.entries(items).map(([key, content]) => (
          <AccordionPrimitive.Item key={key} value={key}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group border w-full flex items-center justify-between">
                <span>{key}</span>
                <ChevronDownIcon className="w-6 h-6 will-change-transform transform duration-200 group-radix-state-open:rotate-180" />
              </AccordionPrimitive.Trigger>
              <AnimatePresence>
                {currentKey === key && (
                  <AccordionPrimitive.Content asChild forceMount>
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                    >
                      {content}
                    </motion.div>
                  </AccordionPrimitive.Content>
                )}
              </AnimatePresence>
            </AccordionPrimitive.Header>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root> */}
      <AccordionPrimitive.Root
        type="multiple"
        value={currentKeys}
        onValueChange={changeValue}
      >
        {Object.entries(items).map(([key, content]) => (
          <AccordionPrimitive.Item key={key} value={key}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group border w-full flex items-center justify-between">
                <span>{key}</span>
                <ChevronDownIcon className="w-6 h-6 will-change-transform transform duration-200 group-radix-state-open:rotate-180" />
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
    </div>
  );
};

export default App;
