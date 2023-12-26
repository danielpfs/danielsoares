import Terminal from "./terminal";

type Event = {
  key: string;
  altKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  controlKey: boolean;
};

type Callable = (event: Event, terminal: Terminal) => boolean | undefined;

export enum Keys {
  enter = "Enter",
  up = "ArrowUp",
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
  backspace = "Backspace",
  tab = "Tab",
  delete = "Delete",
}

export default class Keyboard {
  private listeners: Callable[] = [];

  input(event: Parameters<Callable>[0], terminal: Parameters<Callable>[1]) {
    return this.listeners.some((l) => l(event, terminal));
  }

  listen(callable: Callable) {
    this.listeners.unshift(callable);
  }
}
