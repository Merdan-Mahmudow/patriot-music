import { SaveFormType, SaveIndividualFormType } from "../types";
import axios from 'axios';

export const saveForm = async ({ message, name, price, tg }: SaveFormType) => {
  const response: any = await axios.post('https://patriot-music.online/api/save-data', message);
  const data = {
    title: 'Новая анкета',
    description: `Покупка песни. Тариф "${name}"`,
    payload: response.data.payload,
    currency: 'RUB',
    prices: `${price}`,
    provider_data: {
      customer: {
        full_name: message.name,
        email: message.email,
      },
      receipt: {
        items: [
          {
            description: `Покупка песни. Тариф "${name}"`,
            quantity: 1,
            amount: {
              value: price,
              currency: 'RUB',
            },
            vat_code: 1,
            payment_mode: 'full_payment',
            payment_subject: 'commodity',
          },
        ],
        tax_system_code: 1,
      },
    },
  };

  const invoiceResponse = await axios.post(
    `https://patriot-music.online/api/create-invoice?web_app_data=` + JSON.stringify(data)
  );

  tg.WebApp.openInvoice(`${invoiceResponse.data}`, () => 'pending');
};
export const saveIndividualForm = async ({ message }: SaveIndividualFormType) => {
  return await axios.post('https://patriot-music.online/api/save-data', message);
};