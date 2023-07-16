import {getServerSession} from "next-auth";

const Page = async () => {
    const session = await getServerSession();
    const user = session?.user;
    return(
      <div className="flex border-4 m-2 border-white items-center justify-center h-[620px]">
          <div className="text-white text-3xl font-semibold bg-gray-900 p-5">
          <h1 className="text-center m-2 border-2 border-blue-800 p-2">Profile</h1>
          <h1 className="mt-5">Name : {user.name}</h1>
          <h1 className="mt-5">Email : {user.email}</h1>
          </div>
      </div>
    )
}
export default Page;