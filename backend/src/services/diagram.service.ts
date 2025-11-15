import { loadInitialDiagram } from '../utils/loadInitialDiagram';

let currentDiagramXML: string | null = loadInitialDiagram();

export const setDiagram = (xml: string) => {
  currentDiagramXML = xml;
};

export const getDiagram = () => currentDiagramXML;
