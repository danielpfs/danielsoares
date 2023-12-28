import Command from "@/components/Command";
import Output from "@/libs/terminal/output";
import Terminal from "@/libs/terminal/terminal";
import { lazy } from "react";

export default ([
  {
    name: "contact",
    exec: async (terminal) => {
      terminal.render.output(Output.success("loading..."));
      const Component = lazy(() => import("@/components/pages/Contact"));

      return Output.success(
        <div className="font-sans my-2 flex justify-center">
          <Component />
        </div>,
      );
    },
  },
  {
    name: "route",
    exec: async (terminal, args) => {
      return terminal.commands.find(c => c.name === args)?.exec(terminal) || Output.error(404, "404 - Route not found.")
    }
  },
  {
    name: "help",
    exec: (terminal) => {
      terminal.render.output(Output.success("list of available commands:"));

      return Output.success(
        <div className="flex gap-3">
          {terminal.commands.map((c, i) =>
            typeof c.name === "string" ? (
              <Command
                key={`${c.name}-${i}`}
                name={c.name}
                terminal={terminal}
              />
            ) : null,
          )}
        </div>,
      );
    },
  },
] as Terminal["commands"]);
