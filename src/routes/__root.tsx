import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../shared/components/header";
import Footer from "../shared/components/footer";
import "../shared/styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      <div className="bg-surface flex min-h-screen w-full">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}
