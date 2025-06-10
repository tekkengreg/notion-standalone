"use server";

import { FormData } from "next/dist/compiled/@edge-runtime/primitives";

type State = {
  success: boolean;
} | null;

export async function createApp(prevState: State, formData: FormData) {
  const name = formData.get("name");
  const url = formData.get("url");
  const icon = formData.get("icon");

  console.log("Nouvelle application créée:", {
    name,
    url,
    icon,
  });

  return { success: true };
}
