import { motion } from "framer-motion";
import * as React from "react";

const menuItems = ["test1", "test2", "test3"];

export const TestTabs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className="flex items-center space-x-2 mt-10">
      {menuItems.map((item, index) => (
        <div
          onClick={() => setCurrentIndex(index)}
          className="px-4 py-2 bg-teal-100 relative"
          key={item}
        >
          <span>{item}</span>
          {currentIndex === index && (
            <motion.div
              transition={{ duration: 0.2 }}
              layoutId="underline"
              className="h-0.5 absolute -bottom-px left-0 right-0 bg-fuchsia-300"
            />
          )}
        </div>
      ))}
    </div>
  );
};
