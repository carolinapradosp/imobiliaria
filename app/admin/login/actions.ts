"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import {
  createAdminSession,
  deleteAdminSession,
} from "@/lib/session";

export type LoginState = {
  error: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !passwordHash) {
    return {
      error: "As credenciais administrativas não foram configuradas.",
    };
  }

  const emailMatches = email === adminEmail;
  const passwordMatches = await bcrypt.compare(
    password,
    passwordHash,
  );

  if (!emailMatches || !passwordMatches) {
    return {
      error: "E-mail ou senha inválidos.",
    };
  }

  await createAdminSession(email);

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteAdminSession();

  redirect("/admin/login");
}