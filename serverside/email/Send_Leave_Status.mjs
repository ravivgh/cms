import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'notify.campusflow@gmail.com',
    pass: 'gtdubsovkmecvkvu',
  },
});

export const sendleavestat = async (sendto, name, fromDate, toDate, status) => {
  let mailOptions;

  if (status === "approved") {
    mailOptions = {
      from: 'Campus Flow CRM <notify.campusflow@gmail.com>',
      to: sendto,
      subject: "Approved - Leave Request Update",
      html: `
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
          <div style='background-color: #006400; padding: 10px; text-align: center;'>
            <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow - Leave Request Update</h1>
          </div>
          <div style='padding: 20px;'>
            <h2 style='color: #00FF00;'>Hello ${name},</h2>
            <p style='color: #FFFFFF; line-height: 1.6;'>
              Your leave request has been updated. Below are the details:
            </p>
            <div style='background-color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;'>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Status:</strong> ${status}</p>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>From Date:</strong> ${fromDate}</p>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>To Date:</strong> ${toDate}</p>
            </div>
            <p style='color: #FFFFFF; line-height: 1.6;'>
              If you have any questions, please contact the administration.
            </p>
          </div>
          <div style='background-color: #006400; color: #FFFFFF; text-align: center; padding: 10px;'>
            <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
          </div>
        </div>
      `,
    };
  } else if (status === "rejected") {
    mailOptions = {
      from: 'Campus Flow CRM <notify.campusflow@gmail.com>',
      to: sendto,
      subject: "Rejected - Leave Request Update",
      html: `
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
          <div style='background-color: #006400; padding: 10px; text-align: center;'>
            <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow - Leave Request Update</h1>
          </div>
          <div style='padding: 20px;'>
            <h2 style='color: #00FF00;'>Hello ${name},</h2>
            <p style='color: #FFFFFF; line-height: 1.6;'>
              Your leave request has been updated. Below are the details:
            </p>
            <div style='background-color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;'>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Status:</strong> ${status}</p>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>From Date:</strong> ${fromDate}</p>
              <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>To Date:</strong> ${toDate}</p>
            </div>
            <p style='color: #FFFFFF; line-height: 1.6;'>
              If you have any questions, please contact the administration.
            </p>
          </div>
          <div style='background-color: #006400; color: #FFFFFF; text-align: center; padding: 10px;'>
            <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
          </div>
        </div>
      `,
    };
  } else {
    // Handle other types or provide a default case
    console.error("Invalid leave request type:", type);
    return null; // or throw an error
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendleavestat;