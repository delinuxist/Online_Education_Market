import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import paymentSuccessLottie from "../../public/assets/lottie/89618-gopay-succesfull-payment.json";
import paymentFailedLottie from "../../public/assets/lottie/19230-payment-failed.json";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Verification = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status, transaction_id, tx_ref } = router.query;

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(`/server/payment/verify_Callback`, {
          status: status,
          tx_ref: tx_ref,
          transaction_id: transaction_id,
        });
        if (data.success) {
          setPaymentSuccess(true);
        } else {
          setPaymentSuccess(false);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error("Error");
      }
    };
    if (status && transaction_id && tx_ref) {
      verifyPayment();
    }
  }, [status, transaction_id, tx_ref]);

  // const verifyPayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `/server/payment/verify_Callback/${status}/${tx_ref}/${transaction_id}`
  //     );
  //     setPaymentSuccess(data.success);
  //     console.log(data.success);
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //     toast.error(err.response.msg);
  //   }
  // };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: paymentSuccessLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsTwo = {
    loop: true,
    autoplay: true,
    animationData: paymentFailedLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {loading ? (
        <SyncOutlined className="text-4xl text-teal-600" spin />
      ) : (
        status && (
          <>
            <Lottie
              options={paymentSuccess ? defaultOptions : defaultOptionsTwo}
              height={400}
              width={400}
            />
            <div className="mt-4">
              <h1
                className={`font-serif text-5xl font-bold ${
                  paymentSuccess ? "text-green-600" : " text-red-600"
                }`}
              >
                {paymentSuccess ? "Payment Success..." : "Payment Failed..."}
              </h1>
            </div>
            <Link href={"/home"}>
              <a className="mt-5 bg-[#5BC0BE] px-3 py-3 rounded-md text-2xl text-white font-semibold font-serif shadow-2xl hover:scale-105 duration-200">
                Home Page
              </a>
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default Verification;
