import { Footer, get_filter_data, Header } from "@/components/layouts";
import { Home } from "@/components/pages";
import { filterData } from "@/context";
import { banners } from "@/main";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { atom, useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    );
  },
});
