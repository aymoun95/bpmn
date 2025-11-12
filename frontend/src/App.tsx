import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "./App.css";

import BPMN from "./bpmn";
import Header from "./common/components/Header";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
        <Header>Create and Save Your Model Below</Header>
        <BPMN />
      </div>
    </>
  );
}

export default App;
