import type { Metadata } from "next";
import DevResume from "../../components/dev/DevResume";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ashik — resume (dev mode)",
};

export default function DevPage() {
  return <DevResume />;
}
