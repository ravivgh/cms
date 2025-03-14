import nodemailer from 'nodemailer';

// Function to generate an n-digit OTP
function generateNDigitNumber(n) {
    const min = Math.pow(10, n - 1);  // Minimum n-digit number
    const max = Math.pow(10, n) - 1;  
    return Math.floor(min + Math.random() * (max - min + 1));
}


let transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'notify.campusflow@gmail.com',
    pass: 'gtdubsovkmecvkvu', 
  }
});


export const exectemail = async (sendto, sendername) => {
    let mailOptions = {
        from: 'Campus Flow CRM <notify.campusflow@outlook.com>',  
        to: sendto,  
        subject: "Welcome to Campus Flow CRM",   
        html: `<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
                  <div style='background-color: #006600; padding: 10px; text-align: center;'>
                    <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow</h1>
                  </div>
                  <div style='padding: 20px;'>
                    <h2 style='color: #00FF00;'>Hello ${sendername},</h2>
                    <p style='color: #FFFFFF; line-height: 1.6;'>Welcome to <strong>Campus Flow</strong>! We are excited to have you onboard. Use Your Username and Password to Login</p>
                    <p style='color: #FFFFFF; line-height: 1.6;'>Stay tuned for updates, and be prepared for a fantastic time ahead with <strong style='color: #00FF00;'>Campus Flow</strong>!</p>
                  </div>
                  <div style='background-color: #006600; color: #FFFFFF; text-align: center; padding: 10px;'>
                    <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
                  </div>
               </div>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

export const genotp = async (sendto, sendername) => {
    const randomNumber = generateNDigitNumber(4);  // Generate OTP inside the function

    let mailOptions = {
        from: 'Campus Flow CRM <notify.campusflow@outlook.com>',  
        to: sendto,  
        subject: "OTP - Campus Flow",   
        html: `<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
                  <div style='background-color: #006600; padding: 10px; text-align: center;'>
                    <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow</h1>
                  </div>
                  <div style='padding: 20px;'>
                    <h2 style='color: #00FF00;'>Hello ${sendername},</h2>
                    <p style='color: #FFFFFF; line-height: 1.6;'>Your One-Time Password (OTP) is <strong style='color: #00FF00;'>${randomNumber}</strong>. Please use this OTP to complete your login. This OTP is valid for the next 10 minutes.</p>
                    <p style='color: #FFFFFF; line-height: 1.6;'>Stay secure and enjoy your experience with <strong style='color: #00FF00;'>Campus Flow</strong>!</p>
                  </div>
                  <div style='background-color: #006600; color: #FFFFFF; text-align: center; padding: 10px;'>
                    <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
                  </div>
               </div>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve({ info, otp: randomNumber }); 
            }
        });
    });
};
