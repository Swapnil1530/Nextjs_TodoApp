import Form from "@/components/form";

const Login = () => {
    return (

        <div className="flex mt-[100px] items-center justify-center ">
            <div className="z-10  w-full max-w-md overflow-hidden rounded-2xl border shadow-xl">
                <div className="flex border-b border-white flex-col items-center justify-center space-y-3  px-2 py-4  text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-white  ">
                        Use your Email and password to sign in
                    </p>
                </div>
                <Form type="login" />
            </div>
        </div>

    );
}
export default Login;