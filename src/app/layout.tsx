import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function RootLayout({ children }) {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
      });
      return () => unsubscribe();
   }, []);

   return (
      <div>
         <header>
            {user ? `Logged in as ${user.email}` : "Not logged in"}
         </header>
         {children}
      </div>
   );
}
