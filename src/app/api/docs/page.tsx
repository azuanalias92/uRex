"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import '@/styles/swagger.css'; // 👈 Import your custom light mode

export default function SwaggerDocsPage() {
  return (
    <div className="h-screen">
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
