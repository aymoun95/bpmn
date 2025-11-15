import BPMNContainer from "./components/Container";
import Modeler from "./components/Modeler";
import { SocketProvider } from "./context/socket";

export default function BPMN() {
  return (
    <SocketProvider>
      <BPMNContainer>
        <Modeler className="w-[80vw] h-[80vh]" />
      </BPMNContainer>
    </SocketProvider>
  );
}
