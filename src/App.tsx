import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = React.useCallback(() => setIsOpen(false), []);
  const open = React.useCallback(() => setIsOpen(true), []);
  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [drag, setDrag] = React.useState<"y" | false>("y");
  const disableDrag = React.useCallback(() => setDrag(false), []);
  const enableDrag = React.useCallback(() => setDrag("y"), []);
  return (
    <div className="container mx-auto">
      <h1>Home page</h1>
      <button onClick={toggle}>Close</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maxime
        esse. Animi a corporis, rem aut, suscipit laudantium tenetur nobis
        repellendus cupiditate beatae quidem minus. Iste sint autem delectus
        sit?
      </p>
      <AnimatePresence initial={true} exitBeforeEnter={true}>
        {isOpen && (
          <motion.div
            key="modal"
            onPanStart={(event, info) => {
              if (event.target === contentRef.current) {
                event.preventDefault();
                console.log("ffsd");
                disableDrag();
                return;
              } else {
                enableDrag();
              }
            }}
            onPanEnd={(event, info) => {
              console.log(event);
              if (info.offset.y > 200) {
                close();
              }
              console.log(info);
            }}
            drag={drag}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.5}
            dragPropagation={false}
            initial={{ y: 300 }}
            animate={{ y: 0, transition: { duration: 0.15, ease: "linear" } }}
            exit={{ y: 1000, transition: { duration: 0.3, ease: "easeOut" } }}
            className="bg-slate-400 fixed left-0 right-0 bottom-0 top-16 p-5"
          >
            <div ref={contentRef} className="bg-red-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              repellendus ducimus est at qui autem quibusdam earum assumenda
              numquam reprehenderit fuga cum ullam quam dolores mollitia harum
              nesciunt. Velit, modi veritatis nemo cumque corporis, eos
              inventore esse soluta commodi quia neque voluptate natus.
              Asperiores laboriosam molestiae dignissimos. Dignissimos, dolore
              autem!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
