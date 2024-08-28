import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Use POST method for this handler
export async function POST(request) {
  try {
    const data = await request.json();
    console.log({ data });

    // Step 1: Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., "mail.privateemail.com"
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // e.g., "info@coderacle.com"
        pass: process.env.EMAIL_PASS, // e.g., "Dunkrink#1940"
      },
    });

    // Step 2: Setup email options
    const mailOptions = {
      from: `"ForestLawn" <${process.env.EMAIL_USER}>`, // sender address
      to: [`${data.email}`], // list of receivers
      subject: "ForestLawn SUbject",
      html: `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
        </title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          body {
            margin: 0;
            padding: 0;
            background-color: white;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table, td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <style type="text/css">
          @media only screen and (min-width:480px) {
            .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body style="word-spacing:normal;">
        <div style="margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <p style="text-decoration: underline;font-size:20px;margin:0px auto;width:100%;">
                            billpay.forestlawn.com Form Submission
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:18px;line-height:2;text-align:left;color:black;font-weight:600">
                              Purchase Information
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              Account #: ${data.accountNumber}
                            </div>
                          </td>
                        </tr>
                        
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              Name on Contract: ${data.nameOnContract}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:18px;line-height:2;text-align:left;color:black;font-weight:600">
                              Card Holder Information
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              Firstname: ${data.firstName}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              LastName: ${data.lastName ?? "N/A"}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              Street Address: ${data.streetAddress}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              City: ${data.city}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              State: ${data.state}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:helvetica;font-size:14px;line-height:2;text-align:left;color:black;">
                              Zip: ${data.zip}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
      </html>`,
    };

    console.log({ transporter });
    // Step 3: Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
