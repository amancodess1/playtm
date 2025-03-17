import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const router=useRouter()
    return <div className="bg-blue-300 flex justify-between border-b px-4 border-slate-300">
        <button onClick={()=>router.push("/dashboard")}className="text-blue hover:bg-gray-700 font-medium rounded-md text-md px-5   mb-2 mt-2">
            PlayTM
        </button>
        <div className="flex flex-row justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            <button className=" text-white hover:bg-gray-700  h-10 w-10 bg-gray-500 ml-10 mr-5 font-medium rounded-3xl" onClick={()=>router.push("/me")}>U</button>
        </div>
    </div>
}