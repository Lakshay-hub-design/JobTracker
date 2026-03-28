import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const VerifyEmail = () => {

    const { handleVerifyEmail, handleResendOtp, error} = useAuth()
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);

  const inputRef = useRef([]);

  const location = useLocation()
  const email = location.state?.email

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
  };

  const handleSubmit = () => {
    const code = otp.join("");
    handleVerifyEmail({ email, otp: code })
  };

  const handleResend = () => {
    setTimer(30);
    handleResendOtp(email)
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 
    bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">

      {/* Back + Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-3 text-white">
        <Link to="/user/register">
            <ArrowLeft className="cursor-pointer text-xl" />
        </Link>
        <h2 className="text-lg font-semibold">JobTracker</h2>
      </div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center text-white">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-full">
            <MailCheck size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3">
          Verify Your Email
        </h1>

        <p className="text-gray-200 mb-8">
          We've sent a 6-digit code to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl rounded-lg 
              bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold 
          hover:bg-yellow-300 transition mb-6"
        >
          Verify Email
        </button>

        {/* Resend */}
        <p className="text-sm text-gray-200">
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span>
              Resend in <span className="text-yellow-300">{timer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-yellow-300 cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </main>
  );
};

export default VerifyEmail;