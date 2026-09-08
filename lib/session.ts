import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin-session";
const SESSION_DURATION = 60 * 60 * 8;

type SessionPayload = {
  email: string;
};

function getSessionSecret(): Uint8Array {
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret) {
    throw new Error(
      "A variável SESSION_SECRET não foi configurada.",
    );
  }

  return new TextEncoder().encode(sessionSecret);
}

export async function createAdminSession(
  email: string,
): Promise<void> {
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION * 1000,
  );

  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getSessionSecret());

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      getSessionSecret(),
    );

    if (typeof payload.email !== "string") {
      return null;
    }

    return {
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}