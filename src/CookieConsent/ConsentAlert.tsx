import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type ConsentReceivedAlertProps = {
  title?: string;
  description?: string;
}

export default function ConsentReceivedAlert({title, description}: ConsentReceivedAlertProps) {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}
