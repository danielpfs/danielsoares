"use client";
import createTerminal from "@/libs/terminal";
import Output from "@/libs/terminal/output";
import FakeTyping from "@/libs/terminal/plugins/fakeTyping";
import { lazy, useEffect, useState } from "react";

const terminal = createTerminal(
  '<span class="mr-2 font-bold">danielsoares.dev:</span>',
  [
    {
      name: "help",
      exec: (terminal) => {
        terminal.render.output(Output.success("list of available commands:"));

        return Output.success(
          terminal.commands
            .map((c) => (typeof c.name === "string" ? c.name : null))
            .join(" "),
        );
      },
    },
    {
      name: "contact",
      exec: async () => {
        terminal.render.output(Output.success("loading..."));
        const Component = lazy(() => import("@/components/Contact"));

        return Output.success(
          <div className="font-sans my-2 flex justify-center">
            <Component />
          </div>,
        );
      },
    },
  ],
);

export default function TerminalView() {
  const [outputs, setOutput] = useState<Output[]>([
    Output.success("Connection to danielsoares.dev opened."),
    Output.success("Welcome!"),
    Output.success(
      new Date().toLocaleDateString(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    ),
  ]);
  terminal.render.setInputHandler((value: string, caret: number) => {
    const el = document.querySelector("#input");
    if (!el) return;

    el.innerHTML =
      value.slice(0, caret) +
      '<span class="bg-zinc-500 absolute h-5 w-2.5 animate-caret-terminal -z-10"></span>' +
      value.slice(caret);
  });

  terminal.render.setOutputHandler((value) => {
    setOutput((outputs) => {
      return [...outputs, value];
    });
  });

  const restoreFocus = () => {
    document.querySelector("#input")?.focus();
  };

  useEffect(() => {
    restoreFocus();
    terminal.input.setInput("");
  });

  return (
    <>
      <header className="sticky top-0 bg-zinc-200 text-black shadow-lg">
        <nav className="flex gap-3 container mx-auto px-2 p-1">
          <button onClick={() => terminal.getPlugin(FakeTyping).type("contact")}>
            Contact
          </button>
          <button onClick={() => terminal.getPlugin(FakeTyping).type("help")}>Help</button>
        </nav>
      </header>
      <main className="min-h-screen font-mono" onClick={restoreFocus}>
        <div className="container mx-auto p-2">
          {/* Outputs */}
          {outputs.map((o, i) => (
            <div key={`output-${i}`} className="min-h-6 whitespace-pre-wrap">
              {typeof o.data === "string" ? (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                <div dangerouslySetInnerHTML={{ __html: o.data }} />
              ) : (
                (o.data as JSX.Element)
              )}
            </div>
          ))}
          {/* Input */}
          <div>
            <span
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: terminal.render.prefix }}
            />
            <span className="relative">
              <span
                id="input"
                className="break-all outline-none caret-transparent whitespace-break-spaces"
                contentEditable="true"
                onKeyDown={(event) =>
                  terminal.render.keyboardEventHandler(
                    event as unknown as KeyboardEvent,
                  )
                }
              />
            </span>
          </div>
          {/* Suggestions */}
          {/* <div></div> */}
        </div>
      </main>
    </>
  );
}
