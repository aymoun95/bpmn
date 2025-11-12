import "./App.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";

import BpmnCanvas from "./components/BpmnCanvas";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      <Header>Create and Save Your Model Below</Header>
      <div
        id="bpmncontainer"
        className="flex shadow-2xl rounded-lg bg-white overflow-hidden"
        style={{ minHeight: "80vh", minWidth: "80vw", maxHeight: "90vh" }}
      >
        <BpmnCanvas className="w-[80vw] h-[80vh]" />
      </div>
    </div>
  );
}

export default App;
