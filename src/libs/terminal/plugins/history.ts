import { Keys } from "../keyboard";
import Plugin from "../plugin";
import Terminal from "../terminal";

const KEY = ".history";

export default class History extends Plugin {
  private history: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');
  private offset = this.history.length;

  constructor(terminal: Terminal) {
    super(terminal);

    this.terminal.keyboard.listen((event, terminal) => {
      switch (event.key) {
        case Keys.up:
          if (this.setSafeOffset(this.offset - 1))
            terminal.input.setInput(this.history[this.offset] || "");
          return true;
        case Keys.down:
          if (this.setSafeOffset(this.offset + 1))
            terminal.input.setInput(this.history[this.offset] || "");
          return true;
        case Keys.enter:
          this.addToHistory(terminal.input.getInput());
          this.setSafeOffset(this.history.length)
          return false;
      }
    });
  }

  addToHistory(value: string) {
    if (!value.trim() || this.history[this.history.length - 1] === value) return

    this.history.push(value);
    if (this.history.length > 15) {
      this.history.splice(0, this.history.length - 15)
    }
    this.offset = this.history.length;
    localStorage.setItem(KEY, JSON.stringify(this.history))
  }

  setSafeOffset(offset: number) {
    const result =
      offset > this.history.length
        ? this.history.length
        : offset < 0
          ? 0
          : offset;

    if (result === this.offset) {
      return false;
    }

    this.offset = result;

    return true;
  }
}
