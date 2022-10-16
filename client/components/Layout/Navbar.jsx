import Link from "next/link";
import { Fragment, useContext } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Context } from "../../context/index";
import { COURSES, LOGOUT } from "../../context/types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import defaultProfile from "../../public/assets/img/default.png";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";

const Navbar = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("");
  const [search, setSearch] = useState("");

  // access state
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  });

  // const debounceSearchCourse = useCallback(() => {
  //   debounce(async (search) => {}, 500);
  // }, [dispatch]);

  const searchCourses = async () => {
    try {
      const { data } = await axios.post("/server/user/searchCourses", {
        search,
      });

      dispatch({
        type: COURSES,
        payload: data?.courses,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [search]);

  // destructuring user from state
  const { user } = state;

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

      toast.success(data.msg);
    }
  };

  return (
    // <main className="relative antialiased bg-white dark:bg-[#25292A] z-0 overflow-hidden">
    <nav className="flex fixed flex-row items-center justify-between w-screen px-4 md:px-20 h-20 antialiased bg-[#25292A] z-[100] shadow-lg shadow-[#25292A]/40">
      <div className="relative flex flex-row items-center space-x-1">
        <FaChalkboardTeacher className="text-4xl text-white" />
        <Link href={`${user ? "/home" : "/"}`} passHref>
          <h1 className="pl-2 text-2xl italic font-bold cursor-pointer text-gray-50">
            J-LEARN
          </h1>
        </Link>
      </div>
      {user && user.role && !user.role.includes["Instructor"] && (
        <div
          className={`w-[25rem] ${
            currentPage === "/home" ? "blcok" : "hidden"
          }`}
        >
          <input
            type="text"
            className="w-full rounded-xl border-white bg-[#25292A] focus:outline-none focus:bg-white focus:border-none"
            placeholder="Search Courses ......"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-row items-center space-x-8">
        {user && user.role && user.role.includes("Instructor") ? (
          <Link href="/instructor">
            <a className="hidden font-semibold text-gray-200 transition duration-100 md:block hover:text-[#5BC0BE]">
              Instructor
            </a>
          </Link>
        ) : (
          !user && (
            <Link href="/#courses">
              <a className="hidden font-semibold text-gray-200 transition duration-100 md:block hover:text-[#5BC0BE]">
                Courses
              </a>
            </Link>
          )
        )}

        {user && user.role && !user.role.includes("Instructor") ? (
          <Link href="/user/become-instructor">
            <a className="hidden font-semibold text-gray-200 transition duration-100 md:block hover:text-[#5BC0BE]">
              Become Instructor
            </a>
          </Link>
        ) : (
          user &&
          user.role &&
          user.role.includes("Instructor") && (
            <Link href="/instructor/course/create">
              <a className="hidden font-semibold text-gray-200 transition duration-100 md:block hover:text-[#5BC0BE]">
                Create Course
              </a>
            </Link>
          )
        )}

        {user === null && (
          <>
            <div className="relative hidden px-8 py-2 bg-white border border-gray-800 md:block rounded-3xl ">
              <div
                className="absolute inset-0 px-8 py-2 transform translate-x-1 translate-y-2 border rounded-3xl border-gray-50"
                style={{ zIndex: -10 }}
              ></div>
              <Link href="/login">
                <a className="relative font-bold text-gray-700 transition duration-100 transform hover:text-green-500 hover:-translate-y-2 hover:-translate-x-1">
                  Login
                </a>
              </Link>
            </div>
            <div className="relative hidden px-8 py-2 bg-white border border-gray-800 md:block rounded-3xl ">
              <div
                className="absolute inset-0 px-8 py-2 transform translate-x-1 translate-y-2 border rounded-3xl border-gray-50"
                style={{ zIndex: -10 }}
              ></div>
              <Link href="/register">
                <a className="relative font-bold text-gray-700 transition duration-100 transform hover:text-green-500 hover:-translate-y-2 hover:-translate-x-1">
                  Register
                </a>
              </Link>
            </div>
          </>
        )}

        {user !== null && (
          <div className="flex items-center justify-between text-white ">
            <h1>{user && user.name}</h1>
            <Menu
              as="div"
              className=" relative cursor-pointer w-[50px] rounded-full h-[50px] ml-8 bg-slate-400"
            >
              {({ open }) => (
                <>
                  <Menu.Button>
                    <Image
                      className="rounded-full "
                      src={
                        user?.avatar ? user?.avatar?.Location : defaultProfile
                      }
                      alt="profile"
                      layout="fill"
                    />
                  </Menu.Button>
                  {user !== null && !user?.role.includes("Instructor") && (
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute origin-top-right rounded-md right-0 bg-[#3A506B] h-[70px] w-[120px]">
                        <div className="flex flex-col items-center w-full h-full py-2">
                          {user && !user.role.includes("Instructor") && (
                            <Link href="/user" passHref>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`w-full font-bold ${
                                      active ? "bg-[#5BC0BE]" : "text-gray-400"
                                    }`}
                                  >
                                    Dashboard
                                  </button>
                                )}
                              </Menu.Item>
                            </Link>
                          )}

                          {/* <Link href="/user/account" passHref>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`w-full font-bold ${
                                  active ? "bg-[#5BC0BE]" : "text-gray-400"
                                }`}
                              >
                                Account
                              </button>
                            )}
                          </Menu.Item>
                        </Link> */}

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={`font-bold w-full ${
                                  active ? "bg-[#5BC0BE]" : "text-gray-400"
                                }`}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  )}
                </>
              )}
            </Menu>
          </div>
        )}
      </div>
    </nav>
    // </main>
  );
};

export default Navbar;
