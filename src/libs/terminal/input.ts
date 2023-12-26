export default class Input {
  private caret = 0;
  private input = "";
  private callable?: (value: string, caret: number) => void;

  inputHandler(callable: (value: string, caret: number) => void) {
    this.callable = callable;
  }

  appendInput(value: string) {
    if (value)
      this.input =
        this.input.slice(0, this.caret) + value + this.input.slice(this.caret);
    else if (this.caret > 0)
      this.input =
        this.input.slice(0, this.caret - 1) + this.input.slice(this.caret);

    this.setCaret(this.caret + (value ? 1 : -1));
    if (this.callable) this.callable(this.input, this.caret);
  }

  setInput(value: string) {
    this.input = value
    this.caret = value.length
    if (this.callable) this.callable(this.input, this.caret);
  }

  getInput() {
    return this.input;
  }

  setCaret(caret: number) {
    this.caret =
      caret < 0 ? 0 : caret > this.input.length ? this.input.length : caret;
    if (this.callable) this.callable(this.input, this.caret);
  }

  getCaret() {
    return this.caret;
  }
}
