import RouterManager from "@/app/router/RouterManager";
import Routes from "@/app/router/Routes";
import useSignInOnFocus from "./lib/hooks/useSignInOnFocus";
import { Toaster } from "@/ui/components/sonner";

function App() {
  useSignInOnFocus();

  return (
    <RouterManager>
      <Routes/>
      <Toaster />
    </RouterManager>
  );
}

export default App;
