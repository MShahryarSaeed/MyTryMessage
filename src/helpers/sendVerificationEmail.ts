import { resend } from "@/lib/resend";
import verificationEmail from '../../emails/verificationEmail';
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'MyStryMessage | Verification Code',
            react: verificationEmail({ username, otp: verifyCode }),
        });


        return { success: true, message: 'Verification email send successfully' };

    } catch (error) {
        console.log('Error sending verification email', error);
        return { success: false, message: 'Error sending verification email' };
    }
}
