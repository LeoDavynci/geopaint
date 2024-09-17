import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body className="bg-gray-100">
            <div className="min-h-screen flex flex-col">
               {/* Shared Header */}
               <header className="bg-blue-500 text-white p-4 shadow-md">
                  <h1 className="text-xl font-bold">GeoConquer</h1>
               </header>

               {/* Page Content */}
               <main className="flex-grow">{children}</main>

               {/* Shared Footer */}
               <footer className="bg-gray-900 text-white text-center p-4">
                  <p>&copy; 2024 GeoConquer</p>
               </footer>
            </div>
         </body>
      </html>
   );
}
