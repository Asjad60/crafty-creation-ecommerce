import { paymentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/productSlice";
import logo from "../../assets/logo/craftyLogo.png";

const { CAPTURE_PAYMENT_API, VERIFY_PAYMENT_API } = paymentEndpoints;

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export async function buyProduct(
  products,
  token,
  user_details,
  navigate,
  dispatch
) {
  console.log("consoling userDetails ==>", user_details);
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      );
      return;
    }
    console.log("consoling loadScript ===> ", res);
    const orderResponse = await apiConnector(
      "POST",
      CAPTURE_PAYMENT_API,
      { products },
      { Authorization: `Bearer ${token}` }
    );

    console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse);

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "Crafty Creation",
      description: "Thank you for Purchasing the Product.",
      Image: logo,
      prefill: {
        name: `${user_details.name}`,
        email: user_details.email,
      },
      handler: function (response) {
        verifyPayment({ ...response, products }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log("Payment Failed Response:", response);
      toast.error("Oops! Payment Failed.");
      console.log("Error Details:", response.error);
    });
  } catch (error) {
    console.log("Buying Product Error ===> ", error);
    toast.error("could not Make Payment");
  }
  toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  console.log("vreifying handler ");
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful.");
    navigate("/dashboard/my-orders");
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
