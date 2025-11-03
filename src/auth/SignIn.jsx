import common from "@/common/common";
import { useAuth } from "@/context/authContext";
import staticDataContext from "@/context/staticDataContext";
import { authenticationStatus, getStaticData } from "@/service/apiService";
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();

  const { setAuthStatus } = useAuth();
  const { setStaticData } = useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      // POST login
      await common.getSignIn(formData);

      // Fetch auth status
      const response = await authenticationStatus();
      const newAuthStatus = { ...response.data, loading: false };
      setAuthStatus(newAuthStatus);

      if (newAuthStatus.authenticated) {
        // Fetch static data
        const staticDataResponse = await getStaticData();
        setStaticData(staticDataResponse?.data || {});

        toast.success("Logged in successfully!", {
          icon: <CircleCheck fill="#00c951" className="text-white" />,
          closeButton: true,
        });
        navigate("/home/homepage", { replace: true });
      }
    } catch (error) {
      console.error("Failed to sign in invalid credentials", error);
      setAuthStatus({
        ...error?.response?.data,
        loading: false,
      });

      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      {/* Background */}
      <div className="flex h-[100dvh] w-full items-center justify-center bg-[#E6F2FA]">
        {/* Main Card */}
        <div className="flex h-[500px] w-4xl rounded-xl border border-[#E2E8F0] bg-[#F9FAFB] shadow-md">
          {/* Left Side (Logos) */}
          {/*  */}
          <div
            className="flex w-full flex-col items-center justify-center gap-10 rounded-l-xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='498' height='500' preserveAspectRatio='none' viewBox='0 0 498 500'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1283%26quot%3b)' fill='none'%3e%3crect width='498' height='500' x='0' y='0' fill='rgba(41%2c 171%2c 235%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c131.788C28.602%2c131.707%2c58.624%2c143.878%2c84.063%2c130.804C110.107%2c117.419%2c127.896%2c90.209%2c135.776%2c62.007C143.166%2c35.56%2c130.468%2c8.969%2c125.66%2c-18.067C121.037%2c-44.064%2c120.547%2c-70.379%2c108.093%2c-93.663C93.325%2c-121.273%2c78.297%2c-155.587%2c47.959%2c-163.334C17.543%2c-171.101%2c-8.702%2c-140.993%2c-38.493%2c-131.095C-66.893%2c-121.659%2c-102.296%2c-128.194%2c-122.959%2c-106.545C-143.717%2c-84.796%2c-137.627%2c-50.095%2c-143.872%2c-20.686C-150.648%2c11.228%2c-173.11%2c43.245%2c-161.215%2c73.624C-149.298%2c104.06%2c-115.115%2c120.187%2c-84.369%2c131.28C-57.368%2c141.022%2c-28.705%2c131.869%2c0%2c131.788' fill='%23128ac5'%3e%3c/path%3e%3cpath d='M498 702.0550000000001C536.328 700.2909999999999 573.46 688.3489999999999 605.047 666.568 635.984 645.235 658.205 614.472 674.274 580.502 690.509 546.181 697.621 509.297 697.399 471.331 697.149 428.698 698.16 382.79200000000003 672.9159999999999 348.435 647.053 313.235 604.267 291.226 560.948 285.619 520.189 280.34299999999996 481.332 300.029 444.828 318.91200000000003 413.658 335.036 391.51800000000003 361.43100000000004 366.60699999999997 386.148 339.451 413.092 303.652 433.919 292.148 470.403 279.942 509.114 285.995 552.198 302.567 589.251 319.20799999999997 626.458 349.126 656.347 384.427 676.723 418.71500000000003 696.514 458.452 703.875 498 702.0550000000001' fill='%2361c1f0'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1283'%3e%3crect width='498' height='500' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left",
            }}
          >
            <div>
              <img
                src="/images/NIA.png"
                height="50"
                alt="NIA Logo"
                className="mt-3 object-contain"
              />
            </div>
            <div className="flex-col items-center justify-center text-center">
              <p className="mb-1 font-semibold text-white">Powered By</p>
              <div>
                <img
                  src="/images/taxosmart-logo-white.png"
                  className="h-[55px] object-contain"
                  alt="Tax-O-Smart"
                />
              </div>
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="flex w-full flex-col items-center justify-center space-y-10 p-8">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-semibold text-[#0A3D91]">Sign In</h1>
              <p className="text-sm text-[#64748B]">
                Welcome Back! Please enter your credentials
              </p>
            </div>

            <div className="w-72 space-y-5">
              {/* Financial Year */}
              <div>
                <label
                  htmlFor="fy"
                  className="text-sm font-medium text-[#1E293B]"
                >
                  Financial Year
                </label>
                <select
                  id="fy"
                  name="fy"
                  className="mt-1 block w-full cursor-pointer rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#1E293B] outline-none"
                  // value={formData.fy || ""}
                  // onChange={handleChange}
                >
                  <option value="Select FY">Select FY</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2025-26">2024-25</option>
                  <option value="2025-26">2023-24</option>
                </select>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-[#1E293B]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#1E293B] outline-none"
                  value={formData.username || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#1E293B]"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#1E293B] outline-none"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <span className="absolute right-3 bottom-2.5 text-[#0A3D91]">
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <Eye
                      size={20}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </span>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-[#0A3D91] py-2 font-medium text-white transition-colors hover:bg-[#173F73]"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
