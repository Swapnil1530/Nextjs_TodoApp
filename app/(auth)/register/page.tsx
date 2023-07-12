import Form from "@/components/form";

const register = () => {
    return(
        <div className="flex flex-col mt-[100px] items-center justify-center ">
            <div className="z-10  w-full max-w-md overflow-hidden rounded-2xl border shadow-xl">
                <div className="flex border-b border-white flex-col items-center justify-center space-y-3  px-2 py-4  text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>

                </div>
                <Form type="register" />
            </div>
        </div>
    )
}
export default register;