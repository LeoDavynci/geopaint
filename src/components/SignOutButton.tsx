import { signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { auth } from "../../firebase";

export default function SignOutButton() {
   const handleSignOut = () => {
      signOut(auth)
         .then(() => {
            console.log("Signed out successfully");
         })
         .catch((error) => {
            console.error("Error signing out:", error);
         });
   };

   return (
      <Button className="bg-red-500 text-white" onClick={handleSignOut}>
         Sign Out
      </Button>
   );
}
