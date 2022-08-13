import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import WithUserSidebar from "../../components/hoc/withUserSidebar";
import { useRouter } from "next/router";

const Login = () => {
  const [providers, setProviders] = useState(null);

  const { data: session } = useSession();

  // const { user } = session;
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      router.push("/music");
    }
  }, [session?.user, router]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div className=" pt-[5rem] flex flex-col items-center w-full min-h-screen justify-center">
        <img
          className="mb-5 w-52"
          src="https://links.papareact.com/9xl"
          alt="spotify"
        />
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/music" })}
                className="bg-[#18D860] text-white p-5 rounded-full"
              >
                Login with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WithUserSidebar(Login);

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// }
