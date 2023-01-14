import React, { useState } from "react";
import PropTypes from "prop-types";
import type { MastodonModalProps, ShareOnMastodonProps, FollowOnMastodonProps } from "./types";
import { UsernameStyles } from "./types";
import Modal from "./modal";

const WINDOW_CONFIG = "location=no,status=no,scrollbars=no,width=700,height=700,top=100,left=100";

const MastodonModal: React.FC<MastodonModalProps> = ({ component, ...rest }: MastodonModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        {...rest}
      />
      {component(() => setOpen(true))}
    </>
  )
}

const ShareOnMastodon: React.FC<ShareOnMastodonProps> = ({ component, message, url, ...rest }: ShareOnMastodonProps) => {
  const displayUrl = url === false ? '' : (url ?? window.location.href);

  const messageString = `${message ? `${message.trim()} ` : ''}${displayUrl}`.trim();

  return (
    <MastodonModal
      header="Share to Mastodon"
      onOk={(instanceName: string) => window.open(`https://${instanceName}/share?text=${encodeURI(messageString)}`, undefined, WINDOW_CONFIG)}
      component={component}
      {...rest}
    />
  )
}

ShareOnMastodon.propTypes = {
  component: PropTypes.func.isRequired,
  message: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hideIcon: PropTypes.bool,
  hideRememberMe: PropTypes.bool
}


const FollowOnMastodon: React.FC<FollowOnMastodonProps> = ({ username, usernameStyle, ...props }: FollowOnMastodonProps) => {
  const displayNameElements = [];
  if (username[0] !== "@") username = `@${username}`;
  switch (usernameStyle) {
    case UsernameStyles.HANDLE_NO_AT:
      displayNameElements.push(" ", username.split("@")[1])
      break;
    case UsernameStyles.HIDDEN:
      break;
    case UsernameStyles.FULL:
      displayNameElements.push(" ", username)
      break;
    case UsernameStyles.HANDLE:
    default:
      displayNameElements.push(" @", username.split("@")[1])
      break;
  }

  const displayName = displayNameElements.join("");

  return (
    <MastodonModal
      header={`Follow${displayName} on Mastodon`}
      onOk={(instanceName: string) => window.open(`https://${instanceName}/authorize_follow?acct=${encodeURIComponent(username)}`, undefined, WINDOW_CONFIG)}
      {...props}
    />
  )
}

FollowOnMastodon.propTypes = {
  component: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  usernameStyle: PropTypes.oneOf(Object.values(UsernameStyles)),
  hideIcon: PropTypes.bool,
  hideRememberMe: PropTypes.bool
}

export {
  ShareOnMastodon,
  FollowOnMastodon,
  UsernameStyles
}