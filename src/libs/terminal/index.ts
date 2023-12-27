import Keyboard from "./keyboard";
import FakeTyping from "./plugins/fakeTyping";
import History from "./plugins/history";
import Render from "./render";
import Terminal from "./terminal";


export default function createTerminal(prefix: string, commands: Terminal['commands']) {
  return new Terminal(new Render(prefix), new Keyboard(), {
    History,
    FakeTyping
  }, commands)
}
