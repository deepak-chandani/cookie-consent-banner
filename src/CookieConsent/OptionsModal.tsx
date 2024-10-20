import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import styles from "./ManageCookies.module.css";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { CookieOptions, CookieType } from ".";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogProps } from "@radix-ui/react-dialog";

type Option = {
  key: CookieType;
  heading: string;
  description: string;
}

const options: Array<Option> = [
  {
    key: "essential",
    heading: "Essentials",
    description:
      "These cookies are essential for the proper functioning of our services and cannot be disabled.",
  },
  {
    key: "analytics",
    heading: "Analytics",
    description:
      "These cookies collect information about how you use our services or potential errors you encounter. Based on this information we are able to improve your experience and react to any issues.",
  },
  {
    key: "marketing",
    heading: "Marketing",
    description:
      "These cookies allow us to show you advertisements relevant to you through our advertising partners.",
  },
];

type ManageCookiesDialogProps = {
  open: boolean;
  setOpen: DialogProps['onOpenChange'],
  onSave: (options: CookieOptions) => void;
  onAcceptAll: () => void;
  onDeclineAll: () => void;
}

export default function ManageCookiesDialog({ open, setOpen, onSave, onAcceptAll, onDeclineAll }: ManageCookiesDialogProps) {
  const [cookieOptions, setCookieOptions] = useState<CookieOptions>({
    analytics: true,
    marketing: true,
  }) 

  function handleOptionChange(key: string, checked: boolean){
    setCookieOptions(prev => {
      return {
        ...prev,
        [key]: checked
      }
    })
  }

  function handleSaveClick(){
    onSave(cookieOptions)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Cookies</Button>
      </DialogTrigger>
      <DialogContent className="w-[340px] md:w-[458px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Manage Cookies</DialogTitle>
            <DialogDescription>
              Make changes to various cookie options. Click save when you're done.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className={styles.options}>
          {options.map((item) => {
            const isEssential = item.key === 'essential';

            return (
              <section key={item.key}>
                <div className={styles.header_row}>
                  <h6 className={styles.option_heading}>{item.heading}</h6>
                  <span>
                    <Switch
                      id={item.key}
                      checked={ isEssential ? true : cookieOptions[item.key]}
                      disabled={isEssential}
                      onCheckedChange={(checked) => handleOptionChange(item.key, checked)}
                    />
                  </span>
                </div>
                <p>{item.description}</p>
              </section>
            );
          })}
        </div>
        <div className={styles.footer}>
          <div className={styles.actions_accept}>
            <Button className="grow" onClick={onAcceptAll}>Accept all</Button>
            <Button className="grow" variant="outline" onClick={handleSaveClick}>
              Save
            </Button>
          </div>
          <div className={styles.actions_decline}>
            <Button
              variant="destructive"
              className="inline-flex w-full"
              onClick={onDeclineAll}
            >
              Decline all
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
