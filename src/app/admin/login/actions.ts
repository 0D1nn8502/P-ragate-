"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    redirect("/admin/login?error=missing");
  }

  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
