import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TransactionProps {
  amount: number;
  time: string;
  status: "Success" | "Pending" | "Failed";
}

const TransactionCard: React.FC<TransactionProps> = ({ amount, time, status }) => {
  const statusColors = {
    Success: "text-green-500 bg-green-100",
    Pending: "text-yellow-500 bg-yellow-100",
    Failed: "text-red-500 bg-red-100",
  };

  return (
    <Card className="w-80 p-4 shadow-lg rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Transaction Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Time:</span>
          <span className="font-medium">{time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded-lg text-sm font-semibold ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
