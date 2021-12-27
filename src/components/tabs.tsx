import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";

const Tab1: React.FC = () => {
  React.useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);
  return (
    <div>
      <h2>Далеко-далеко за словесными горами в стране.</h2>
      <p>
        Далеко-далеко за словесными горами в стране гласных и согласных живут
        рыбные тексты. Пор, имени все. От всех своего меня но пустился
        всемогущая текст, единственное скатился ручеек вопроса проектах строчка,
        запятой имени рыбного приставка семантика. Прямо, агентство? Вдали назад
        текстами журчит наш безорфографичный живет великий строчка бросил
        осталось ее она меня выйти большой до переписали о запятых своего дал,
        над деревни составитель там залетают знаках снова! Сбить, моей. Ты
        пустился коварный до заголовок власти. Жаренные текстов от всех коварных
        пор заглавных вскоре, напоивший, семантика, большого океана свой ему на
        берегу буквоград подзаголовок переулка приставка выйти диких запятых
        своего пустился взгляд языкового. Текстами назад пустился путь жаренные.
      </p>
    </div>
  );
};

const tabs = {
  "tab-1": <Tab1 />,
  "tab-2": (
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
