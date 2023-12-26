import Input from "./input";
import Output from "./output";
import Terminal from "./terminal";

export default class Render {
  private terminal?: Terminal;
  private outputHandler?: (output: Output) => void

  constructor(public readonly prefix: string) {}

  setTerminal(terminal: Terminal) {
    this.terminal = terminal;
  }

  getTerminal() {
    if (!this.terminal) throw new Error("terminal is not setted");
    return this.terminal;
  }

  setInputHandler(...args: Parameters<Input['inputHandler']>) {
    this.terminal?.input.inputHandler(...args)
  }

  setOutputHandler(outputHandler: Render['outputHandler']) {
    this.outputHandler = outputHandler
  }

  output(value: Output) {
    if (!this.outputHandler) throw new Error('terminal outputs not handled')

    this.outputHandler(value)
  }

  keyboardEventHandler(event: HTMLElementEventMap["keydown"]) {
    if (!event.ctrlKey && !event.altKey || event.key === 'v' && event.ctrlKey)
      event.preventDefault();

    this.getTerminal().keyboard.input(
      {
        key: event.key,
        altKey: event.altKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        controlKey: event.ctrlKey,
      },
      this.getTerminal(),
    );
  }
}
