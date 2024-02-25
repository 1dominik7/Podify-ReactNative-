import {
  AUTH_EMAIL,
  MAILTRAP_TOKEN,
  VERIFICATION_EMAIL,
} from "#/utils/variables";
import { MailtrapClient } from "mailtrap";

const ENDPOINT = "https://send.api.mailtrap.io/";

interface Profile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const { name, email } = profile;

  const client = new MailtrapClient({
    token: MAILTRAP_TOKEN,
  });

  const sender = {
    email: VERIFICATION_EMAIL,
    name: "Verification Podify",
  };
  const recipients = [
    {
      email,
    },
  ];
  // client
  //   .send({
  //     from: sender,
  //     to: recipients,
  //     subject: "Verification Email",
  //     html: generateTemplate({
  //       title: "Welcome to Podify",
  //       message: welcomeMessgae,
  //       logo: "cid:logo",
  //       banner: "cid:welcome",
  //       link: "#",
  //       btnTitle: token,
  //     }),
  //     category: "Verification Mail",
  //     attachments:[
  //       {
  //         filename: "welcome.png",
  //         content_id: "welcome",
  //         disposition: "inline",
  //         content: welcomeImage,
  //         type: 'image/png'
  //       },
  //       {
  //         filename: "logo.png",
  //         content_id: "logo",
  //         disposition: "inline",
  //         content: logoImage,
  //         type: 'image/png'
  //       }
  //     ]
  //   })
  return client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "5910b4e3-2f00-4216-a22c-b7deaa64fce8",
      template_variables: {
        user_name: name,
        token,
      },
    })
    .catch((err) => console.log("Mail issue:", err));
};

interface Options {
  email: string;
  link: string;
}

export const sendForgetPasswordLink = async (options: Options) => {
  // const transport = generateMailTransporter();

  const { email, link } = options;

  const client = new MailtrapClient({
    token: MAILTRAP_TOKEN,
  });

  const sender = {
    email: AUTH_EMAIL,
    name: "Password Reset",
  };

 return client
    .send({
      from: sender,
      to: [{ email }],
      template_uuid: "95a9ef6c-8d30-42b8-aeae-ef34e9286ded",
      template_variables: {
        user_email: email,
        pass_reset_link: link,
      },
    })
    .catch((err) => console.log("Mail issue:", err));

  // const message = `We just reveived a request that you forgot your password. No problem you can use the link below and create brand new password.`;

  // transport.sendMail({
  //   to: email,
  //   from: VERIFICATION_EMAIL,
  //   subject: "Reset Password Link",
  //   html: generateTemplate({
  //     title: "Forget Password",
  //     message,
  //     logo: "cid:logo",
  //     banner: "cid:forget_password",
  //     link,
  //     btnTitle: "Reset Password",
  //   }),
  //   attachments: [
  //     {
  //       filename: "logo.png",
  //       path: path.join(__dirname, "../mail/logo.png"),
  //       cid: "logo",
  //     },
  //     {
  //       filename: "forget_password.png",
  //       path: path.join(__dirname, "../mail/forget_password.png"),
  //       cid: "forget_password",
  //     },
  //   ],
  // });
};
export const sendPassResetSuccessEmail = async (
  name: string,
  email: string
) => {
  const client = new MailtrapClient({
    token: MAILTRAP_TOKEN,
  });

  const sender = {
    email: AUTH_EMAIL,
    name: "Password Reset",
  };

 return client
    .send({
      from: sender,
      to: [{ email }],
      template_uuid: "67dbf68c-40da-4184-beb7-e372ed11cffb",
      template_variables: {
        user_name: name,
        user_email: email,
      },
    })
    .catch((err) => console.log("Mail issue:", err));

  // const transport = generateMailTransporter();

  // const message = `Dear ${name} we just updated your new password. You can now sign in with your new password.`;

  // transport.sendMail({
  //   to: email,
  //   from: VERIFICATION_EMAIL,
  //   subject: "Password Reset Successfully",
  //   html: generateTemplate({
  //     title: "Password Reset Successfully",
  //     message,
  //     logo: "cid:logo",
  //     banner: "cid:forget_password",
  //     link: SIGN_IN_URL,
  //     btnTitle: "Log in",
  //   }),
  //   attachments: [
  //     {
  //       filename: "logo.png",
  //       path: path.join(__dirname, "../mail/logo.png"),
  //       cid: "logo",
  //     },
  //     {
  //       filename: "forget_password.png",
  //       path: path.join(__dirname, "../mail/forget_password.png"),
  //       cid: "forget_password",
  //     },
  //   ],
  // });
};
