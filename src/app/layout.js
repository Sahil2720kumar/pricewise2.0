import "./globals.css";
import Navbar from "@/components/Navbar";
// import { Inter, Space_Grotesk } from "next/font/google";
// 
// const inter = Inter({ subsets: ["latin"] });
// const spaceGrotesk = Space_Grotesk({
//     subsets: ["latin"],
//     weight: ["300", "400", "500", "600", "700"]
// });
//className={inter.className}
export const metadata = {
    title: "Pricewise",
    description:
        "Track product prices effortlessly and save money on your online shopping."
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className=""  >
                <main className='max-w-7xl mx-auto'>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    );
}
