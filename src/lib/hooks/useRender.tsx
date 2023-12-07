// create a use render hook
//
// Path: src/lib/hooks/useRender.tsx

import React from "react";

export const useRender = (service: any, name: string = "") => {
  const [, render] = React.useState(0);
  service[`render${name ?? "Default"}`] = () => {
    render((prev) => prev + 1);
  };
};
