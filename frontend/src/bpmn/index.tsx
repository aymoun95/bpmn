import Modeler from "./components/Modeler";
import { SocketProvider } from "./context/socket";

export default function BPMN() {
  return (
    <SocketProvider>
      <div
        id="bpmncontainer"
        className="flex shadow-2xl rounded-lg bg-white overflow-hidden"
        style={{ minHeight: "80vh", minWidth: "80vw", maxHeight: "90vh" }}
      >
        <Modeler className="w-[80vw] h-[80vh]" />
      </div>
    </SocketProvider>
  );
}
