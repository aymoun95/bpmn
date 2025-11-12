import fs from 'fs';

export function loadInitialDiagram(): string | null {
  try {
    return fs.readFileSync(__dirname + '/../assets/initial.bpmn', 'utf-8');
  } catch (e) {
    console.warn('Could not load initial.bpmn, starting with empty diagram.');
    return null;
  }
}
