// utils/otpEmailTemplate.js

module.exports = function otpEmailTemplate(otp) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; padding: 40px 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #00327F; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Verify Your Email</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hi there,</p>
          <p style="font-size: 15px; color: #555;">Thank you for signing up! Please use the OTP below to verify your email address and complete your registration process.</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <p style="font-size: 18px; color: #777; margin-bottom: 10px;">Your One Time Password (OTP) is:</p>
            <h2 style="font-size: 32px; color: #00327F; background: #f0f4ff; padding: 15px 30px; border-radius: 6px; display: inline-block; letter-spacing: 4px;">${otp}</h2>
          </div>
  
          <p style="font-size: 14px; color: #888;">This OTP is valid for the next 10 minutes. If you didn’t request this, please ignore this email.</p>
          <p style="font-size: 15px; color: #333; margin-top: 30px;">Thanks,<br><strong>Your App Team</strong></p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #999;">
          &copy; ${new Date().getFullYear()} Sqa AI. All rights reserved.
        </div>
      </div>
    </div>
    `;
};
