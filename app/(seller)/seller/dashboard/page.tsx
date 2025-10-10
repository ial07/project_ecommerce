"use client";

import React from "react";
import { Star, Settings, Package, ScrollText } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <h1 className="font-bold">
        <span className="hidden md:inline display-sm">Dashboard</span>
        <span className="inline md:hidden display-xs">Dashboard</span>
      </h1>

      <div className="grid grid-cols-4 my-6">
        <div className="bg-white border border-neutral-300 p-3 rounded-md">
          <Package />
          <p className="text-sm">Total Product</p>
          <h3>{user?.shop?._count.completedItems}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
