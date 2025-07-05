import { Button } from "@/ui/components/button"
import { toast } from "sonner"

export default function AppToast() {

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast("Event has been created.")
      }}
    >
      Example Toast
    </Button>
  )
}
