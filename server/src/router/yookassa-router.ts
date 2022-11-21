import { Router } from 'express';

import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({ shopId: '959834', secretKey: 'test_pd0viR_HoFqnCx5Zf4NnlBgczCMau8lraOOvidtNwhk' });

const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5f3';

const createPayload: ICreatePayment = {
  amount: {
    value: '4.00',
    currency: 'RUB',
  },
  confirmation: {
    type: 'embedded',
  },
  capture: true,
};

const createPay = async () => {
  try {
    const payment = await checkout.createPayment(createPayload, idempotenceKey);
    console.log(payment);

    return payment;
  } catch (error) {
    console.error(error);
  }
};

const router = Router();

router.post('/', async () => {
  return await createPay();
});
router.post('/success', req => {
  console.log(req);
  console.log(req.body);
});

export default router;
