import Input from "./input";
import Keyboard, { Keys } from "./keyboard";
import Output from "./output";
import Plugin from "./plugin";
import Render from "./render";

type Command = {
  name: string | ((value: string) => boolean);
  exec: (output: Terminal, ...args: string[]) => Output | Promise<Output>;
  helper?: (output: Terminal, ...args: string[]) => Output | Promise<Output>;
};

export default class Terminal {
  public readonly input = new Input();

  constructor(
    public readonly render: Render,
    public readonly keyboard: Keyboard,
    public readonly plugins: { [keys: string]: typeof Plugin },
    public readonly commands: Command[],
  ) {
    this.render.setTerminal(this);

    this.keyboard.listen((event) => {
      switch (event.key) {
        case Keys.backspace:
          this.input.appendInput("");
          return true;
        case Keys.delete:
          if (this.input.getCaret() >= this.input.getInput().length)
            return false;

          this.input.setCaret(this.input.getCaret() + 1);
          this.input.appendInput("");

          return true;

        case Keys.left:
          this.input.setCaret(this.input.getCaret() - 1);
          return true;
        case Keys.right:
          this.input.setCaret(this.input.getCaret() + 1);
          return true;

        case Keys.enter:
          this.execute();
          return true;
      }

      if (event.key.length > 1 || event.altKey || event.controlKey) return;

      this.input.appendInput(event.key);

      return true;
    });

    for (const key in this.plugins) {
      new this.plugins[key](this);
    }
  }

  async execute() {
    const input = this.input.getInput().trim();
    this.render.output(Output.success(this.render.prefix + input));

    if (!input) return;

    const [commandName, ...args] = input.split(" ");

    this.input.setInput("");

    const command = this.commands.find((c) =>
      typeof c.name === "string" ? c.name === commandName : c.name(commandName),
    );

    if (!command) {
      return this.render.output(
        Output.error(`command not found: ${commandName}`, 127),
      );
    }

    this.render.output(await command.exec(this, ...args));
  }
}
