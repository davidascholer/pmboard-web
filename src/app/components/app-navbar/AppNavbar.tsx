import React from "react";
import { routerPaths } from "@/app/router/RouterPaths";
import { cn } from "@/ui/lib/utils";

const AppNavbar: React.FC = () => {

  return (
    <nav className="w-screen fixed bottom-0 rounded-none bg-accent h-16">
      <ul className="w-full h-16 flex p-0">
        {routerPaths.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex flex-1 mb-none bg-background">
              <a
                href={item.url}
                className={cn(
                  "flex gap-2 justify-center items-center rounded-t-sm flex-1",
                  item.url === window.location.pathname
                    ? "bg-accent pointer-events-none cursor-default"
                    : "hover:bg-accent transition-all duration-300"
                )}
              >
                <div className="flex gap-2 justify-center items-center px-4">
                  <span className="hidden xxs:block">
                    {item.icon ? <item.icon /> : null}
                  </span>
                  <span className="text-center text-xs xs:text-sm">
                    {item.title}
                  </span>
                </div>
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default AppNavbar;
