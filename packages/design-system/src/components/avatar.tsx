"use client";

import { useState } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";

export type AvatarProps = DesignProps<"span"> & {
  name: string;
  toneIndex?: number;
  size?: "xs" | "sm" | "md";
  avatarUrl?: string | null;
};
export function Avatar({
  name,
  toneIndex = 0,
  size = "sm",
  avatarUrl,
  ...props
}: AvatarProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showPhoto = Boolean(avatarUrl) && avatarUrl !== failedUrl;
  const tone = (((Math.trunc(toneIndex) % 4) + 4) % 4) + 1;
  return (
    <span
      {...domProps(props)}
      className={`ds-avatar ds-avatar-${size} ds-avatar-tone-${tone}`}
      data-slot="avatar"
      role="img"
      aria-label={name}
      title={name}
    >
      {showPhoto ? (
        <img
          src={avatarUrl ?? undefined}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setFailedUrl(avatarUrl ?? null)}
        />
      ) : (
        name.trim().slice(0, 1) || "?"
      )}
    </span>
  );
}
