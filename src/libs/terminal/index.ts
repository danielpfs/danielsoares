import Keyboard from "./keyboard";
import Render from "./render";
import Terminal from "./terminal";


export default function createTerminal(prefix: string, commands: Terminal['commands']) {
  return new Terminal(new Render(prefix), new Keyboard(), commands)
}
