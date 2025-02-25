import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Register() {
    const INITIAL_REGISTER_OBJ = {
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
        mobileNumber: "",
        role: "ADMIN",
        gender: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Validation
        if (registerObj.firstName.trim() === "") return setErrorMessage("First Name is required!");
        if (registerObj.lastName.trim() === "") return setErrorMessage("Last Name is required!");
        if (registerObj.email.trim() === "") return setErrorMessage("Email Id is required!");
        if (registerObj.password.trim() === "") return setErrorMessage("Password is required!");
        if (registerObj.confirmPassword.trim() === "") return setErrorMessage("Confirm Password is required!");
        if (registerObj.password !== registerObj.confirmPassword) return setErrorMessage("Passwords do not match!");
        if (registerObj.mobileNumber.trim() === "") return setErrorMessage("Mobile Number is required!");
        if (registerObj.gender.trim() === "") return setErrorMessage("Gender is required!");

        console.log(registerObj);
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerObj)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("token", data.token);
            window.location.href = '/app/welcome';
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText defaultValue={registerObj.firstName} updateType="firstName"
                                    containerStyle="mt-4" labelTitle="First Name"
                                    updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.lastName} updateType="lastName"
                                    containerStyle="mt-4" labelTitle="Last Name"
                                    updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4"
                                    labelTitle="Email Id" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.mobileNumber} updateType="mobileNumber"
                                    containerStyle="mt-4" labelTitle="Mobile Number"
                                    updateFormValue={updateFormValue} />
                                <div className="mt-4 relative">
                                    <InputText
                                        defaultValue={registerObj.password}
                                        type={showPassword ? "text" : "password"}
                                        updateType="password"
                                        labelTitle="Password"
                                        updateFormValue={updateFormValue}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowPassword}
                                        className="absolute right-2 top-10 text-sm text-primary hover:underline"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div className="mt-4 relative">
                                    <InputText
                                        defaultValue={registerObj.confirmPassword}
                                        type={showConfirmPassword ? "text" : "password"}
                                        updateType="confirmPassword"
                                        labelTitle="Confirm Password"
                                        updateFormValue={updateFormValue}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowConfirmPassword}
                                        className="absolute right-2 top-10 text-sm text-primary hover:underline"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <label className="label">
                                        <span className="label-text">Gender</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={registerObj.gender}
                                        onChange={(e) => updateFormValue({ updateType: "gender", value: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit"
                                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register
                            </button>
                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span
                                className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
