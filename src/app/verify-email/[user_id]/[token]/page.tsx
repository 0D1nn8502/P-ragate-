"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function VerifyEmailPage() {
  const { user_id, token } = useParams<{ user_id: string; token: string }>();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/verify-email/${user_id}/${token}/`
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("✅ Your email has been verified successfully!");
        } else {
          setStatus(`❌ Verification failed: ${data.error || "Unknown error"}`);
        }
      } catch (error) {
        setStatus("❌ Something went wrong while verifying.");
      }
    };

    if (user_id && token) verify();
  }, [user_id, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-xl font-bold">{status}</h1>
    </div>
  );
}

