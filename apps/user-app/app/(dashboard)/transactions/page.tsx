
//import { Center } from "@repo/ui/center";
import { getSentTransactions, getTransactions } from "../../lib/actions/getTransactioins"
//import { Card } from "@repo/ui/card";
// <div>
       
// 
           
// </div>"
export default async function () {
    const transactions = await getTransactions();
    const sortedTransactions = transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const sentTransactions = await getSentTransactions(); 
    const sortedSentTransactions =sentTransactions.sort((a,b)=>b.timestamp.getTime()-a.timestamp.getTime())

    return(<div className="flex justify-between">

              <div className=" flex-row " >
            {sortedTransactions.map(t => <TransactionCard amount={(+t.amount)} time={t.timestamp} status={"Success"}></TransactionCard>)}
            </div>

            <div className="flex-col ml-20" >
            {sortedSentTransactions.map(t => <TransactionCard amount={(-t.amount)} time={t.timestamp} status={"Success"}></TransactionCard>)}
            </div>
    </div>
    )
}
const TransactionCard = ({ amount, time, status }:any) => {
    const statusColors = {
      Success: "text-green-600 bg-green-100",
      Processing: "text-yellow-600 bg-yellow-100",
      Failure: "text-red-600 bg-red-100",
    };
  
    return (
      <div className="w-80 p-4 shadow-lg rounded-2xl border bg-white">
        <h2 className="text-lg font-semibold mb-3">Transaction Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount INR:</span>
            <span className="font-medium"> {(amount/100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{time.toDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-lg text-sm font-semibold ${statusColors[status]}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    );
  };
  