"use client";
import commands from "@/commands";
import createTerminal from "@/libs/terminal";
import Output from "@/libs/terminal/output";
import FakeTyping from "@/libs/terminal/plugins/fakeTyping";
import { useEffect, useState } from "react";
import Header from "./header";

const terminal = createTerminal(
  '<span class="mr-2 font-bold">danielsoares.dev:</span>',
  commands,
);

let ranCommand = false

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

    el.innerHTML = `${value.slice(
      0,
      caret,
    )}<span class="bg-zinc-500 absolute h-5 w-2.5 animate-caret-terminal -z-10"></span>${value.slice(
      caret,
    )}`;
  });

  terminal.render.setOutputHandler((value) => {
    setOutput((outputs) => {
      return [...outputs, value];
    });
  });

  const restoreFocus = () => {
    document.querySelector("#input")?.focus();
  };

  const pathName = location.pathname.split('/').filter(i => i && i !== 'index').join(' ')

  useEffect(() => {
    restoreFocus();
    if (pathName && !ranCommand) {
      ranCommand = true
      terminal.getPlugin(FakeTyping).input(`route ${pathName}`)
      return 
    }
    terminal.input.setInput("");
  });


  return (
    <>
      <Header terminal={terminal} />
      <main
        className="min-h-screen font-mono container mx-auto p-2"
        onClick={restoreFocus}
        onKeyDown={() => {}}
      >
        {/* Outputs */}
        {outputs.map((o, i) => (
          <div key={`output-${i}`} className="min-h-6 whitespace-pre-wrap">
            {typeof o.data === "string" ? (
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              <div className={o.isError ? 'text-red-500 font-bold' : undefined} dangerouslySetInnerHTML={{ __html: o.data }} />
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
              onPaste={event => event.preventDefault()}
            />
          </span>
        </div>
        {/* Suggestions */}
        {/* <div></div> */}
      </main>
    </>
  );
}
