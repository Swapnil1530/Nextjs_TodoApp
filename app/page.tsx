"use client"
import Image from 'next/image'
import toast from "react-hot-toast";

export default function Home(e:any) {
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const res = await fetch("/api/Task",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title:e.currentTarget.title.value,
        desc:e.currentTarget.desc.value,
      })
    })
    if(res.ok){
      toast.success("data submitted");
    }
    else{
      const {error} = await res.json();
      toast.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label
              htmlFor="prnNumber"
              className="block text-xs text-white uppercase"
          >
            Title
          </label>
          <input
              id="title"
              name="title"
              type="text"
              placeholder=""
              required
              className="mt-1 block w-full bg-transparent rounded-md border  px-3 py-2  shadow-sm focus:border-white  focus:ring-white sm:text-sm"
          />
        </div>
        <div>
          <label
              htmlFor="password"
              className="block text-xs text-white uppercase"
          >
            Desc
          </label>
          <input
              id="desc"
              name="desc"
              type="text"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-white px-3 py-2 bg-transparent shadow-sm focus:border-white  focus:ring-white sm:text-sm"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
