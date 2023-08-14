import "dotenv/config";

const {BASE_URL}=process.env;

export const createVerifyEmail=({email,verificationToken})=>{
    const verifyEmail = {
        to: email,
        subject: "verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`,
      };
      return verifyEmail;
}