import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

export const sendEmail = (data: {
  to: string;
  templateId: string;
  dynamicTemplateData?: { [name: string]: any };
}) => {
  return sgMail.send({
    from: {
      email: 'menu-suggestion@outlook.jp',
      name: 'Menu Suggestion',
    },
    ...data,
  });
};
