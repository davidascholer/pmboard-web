import { BrowserRouter } from "react-router";

import { ReactNode } from "react";

function RouterManager({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
     {children}
    </BrowserRouter>
  );
}

export default RouterManager;
