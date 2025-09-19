import React from "react";
import { TooltipWrapper } from "./Tooltip";
import { Switch } from "@headlessui/react";

const SwitchButton = ({ autoResize, setAutoResize }) => {
  return (
    <>
      <TooltipWrapper tooltipText="Auto-Resize">
        <Switch
          checked={autoResize}
          onChange={setAutoResize}
          className={`group relative mt-2.5 inline-flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-colors ${
            autoResize ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-4.75 transform cursor-pointer rounded-full bg-white transition-transform ${
              autoResize ? "translate-x-5.5" : "translate-x-0"
            }`}
          />
        </Switch>
      </TooltipWrapper>
    </>
  );
};

export default SwitchButton;
