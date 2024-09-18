import { redirect } from "next/navigation";

export default function RedirectToMainPage() {
   redirect("/main");
   return null;
}
