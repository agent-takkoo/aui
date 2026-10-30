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

const hashName = (name: string) =>
  [...name].reduce((hash, char) => (hash * 31 + char.codePointAt(0)!) >>> 0, 7);

export function Avatar({
  name,
  toneIndex,
  size = "sm",
  avatarUrl,
  ...props
}: AvatarProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showPhoto = Boolean(avatarUrl) && avatarUrl !== failedUrl;
  const index = toneIndex ?? hashName(name);
  const tone = (((Math.trunc(index) % 4) + 4) % 4) + 1;
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
