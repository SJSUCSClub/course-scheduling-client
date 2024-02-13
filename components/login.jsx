import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login = () =>{
    const { data: session, status } = useSession();
    return(
        <div>
            <GoogleButton onClick={()=>{signIn("google",undefined,{
                prompt:"select_account"
            })}}/>
            {status === "authenticated" && 
                <p>Signed in as {session.user.email}</p>
            }
        </div>

    )

}
export default Login;