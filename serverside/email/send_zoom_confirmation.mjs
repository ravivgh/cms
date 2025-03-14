import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'notify.campusflow@gmail.com', 
    pass: 'gtdubsovkmecvkvu', 
  },
});


export const sendzoomconf = async (sendto, topic, subject, facultyName, hostlink) => {
  const date = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }); // Current time in HH:mm format

  
  let mailOptions = {
    from: 'Campus Flow CRM <notify.campusflow@gmail.com>', 
    to: sendto, 
    subject: "A Lecture is Going On! - Campus Flow CRM", 
    html: `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
        <div style='background-color: #006600; padding: 10px; text-align: center;'>
          <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow - Zoom Meeting Invitation</h1>
        </div>
        <div style='padding: 20px;'>
          <h2 style='color: #00FF00;'>Hello ${facultyName},</h2>
          <p style='color: #FFFFFF; line-height: 1.6;'>
            You are invited to attend a Zoom meeting organized by <strong>Campus Flow</strong>. Below are the meeting details:
          </p>
          <div style='background-color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;'>
            <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Topic:</strong> ${topic}</p>
            <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Subject:</strong> ${subject}</p>
            <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Date:</strong> ${date}</p>
            <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Time:</strong> ${time}</p>
          </div>
          <p style='color: #FFFFFF; line-height: 1.6;'>
            Please ensure you join the meeting on time. If you have any questions, feel free to reach out to us.
          </p>
          <div style='text-align: center; margin: 20px 0;'>
            <a
              href="${hostlink}"
              style='background-color: #006600; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;'
            >
              Join Zoom Meeting
            </a>
          </div>
          <p style='color: #FFFFFF; line-height: 1.6;'>
            Looking forward to seeing you there!
          </p>
        </div>
        <div style='background-color: #006600; color: #FFFFFF; text-align: center; padding: 10px;'>
          <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info; 
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};

export const sendzoomconftostud = async (students, topic, subject) => {
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  
    try {
      for (const student of students) {
        const { name, email } = student;
  
        let mailOptions = {
          from: 'Campus Flow CRM <notify.campusflow@gmail.com>',
          to: email,
          subject: "A Lecture is Going On! - Campus Flow CRM",
          html: `
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000000; color: #FFFFFF;'>
              <div style='background-color: #006600; padding: 10px; text-align: center;'>
                <h1 style='color: #FFFFFF; font-size: 24px; margin: 0;'>Campus Flow - Meeting Invitation</h1>
              </div>
              <div style='padding: 20px;'>
                <h2 style='color: #00FF00;'>Hello ${name},</h2>
                <p style='color: #FFFFFF; line-height: 1.6;'>
                  You are invited to attend a meeting organized by <strong>Campus Flow</strong>. Below are the meeting details:
                </p>
                <div style='background-color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                  <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Topic:</strong> ${topic}</p>
                  <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Subject:</strong> ${subject}</p>
                  <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Date:</strong> ${date}</p>
                  <p style='color: #FFFFFF; margin: 5px 0;'><strong style='color: #00FF00;'>Time:</strong> ${time}</p>
                </div>
                <p style='color: #FFFFFF; line-height: 1.6;'>
                  To join the meeting, please log in to your <strong>Campus Flow Dashboard</strong> and navigate to the <strong>Meetings</strong> section.
                </p>
                <div style='text-align: center; margin: 20px 0;'>
                  <a
                    href="https://your-campus-flow-dashboard.com/login"
                    style='background-color: #006600; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;'
                  >
                    Go to Campus Flow Dashboard
                  </a>
                </div>
                <p style='color: #FFFFFF; line-height: 1.6;'>
                  If you have any questions, feel free to reach out to us.
                </p>
                <p style='color: #FFFFFF; line-height: 1.6;'>
                  Looking forward to seeing you there!
                </p>
              </div>
              <div style='background-color: #006600; color: #FFFFFF; text-align: center; padding: 10px;'>
                <p style='margin: 0;'>&copy; 2024 Campus Flow. All rights reserved.</p>
              </div>
            </div>
          `,
        };
  
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${name} (${email}):`, info.response);
        } catch (error) {
          console.error(`Failed to send email to ${name} (${email}):`, error);
        }
      }
  
      return { success: true, message: "Emails sent to all students successfully." };
    } catch (error) {
      console.error("Error in sendzoomconftostud:", error);
      return { success: false, message: "Failed to send emails to students.", error: error.message };
    }
  };