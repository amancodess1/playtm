"use client"
import { useRouter } from "next/navigation";

export default function() {
    return <div className="w-full mr-5">
        <Banner></Banner>
        <Card ></Card>
    </div>
}
const Banner = () => {
    return (
      <div className="w-full mr-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10 px-6 text-center rounded-2xl shadow-lg ">
        <h1 className="text-3xl font-bold mb-2">Welcome to PlayTM</h1>
        <h4> extract money from bank to wallet, pay to friends </h4>
      </div>
    );
  };
  const Card = () => {
    const router=useRouter()
    return (
        
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">PlayTm Services</h2>
        <div className="grid grid-cols-1 gap-4">
          <button  className="bg-blue-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-gray-900" onClick={()=>router.push("/transfer")}>Transfer</button>
          < button className="bg-green-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-gray-900" onClick={()=>router.push("/transactions")}>Transactions</button>
          <button  className="bg-purple-500 text-white p-4 rounded-lg text-center font-semibold hover:bg-gray-900" onClick={()=>router.push("/p2p")}>P2P Transfer</button>
        </div>
      </div>
    );
  };
  
