import * as React from "react";
import { Accordion } from "./components/accordion";
import { SelectField } from "./components/select";
import { Tabs } from "./components/tabs";
import { AlertDialog } from "./components/alert_dialog";

const App: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Tabs />
      <Accordion />
      <SelectField />
      <AlertDialog
        trigger={
          <button className="px-4 py-2 rounded bg-red-500 text-white">
            Delete
          </button>
        }
        action={
          <button className="px-4 py-2 rounded bg-red-500 text-white">
            Delete
          </button>
        }
        cancel={
          <button className="px-4 py-2 rounded bg-slate-300 text-black">
            Cancel
          </button>
        }
        title={<h2>Are you sure?</h2>}
        description={
          <p>
            Далеко-далеко за словесными горами в стране гласных и согласных
            живут рыбные тексты. Семь деревни взобравшись решила большого назад
            составитель. Но, родного курсивных.
          </p>
        }
      />
    </div>
  );
};

export default App;
