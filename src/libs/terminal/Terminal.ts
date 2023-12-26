type Command = {
  name: string | ((value: string) => boolean);
  exec: (output: Terminal, ...args: string[]) => boolean | Promise<boolean>;
  helper?: (output: Terminal, ...args: string[]) => boolean | Promise<boolean>;
};

export default class Terminal {
  private render?: (value: string) => void;

  constructor(private prefix: string, public readonly commands: Command[]) {}

  getPrefix() {
    return this.prefix;
  }

  setRender(render: (value: string) => void) {
    this.render = render;
  }

  getRender() {
    if (!this.render) throw new Error("render not defined");

    return this.render;
  }

  input(value: string) {
    if (!this.render) throw new Error("render not defined");

    this.render(this.prefix + value);

    if (!value) return;

    const [commandName, ...args] = value.split(" ");

    const command = this.commands.find((c) =>
      typeof c.name === "string" ? c.name === commandName : c.name(commandName),
    );

    if (!command) {
      return this.render(`command not found: ${commandName}`);
    }

    command.exec(this, ...args);
  }
}
