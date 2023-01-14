import { ReactNode } from 'react';

export enum UsernameStyles {
  HANDLE_NO_AT = "HANDLE_NO_AT",
  HANDLE = "HANDLE",
  FULL = "FULL",
  HIDDEN = "HIDDEN"
}

export type MastodonModalProps = {
  header: string,
  onOk: (instanceName: string) => void,
  component: (open: () => void) => ReactNode
}

export type ShareOnMastodonProps = {
  message?: string,
  url?: string | boolean,
  hideIcon?: boolean,
  hideRememberMe?: boolean,
  component: (open: () => void) => ReactNode
}

export type FollowOnMastodonProps = {
  username: string,
  usernameStyle?: string,
  hideIcon?: boolean,
  hideRememberMe?: boolean,
  component: (open: () => void) => ReactNode
}

export type ModalProps = {
  open: boolean,
  header: string,
  setOpen: (open: boolean) => void,
  onOk: (instanceName: string) => void,
  hideIcon?: boolean,
  hideRememberMe?: boolean
}
