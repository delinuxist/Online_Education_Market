import { useEffect, useState, Fragment, useContext } from "react";
import Header from "../../components/Layout/Header";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";
import { LOGOUT } from "../../context/types";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoutes";

const BecomeInstructor = ({ data }) => {
  const [selected, setSelected] = useState(data[0]);
  const [business_name, setBusiness_name] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [business_email, setBusiness_email] = useState("");
  const [businessContact, setBusinessContact] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter;

  const { dispatch } = useContext(Context);

  // logout function
  const logout = async () => {
    // sending a get request to backend
    const { data } = await axios.get("/server/logout");
    if (data.success) {
      // dispatch logout type
      dispatch({
        type: LOGOUT,
      });

      // remove user data from localStorage
      window.localStorage.removeItem("user");

      // redirect to login page
      router.push("/login");

      toast.success("Please Login to Create Courses");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/server/payment/create_SubAccount", {
        bankDetails: selected,
        accountNumber,
        business_name,
        business_email,
        businessContact,
      });

      setLoading(false);
      console.log(data);

      if (data.status === "success") {
        logout();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="h-screen pt-[5rem] w-full">
        <div>
          <Header heading={"Setup Payout Account"} />
          <div className="flex items-center justify-center w-full">
            <form className="py-8 w-[40rem] flex-col flex">
              <label className="mb-2 font-semibold text-2xl">
                Transfer Type
              </label>
              <Listbox value={selected} onChange={setSelected}>
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm mb-3">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-20 max-h-56 w-[40rem]  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map((account) => (
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-[#5BC0BE] text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        key={account.id}
                        value={account}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {account.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
              <input
                className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
                type="text"
                value={accountNumber}
                placeholder="Account Number"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <input
                className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
                type="text"
                value={business_name}
                placeholder="Business Name"
                onChange={(e) => setBusiness_name(e.target.value)}
              />
              <input
                className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
                type="email"
                value={business_email}
                placeholder="Business Email"
                onChange={(e) => setBusiness_email(e.target.value)}
              />
              <input
                className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
                type="text"
                value={businessContact}
                placeholder="Busisness Contact Mobile"
                onChange={(e) => setBusinessContact(e.target.value)}
              />
              <div
                onClick={handleSubmit}
                className="w-full h-28 flex items-center justify-center "
              >
                <div className="py-3 px-6 hover:scale-105 duration-200 cursor-pointer bg-[#5BC0BE] rounded-lg text-white ease-in-out">
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/payment/fetch_Banks`);

  return {
    props: {
      data,
    },
  };
}

export default BecomeInstructor;

{
  /* <div className="grid grid-cols-2 justify-items-center">
              <PayOutCard img={payStack} />
              <PayOutCard img={flutterWave} />
            </div> */
}
