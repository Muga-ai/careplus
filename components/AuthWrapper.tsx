"use client";

import React, { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  allowedRoles?: string[]; // Make it optional – we ignore it
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  // Do NOTHING – no auth check, no loading, no redirect
  return <>{children}</>;
}