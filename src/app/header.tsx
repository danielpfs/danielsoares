import FakeTyping from "@/libs/terminal/plugins/fakeTyping";
import Terminal from "@/libs/terminal/terminal";

export default function Header(props: { terminal: Terminal }) {
  return (
    <header className="sticky top-0 bg-zinc-200 text-black shadow-lg">
      <nav className="flex gap-3 container mx-auto px-2 p-1">
        <button onClick={() => props.terminal.getPlugin(FakeTyping).input("contact")}>
          Contact
        </button>
        <button onClick={() => props.terminal.getPlugin(FakeTyping).input("help")}>
          Help
        </button>
      </nav>
    </header>
  );
}
