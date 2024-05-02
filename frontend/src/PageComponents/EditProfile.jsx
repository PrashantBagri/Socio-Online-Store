import React, { useEffect , useState} from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import FormError from "./ui/FormError";

const FULLNAME_MAX = 30;
const FULLNAME_MIN = 8;

const USERNAME_MAX = 16;
const USERNAME_MIN = 4;

function EditProfile() {
  const { auth } = useAuth();
  const [avatar, setAvatar] = useState(auth?.user?.avatar)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState : {errors, isDirty, dirtyFields}, getValues} = useForm({
    defaultValues: {
      fullName : auth?.user?.fullName,
      email : auth?.user?.email,
      username : auth?.user?.username,
      avatar : auth?.user?.avatar
    },
  });

  const onSubmit = async(data) => {
    setIsLoading(true)
    const formData = new FormData()
    if(isDirty){
      formData.append('avatar', data.avatar[0])
      Object.entries(data).forEach(([key, value])=>{
        if(Object.keys(dirtyFields).includes(key)){
          if(key!=='avatar'){
            formData.append(`${key}`, value)
          }
        }
      })
      console.log(...formData)
      
      const response = await axios.patch(`/users/edit-user/${auth?.user?.username}`, formData, {
        withCredentials : true,
        headers :{
          'Content-Type' : 'multipart/form-data'
        }
      })
      if(response.data.data.user._id){
        setIsLoading(false)
      }
      setAvatar(response.data.data.user.avatar)
    }
    // console.log(data)
  };

  return (
    <>
      <div className="w-[80vw] mx-auto flex justify-center font-spartan" >
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="h-[15vw] w-[15vw] overflow-clip rounded-full border-4 border-black ">
        <img src={avatar} alt="" className="h-full w-full object-cover " />

        </div>
          <span className="flex flex-col gap-2 my-3">
            <label htmlFor="avatar" className="font-medium text-3xl">Edit avatar</label>
            <input className="file:bg-black file:border-black file:border-2 file:text-white file:px-6 file:py-2" type="file" src="" alt="" {...register("avatar", {
              // required : {
              //   value: true,
              //   message : "This field is required."
              // }
            })}/>
            
          </span>
          <span className="flex flex-col gap-2 my-3">
            <label htmlFor="fullName" className="font-medium text-3xl">Full name</label>
            <input
              className="border-2 px-6 py-2 border-gray-200"
              type="text"
              name="fullName"
              {...register("fullName", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: FULLNAME_MIN,
                  message: `Full name should contain minimum ${FULLNAME_MIN} characters.`,
                },
                maxLength: {
                  value: FULLNAME_MAX,
                  message: `Full name should contain maximum ${FULLNAME_MAX} characters.`,
                },
                pattern: {
                  value: /[a-zA-Z]+/,
                  message: "Invalid Full Name",
                },
              })}
            />
            {errors?.fullName && <FormError error={errors?.fullName.message}/>}
          </span>
          <span className="flex flex-col gap-2 my-3">
            <label htmlFor="email" className="font-medium text-3xl">Email</label>
            <input
            className="border-2 px-6 py-2 border-gray-200"
              type="text"
              name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message:"Invalid email"
                },
              })}
            />
            {errors?.email && <FormError error={errors?.email.message}/>}
          </span>
          <span className="flex flex-col gap-2 my-3">
            <label htmlFor="username" className="font-medium text-3xl">Username</label>
            <input
            className="border-2 px-6 py-2 border-gray-200"
              type="text"
              name="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
                minLength: {
                  value: USERNAME_MIN,
                  message: `Username must contain atleast ${USERNAME_MIN} characters.`,
                },
                maxLength: {
                  value: USERNAME_MAX,
                  message: `Username cannot contain more than ${USERNAME_MAX} characters.`,
                }
              })}
              />
              {errors?.username && <FormError error={errors?.username.message}/>}
          </span>
          <button type="submit" className="px-6 py-2 bg-black text-white w-fit mx-auto my-8 rounded-sm">Update Profile</button>
        </form>
      <div className={`${isLoading? "block" : "hidden"}   absolute h-full w-full bg-white/90 `}>
              <div className="bg-red-600 h-[10vh] w-[10vh] mx-auto mt-[10%] rounded-full relative animate-spin">
                <div className="bg-black h-[2vh] w-[2vh] rounded-full absolute top-4 right-4"></div>
              </div>
      </div>
      </div>
    </>
  );
}

export default EditProfile;
