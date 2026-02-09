
export type SignupResult =
  | { ok: true }
  | { ok: false; reason: "EMAIL_EXISTS" | "SERVER_ERROR" };


export async function signupWithEmail (email: string) : Promise <SignupResult> {

    try {
        const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        });

        if (!res.ok) {
        return { ok: false, reason: "SERVER_ERROR" };
        }

        return { ok: true };

  } catch {
    return { ok: false, reason: "SERVER_ERROR" };
  }
}


