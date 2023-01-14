import React, { useEffect, useState } from "react";
import type { ModalProps } from "./types";
import MastodonIcon from "./files/mastodon.png";
import styles from "./files/style.module.css";

const ESC = "Escape";
const ENTER = "Enter";
const LOCALSTORAGE_KEY_SHOULD_REMEMBER = "mikebeas-mastodon-remember";
const LOCALSTORAGE_KEY_DOMAIN_NAME = "mikebeas-mastodon-domain-name";

const getDefaultChecked = () => localStorage.getItem(LOCALSTORAGE_KEY_SHOULD_REMEMBER) === "true";
const getDefaultInstanceName = () => localStorage.getItem(LOCALSTORAGE_KEY_DOMAIN_NAME)?.toString() ?? "";

const Modal: React.FC<ModalProps> = ({ open, header, setOpen, onOk, hideIcon, hideRememberMe }: ModalProps) => {
  const containerClass = open ? styles.modalBackgroundOpen : "";
  const bodyClass = open ? styles.modalBodyOpen : "";

  const [instanceName, setInstanceName] = useState<string>(!hideRememberMe ? getDefaultInstanceName() : "");

  const hide = () => {
    setOpen(false);
    if (!checked) setInstanceName("");
  }

  const [id, setId] = useState<string>();
  useEffect(() => setId(Math.random().toString()), [])

  const [checked, setChecked] = useState<boolean>(!hideRememberMe && getDefaultChecked());

  useEffect(() => {
    if (checked) {
      localStorage.setItem(LOCALSTORAGE_KEY_SHOULD_REMEMBER, "true")
      localStorage.setItem(LOCALSTORAGE_KEY_DOMAIN_NAME, instanceName)
    } else {
      localStorage.removeItem(LOCALSTORAGE_KEY_SHOULD_REMEMBER)
      localStorage.removeItem(LOCALSTORAGE_KEY_DOMAIN_NAME)
    }
  }, [checked, instanceName])


  useEffect(() => {
    if (open && id) {
      if (!hideRememberMe) {
        setChecked(getDefaultChecked())
        setInstanceName(getDefaultInstanceName())
      }
      document.getElementById(id)?.focus()
    }
  }, [open])

  const submit = () => {
    const parsedInstanceName = instanceName.includes("://") ? instanceName.split("://")[1] : instanceName;
    const domain = parsedInstanceName.includes("/") ? parsedInstanceName.split("/")[0] : parsedInstanceName;
    onOk(domain.trim());
    hide();
  }

  const handleKeypress = (e: React.KeyboardEvent) => {
    switch (e?.key) {
      case ESC:
        hide();
        break;
      case ENTER:
        if (instanceName) submit();
        break;
    }
  }

  return (
    <div
      className={`${styles.modalBackground} ${containerClass}`
      }
      onClick={() => { hide() }}
    >
      <div
        className={`${styles.modalBody} ${bodyClass}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.headerWrapper}>
          {!hideIcon && (
            <img
              src={MastodonIcon}
              className={styles.icon}
            />
          )}
          {header}
        </div>

        <div className={styles.content}>
          <div>Enter the domain name of your Mastodon instance.</div>
          <input
            id={id}
            placeholder="Your Mastodon Instance"
            value={instanceName}
            onChange={(e) => setInstanceName(e.target.value.trim())}
            className={styles.input}
            onKeyDown={handleKeypress}
            inputMode="url"
          />

          {!hideRememberMe ? (
            <label className={styles.checkboxContainer}>
              <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
              <div className={styles.checkmark} />
              <div>Remember my instance on this site</div>
            </label>
          ) :
            null
          }

          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={hide}
            >
              Cancel
            </button>

            <button
              disabled={!instanceName}
              className={styles.button}
              onClick={submit}
            >
              Continue
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Modal;