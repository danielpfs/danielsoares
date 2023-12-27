import Plugin from "../plugin";

export default class FakeTyping extends Plugin {
  private running = false;

  async type(value: string) {
    if (this.running) return;
    this.running = true;

    const listen = () => {
      return false;
    };

    try {
      this.terminal.keyboard.listen(listen);

      this.terminal.input.setInput("");
      for (const c of value.split("")) {
        await this.delay(50);
        this.terminal.input.appendInput(c);
      }

      this.terminal.execute();
    } catch (e) {}
    this.terminal.keyboard.stopListen(listen);
    this.running = false;
  }

  private async delay(milliseconds: number) {
    let resolve: undefined | ((value?: unknown) => void);

    const p = new Promise((res) => {
      resolve = res;
    });

    setTimeout(() => {
      if (resolve) resolve();
    }, milliseconds);

    return p;
  }
}
