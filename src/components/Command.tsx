import FakeTyping from "@/libs/terminal/plugins/fakeTyping";
import Terminal from "@/libs/terminal/terminal";

export default function Command(props: { name: string; terminal: Terminal }) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      className="text-lime-400 hover:underline"
      onClick={() => props.terminal.getPlugin(FakeTyping).input(props.name)}
      role="button"
    >
      {props.name}
    </span>
  );
}
