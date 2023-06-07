import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const CheckoutForm = ({price}) => {

    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [tranjectionId, setTranjectionId] = useState('');

    useEffect( () =>{
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            // console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    } ,[price, axiosSecure])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log('PaymentMethod', paymentMethod);
        }

        setProcessing(true)
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous'
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError)
            console.log(confirmError);
          }

          console.log(paymentIntent);
          setProcessing(false)

          if(paymentIntent.status === 'succeeded'){
            setTranjectionId(paymentIntent.id)
            //TODO: next steps
          }


    }

    return (
        <>
            <form className="w-2/3 my-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary mt-6" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>

            {
                cardError && <p className="text-red-500">{cardError}</p>
            }

            {
                tranjectionId && <p className="text-green-500">Tranjection Complite With tranjectionId: {tranjectionId}</p>
            }

        </>
    );
};

export default CheckoutForm;