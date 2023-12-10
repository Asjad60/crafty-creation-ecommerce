const { contactUsEmail } = require("../mail/template/contactFormres");
const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
  try {
    const { email, firstname, lastname, message, phoneNumber, countrycode } =
      req.body;

    console.log("countrycode ==> ", countrycode);

    const sendMail = await mailSender(
      email,
      "Your Data Send Successfully",
      contactUsEmail(
        email,
        firstname,
        lastname,
        message,
        phoneNumber,
        countrycode
      )
    );
    console.log("Email Response ======> ", sendMail);

    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
