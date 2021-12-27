import * as React from "react";
import { Listbox as Select } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "../shared/ui/icons/outline";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  { id: 6, name: "Lorenz Schimmel" },
  { id: 7, name: "Laurie Kiehn" },
  { id: 8, name: "Laurie Kiehn" },
  { id: 9, name: "Laurie Kiehn" },
  { id: 10, name: "Laurie Kiehn" },
  { id: 11, name: "Laurie Kiehn" },
  { id: 12, name: "Laurie Kiehn" },
  { id: 13, name: "Laurie Kiehn" },
];

export const SelectField: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = React.useState(people[0]);
  return (
    <Select value={selectedPerson} onChange={setSelectedPerson}>
      {({ open }) => (
        <>
          <Select.Button
            data-state={open ? "open" : "closed"}
            className="group border rounded px-4 py-2 radix-state-open:bg-fuchsia-300 flex items-center space-x-2"
          >
            <span>{selectedPerson.name}</span>
            <ChevronDownIcon className="w-6 h-6 will-change-transform transform duration-200 group-radix-state-open:rotate-180 stroke-red-500 stroke-2" />
          </Select.Button>
          <AnimatePresence>
            {open && (
              <Select.Options
                static
                as={motion.div}
                className="overflow-y-auto mt-2 rounded-lg bg-white shadow-xl"
                initial={{ height: 0 }}
                animate={{
                  height: 320,
                  transition: { ease: "easeIn", duration: 0.2 },
                }}
                exit={{
                  height: 0,
                  transition: { ease: "easeOut", duration: 0.1 },
                }}
              >
                <motion.ul className="">
                  {people.map((person) => (
                    <Select.Option
                      key={person.id}
                      value={person}
                      as={React.Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          data-is-active={active}
                          data-is-selected={selected}
                          className="px-4 py-1 bg-slate-200 duration-100 is-active:bg-green-400 is-selected:bg-sky-400"
                        >
                          {person.name}
                        </li>
                      )}
                    </Select.Option>
                  ))}
                </motion.ul>
              </Select.Options>
            )}
          </AnimatePresence>
        </>
      )}
    </Select>
  );
};
