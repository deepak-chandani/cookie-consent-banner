import { Button } from "@/components/ui/button";
import ManageCookiesDialog from "./OptionsModal";
import clsx from "clsx";
import styles from "./ConsentBanner.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { addScript, getCookie } from "@/lib/utils";
import ConsentReceivedAlert from "./ConsentAlert";

export type CookieType = "essential" | "analytics" | "marketing";
type OptionalCookieType = Exclude<CookieType, "essential">;
export type CookieOptions = Record<OptionalCookieType, boolean>;

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [storedCookie, setStoredCookie] = useState<CookieOptions>();

  // check if consent already given, don't show this Banner
  useLayoutEffect(() => {
    const essential = getCookie("essential") === 'true';
    const analytics = getCookie("analytics") === 'true';
    const marketing = getCookie("marketing") === 'true';

    if (essential){
      setStoredCookie({
        analytics,
        marketing
      });
    }
  }, []);

  useEffect(() => {
    if(storedCookie){
      loadScripts()
    }
  }, [storedCookie])

  function saveCookies(cookieOptions: CookieOptions) {
    const allOptions = {
      ...cookieOptions,
      essential: true,
    };
    console.log("Save cookies handler", allOptions);
    const expirationTime = 365 * 24 * 60 * 60; // 1 year in seconds

    const entries = Object.entries(allOptions);
    for (const [name, value] of entries) {
      document.cookie = `${name}=${value}; max-age=${expirationTime}; path=/`;
    }

    setOpen(false);
    setStoredCookie(cookieOptions);
  }

  function loadScripts(){
    addScript('js/essentials.js')

    if(storedCookie?.analytics){
      addScript('js/analytics.js')
    }

    if(storedCookie?.marketing){
      addScript('js/marketing.js')
    }
  }

  function handleAcceptAll() {
    const options: CookieOptions = {
      analytics: true,
      marketing: true,
    };
    saveCookies(options);
  }

  function handleDeclineAll() {
    const options: CookieOptions = {
      analytics: false,
      marketing: false,
    };
    saveCookies(options);
  }

  const classes = clsx(
    "flex flex-col justify-center gap-6 self-stretch border-t border-solid border-neutral-200 bg-white",
    "p-4 md:py-6 md:px-8 lg:px-28",
    styles.cookie_consent_banner
  );

  if (storedCookie) {
    return (
      <div>
        <ConsentReceivedAlert title="Consent Received" description="Your consent is received, Thanks!" />
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className="flex flex-col justify-center gap-1 self-stretch">
        <span className="text-base font-semibold text-neutral-900">
          We use cookies
        </span>
        <span className="text-sm font-normal">
          We use cookies to enhance your browsing experience and improve our
          website's performance. By continuing to use this site, you consent to
          the use of cookies. To learn more about how we use cookies and your
          options, please read our cookie policy.
        </span>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-2 self-stretch">
        <div className="flex flex-col md:flex-row md:ml-auto gap-2 md:gap-4">
          <Button className="inline-flex px-5" onClick={handleAcceptAll}>
            Allow Cookies
          </Button>
          <ManageCookiesDialog
            open={open}
            setOpen={setOpen}
            onSave={saveCookies}
            onAcceptAll={handleAcceptAll}
            onDeclineAll={handleDeclineAll}
          />
        </div>

        <div id="action-decline">
          <Button
            variant="destructive"
            className="inline-flex w-full"
            onClick={handleDeclineAll}
          >
            Decline all
          </Button>
        </div>
      </div>
    </div>
  );
}
