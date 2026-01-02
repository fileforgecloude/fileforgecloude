"use client";

import React from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useParams } from "next/navigation";

const NestedDashboard = () => {
  const params = useParams();
  const path = params.path as string[];

  return <DashboardContent folderPath={path.join("/")} />;
};

export default NestedDashboard;
