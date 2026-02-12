import { sql } from "@/lib/db";
import crypto from "crypto"; 
import { Resend } from "resend";

// Sender email : adityarajsingh@paragate.in //

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND API KEY not available"); 
}

const baseUrl =
  process.env.NEXT_DEV_URL ??
  "https://www.paragate.in"; 


const resend = new Resend(process.env.RESEND_API_KEY); 


function generate_verification_token() {
    return crypto.randomBytes(32).toString('hex'); 
}


export async function POST(req: Request) {
    try {

        const {email} = await req.json(); 

        if (!email || typeof email !== "string") {
            return Response.json({ error: "Email required" }, { status: 400 }); 
        }

        const token = generate_verification_token(); 
        const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h expiry 

        await sql `
            INSERT INTO users (
                email, 
                verification_token, 
                verification_expiry 
            )
            VALUES (${email}, ${token}, ${expiry}) 
        `

        const verifyUrl = `${baseUrl}/api/verify-email?token=${token}`;

        const {error} = await resend.emails.send({
            from: 'adityarajsingh@paragate.in',
            to: email,
            subject: "Verify your email",
            html: `
                <p>Welcome!</p>
                <p>Click the link below to verify your email:</p>
                <p>
                <a href="${verifyUrl}">Verify email</a>
                </p>
                <p>This link expires in 24 hours.</p>
            `
        });

        return Response.json({ ok:true })
    
    } catch(err) {
        console.error("Signup error:", err);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
    
}


