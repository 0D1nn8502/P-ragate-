import { sql } from "@/lib/db";

export async function GET(req: Request) {

  const origin = new URL(req.url).origin; 

  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.redirect(
        `${process.env.NEXT_DEV_URL}/verify-error`,
        302
      );
    }

    const result = await sql`
      UPDATE users
      SET
        is_verified = true,
        verified_at = now(),
        verification_token = NULL,
        verification_expiry = NULL
      WHERE
        verification_token = ${token}
        AND verification_expiry > now()
        AND is_verified = false
      RETURNING id;
    `;

    if (result.length === 0) {
      return Response.redirect(
        `${origin}/verify-error`,
        302
      );
    }

    return Response.redirect(
      `${origin}/verify-success`,
      302
    );
  } catch (err) {
    console.error(err);
    return Response.redirect(
      `${origin}/verify-error`,
      302
    );
  }
}
