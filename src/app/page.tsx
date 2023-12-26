"use client";
import Contact from "@/components/Contact";
import Terminal from "@/libs/terminal/Terminal";
import { Component, KeyboardEventHandler, lazy, useState } from "react";

const terminal = new Terminal("danielsoares.dev: ", [
  {
    name: "help",
    exec: (terminal) => {
      terminal.getRender()("list of available commands:");
      terminal.getRender()(
        terminal.commands
          .map((c) => (typeof c.name === "string" ? c.name : null))
          .join(" "),
      );
      return true;
    },
  },
  {
    name: "contact",
    exec: async () => {
      terminal.getRender()("loading...");
      terminal.getRender()(
        <div className="font-sans my-2 flex justify-center">
          <Contact />
        </div>,
      );

      return true;
    },
  },
]);

const keyFn: KeyboardEventHandler<HTMLDivElement> = (e) => {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const input = e.target.innerText.trim();

  e.target.innerHTML = "";

  return terminal.input(input);
};

export default function TerminalView() {
  let [outputs, setOutputs] = useState<(string | Element)[]>([
    "Welcome!",
    new Date().toLocaleDateString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
  ]);
  terminal.setRender((value) => {
    outputs = [...outputs, value];
    setOutputs(outputs);
  });

  const restoreFocus = () => {
    document.querySelector("#input")?.focus();
  };

  return (
    <main className="min-h-screen font-mono" onClick={restoreFocus}>
      <div className="container mx-auto p-4">
        {/* Outputs */}
        {outputs.map((o, i) => (
          <div key={i} className="min-h-6 whitespace-pre-wrap">
            {o}
          </div>
        ))}
        {/* Input */}
        <div>
          <span className="mr-2">{terminal.getPrefix().trim()}</span>
          <span
            id="input"
            className="break-all outline-none"
            contentEditable="true"
            onKeyDown={keyFn}
          ></span>
        </div>
        {/* Suggestions */}
        <div></div>
      </div>
    </main>
  );
}
