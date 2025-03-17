import { getUserBalance, getUserDetails } from "../../lib/actions/getUserDetails";

export default async function() {
  const userDetails=await getUserDetails();
  const userBalance=await getUserBalance();
  const userData = {
    id: userDetails?.id,
    name: userDetails?.name,
    email: userDetails?.email,
    phone: userDetails?.number,
    balance: userBalance?.amount
};
    return <div className="w-full mr-5">
        <Banner></Banner>
        <UserCard user={userData}></UserCard>
    </div>
}
const Banner = () => {
    return (
      <div className="w-full mr-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10 px-6 text-center rounded-2xl shadow-lg ">
        <h1 className="text-3xl font-bold mb-2">Welcome to PlayTm</h1>
      </div>
    );
  };
  import React from "react";

const UserCard = ({ user }:any) => {
    if (!user) return <p className="text-center text-gray-500">No user data available.</p>;

    return (
        <div className=" mt-10 bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">User Information</h2>
            
            <div className="space-y-3">
                <p className="text-gray-700"><span className="font-semibold">User ID:</span> {user.id}</p>
                <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p className="text-gray-700"><span className="font-semibold">Balance INR:</span> {user.balance.toFixed(2)}</p>
            </div>
        </div>
    );
};



  