nodemailer = require("nodemailer");

const TimeZone = [
  {
    key: "worthing",
    mon_sat: {
      open: true,
      start: "9:00",
      end: "5:00",
    },
    sun: {
      open: true,
      start: "10:00",
      end: "4:00",
    },
  },
  {
    key: "brighton",
    mon_sat: {
      open: true,
      start: "9:30",
      end: "5:30",
    },
    sun: {
      open: true,
      start: "10:00",
      end: "4:00",
    },
  },
  {
    key: "chichester",
    mon_sat: {
      open: true,
      start: "9:00",
      end: "5:00",
    },
    sun: {
      open: false,
    },
  },
  {
    key: "172",
    mon_sat: {
      open: true,
      start: "10:00",
      end: "7:00",
    },
    sun: {
      open: false,
    },
  },
];
const getTimeZoneByKey = (key) => TimeZone.find((zone) => zone.key === key);
const SendEmail = async (body) => {
  const html = `
<body style="font-family: Segoe UI; margin: 0; padding: 0;">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div class="logo" style="text-align: center; margin-bottom: 20px;">
        <img style="max-width: 250px; height: auto;" src="https://res.cloudinary.com/dztxlecbe/image/upload/v1739427293/bdpz8moga6fumesf6u1i.jpg" alt="Company Logo">
      </div>
      <h1 class="headtitle" style="color: green; text-align: center;">${body?.body?.title} Order Confirmation</h1>
      <p style="font-size:18px">Hello <span class="customer-name" style="color: green;">${body?.body?.Name}</span>,</p>
      <p >${body?.body?.firstMessege}</p>
      <h2 style="color: green;">${body?.body?.secondTitle}</h2>
      <p >${body?.body?.secondMessege}</p>
      
      <div class="order-details" style="margin-top: 20px;">
        <h2 style="color: green;">Order Details:</h2>
  
             <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Currency</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.SecondRow}</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Rate</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.FourthRow}</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.CurrencyNameFirst}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.FromFirst}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.RateFirst}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.ToFirst}</td>
            </tr>
<tr style="display:${body?.body?.SecondRowShow}">
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.CurrencyNameSecond}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.FromSecond}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.RateSecond}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.ToSecond}</td>
            </tr>
<tr style="display:${body?.body?.ThirdRowShow}"  >
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.CurrencyNameThird}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.FromThird}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.RateThird}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.ToThird}</td>
            </tr>
<tr  style="display:${body?.body?.FourthRowShow}">
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.CurrencyNameFourth}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.FromFourth}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.RateFourth}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${body?.body?.ToFourth}</td>
            </tr>
          </table>
      </div>
       <div>
       <p></p>
       </div>
      <p style="color: green;">${body?.body?.title} Location:</p>
      <p class="branch-details" >Branch Address: ${body?.body?.Address} <br> Email: support@brightonfx.com</p>
  
      
    </div>
  </body>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "support@chichesterfx.com",
        pass: "pram gxqo rguw skbw",
      },
  });

  const info = await transporter.sendMail({
    from: "Brighton fx  <support@brightonfx.com>",
    to: body?.body?.Email,
    subject: `Thanks for your order request`,
    html: html,
  });
  return info.messageId;
};

const SendGoodNewsEmail = async (body) => {
  const html = `
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Ready for Collection</title>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
    <div class="container" style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
      <div class="logo" style="text-align: center; margin-bottom: 20px;">
       <img style="max-width: 200px; height: auto;" src="https://res.cloudinary.com/dztxlecbe/image/upload/v1739427293/bdpz8moga6fumesf6u1i.jpg" alt="Company Logo">
      </div>
      <h2 class="mtitle" style="color: white; font-weight: bold; text-align: center; font-size: 25px; background-color: green; margin-top: 0; padding-top: 20px;">Good News: Your Order is Ready for Collection</h2>
      <p>Hello ${body?.Name},</p>
      <p>Your order ${body?.Order_Id} is now ready for collection at our ${
    body?.Address
  }.</p>
      <p>This will be held at the exchange rate which was confirmed at the time of order for 24-hours. If you are not able to collect your currency within 24 hours, the exchange rate may be subject to change.</p>
      <p><strong class="st" style="color: green; font-size: 18px; text-decoration: underline;">Collecting your order:</strong></p>
      <p>When collecting your order you will need to provide proof of ID in the form of photographic ID (passport or driving license). In addition, please note that proof of address, such as a utility bill or a bank/credit card statement dated within the past 90 days, may also be needed in certain circumstances.</p>
      <p>If you need any help with your order, please get in touch with our customer services team on <a href="mailto:support@brightonfx.com" style="color: green;">support@brightonfx.com</a> (${
        getTimeZoneByKey(body.addressKey).mon_sat.start
      } to ${
    getTimeZoneByKey(body.addressKey).mon_sat.end
  } Monday to Saturday).</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Name:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
            body?.Name
          }</td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Email:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
            body?.Email
          }</td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Mobile:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
            body?.Phone_Number
          }</td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Currencies Ordered:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                 <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Currency</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.SecondRow
              }</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Rate</th>
              <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.FourthRow
              }</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.CurrencyNameFirst
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.FromFirst
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.RateFirst
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.ToFirst
              }</td>
            </tr>
<tr style="display:${body?.SecondRowShow}">
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.CurrencyNameSecond
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.FromSecond
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.RateSecond
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.ToSecond
              }</td>
            </tr>
<tr style="display:${body?.ThirdRowShow}"  >
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.CurrencyNameThird
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.FromThird
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.RateThird
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.ToThird
              }</td>
            </tr>
<tr  style="display:${body?.FourthRowShow}">
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.CurrencyNameFourth
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.FromFourth
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.RateFourth
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
                body?.ToFourth
              }</td>
            </tr>
          </table>
          </td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Collection Location:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
            body?.Address
          }</td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Phone:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">01273 030708</td>
        </tr>
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: left;">Email:</th>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">support@brightonfx.com</td>
        </tr>
      </table>
      
      <p><strong style="color: green;">Opening Times:</strong></p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Mon</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Tue</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Wed</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Thu</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Fri</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Sat</th>
          <th style="background-color: green; color: white; border: 1px solid #ddd; padding: 8px; text-align: center;">Sun</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).mon_sat.start
          } - ${getTimeZoneByKey(body.addressKey).mon_sat.end}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            getTimeZoneByKey(body.addressKey).sun.open
              ? `${getTimeZoneByKey(body.addressKey).sun.start} - ${
                  getTimeZoneByKey(body.addressKey).sun.end
                }`
              : "Closed"
          }</td>
        </tr>
      </table>
      
      <p class="footer" style="text-align: center; margin-top: 20px;">Have feedback? We would love to hear how we are doing; search for our store on Google and leave us a Google rating and review.</p>
      
      <p class="footer" style="text-align: center;">Thank you for ordering your travel money with us,<br>Brighton Fx</p>
      </div>
  </body>
      `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@chichesterfx.com",
      pass: "pram gxqo rguw skbw",
    },
  });

  const info = await transporter.sendMail({
    from: "Brighton fx  <support@brightonfx.com>",
    to: body?.Email,
    subject: `Your order ready for collection `,
    html: html,
  });
  return info.messageId;
};

module.exports = { SendEmail, SendGoodNewsEmail };
