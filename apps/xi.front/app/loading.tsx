'use client';

import React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen flex justify-center content-center">
      <span className="c-spinner" />
    </div>
  );
}
