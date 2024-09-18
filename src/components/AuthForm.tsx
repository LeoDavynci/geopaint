// components/AuthForm.tsx
import { useState } from "react";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { auth } from "../../firebase";

export default function AuthForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoginMode, setIsLoginMode] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      setError(null);
      try {
         if (isLoginMode) {
            // Handle login
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in:", { email });
         } else {
            // Handle sign-up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signed up:", { email });
         }
      } catch (err) {
         setError("Authentication failed. Please try again.");
         console.error(err);
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
         <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
         />
         <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4"
         />
         {error && <p className="text-red-500">{error}</p>}
         <Button type="submit" className="w-full bg-blue-500 text-white">
            {isLoginMode ? "Login" : "Sign Up"}
         </Button>

         <div className="mt-4 text-center">
            {isLoginMode ? (
               <p>
                  Don't have an account?{" "}
                  <Button variant="link" onClick={() => setIsLoginMode(false)}>
                     Sign Up
                  </Button>
               </p>
            ) : (
               <p>
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setIsLoginMode(true)}>
                     Login
                  </Button>
               </p>
            )}
         </div>
      </form>
   );
}
