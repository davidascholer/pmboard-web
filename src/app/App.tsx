import RouterManager from "@/app/router/RouterManager";
import Routes from "@/app/router/Routes";
import useSignInOnFocus from "./utils/hooks/useSignInOnFocus";
import { Toaster } from "@/ui/components/sonner";
import useTailwindTheme from "./utils/hooks/useTailwindTheme";

function App() {
  useSignInOnFocus();
  useTailwindTheme();

  return (
    <RouterManager>
      <Routes/>
      <Toaster />
    </RouterManager>
  );
}

export default App;
