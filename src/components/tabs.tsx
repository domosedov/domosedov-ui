import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const Tab1: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  return (
    <div>
      <h2>Далеко-далеко за словесными горами в стране.</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

const tabs = {
  "tab-2": <Tab1 />,
  "tab-1": (
    <div>
      Далеко-далеко за словесными горами в стране гласных и согласных живут
      рыбные тексты. Лучше толку маленький продолжил, собрал осталось себя даже
      взобравшись свой знаках, ему, что ты. Реторический грустный безопасную
      живет заглавных своего текстами первую, последний мир маленькая своих
      приставка языкового, осталось рыбными.
    </div>
  ),
} as const;

type TabKey = keyof typeof tabs;

export const Tabs: React.FC = () => {
  const [currentTabKey, setCurrentTabKey] = React.useState<TabKey>("tab-1");
  const changeCurrentTabKey = React.useCallback(
    (value: string) => setCurrentTabKey(value as TabKey),
    []
  );
  return (
    <TabsPrimitive.Root
      value={currentTabKey}
      onValueChange={changeCurrentTabKey}
    >
      <TabsPrimitive.List asChild>
        <nav className="inline-flex items-center">
          {Object.keys(tabs).map((key) => (
            <TabsPrimitive.Trigger
              key={key}
              value={key}
              className="relative bg-teal-200 px-6 py-2 duration-200 hover:bg-teal-400 radix-state-active:bg-fuchsia-100"
            >
              <span>{key}</span>
              {currentTabKey === key && (
                <motion.div
                  layoutId="underline"
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-fuchsia-300"
                />
              )}
            </TabsPrimitive.Trigger>
          ))}
        </nav>
      </TabsPrimitive.List>
      <AnimatePresence initial={false}>
        {Object.entries(tabs).map(([key, content]) => (
          <TabsPrimitive.Content key={key} value={key} asChild>
            <motion.div
              className="mt-2 border p-2 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {content}
            </motion.div>
          </TabsPrimitive.Content>
        ))}
      </AnimatePresence>
    </TabsPrimitive.Root>
  );
};
