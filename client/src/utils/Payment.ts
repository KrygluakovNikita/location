declare global {
  interface Window {
    YooMoneyCheckoutWidget: any;
  }
}

export const Payment = () => {
  const checkout = new window.YooMoneyCheckoutWidget({
    confirmation_token: 'ct-2b0d7de5-000f-5000-8000-102c11d51a79', //Токен, который вы получили после создания платежа //Ссылка на страницу завершения оплаты
    error_callback: function (error: any) {
      console.log(error);
    },
  });

  //Отображение платежной формы в контейнере
  checkout.render('payment-form');
};
