import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { LinkIcon } from "@heroicons/react/20/solid"


const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project 25",
  description: "A nextjs app by Jonas Lang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={robotoMono.className} >
        <div className="flex flex-col h-full w-full">
          
          {children}
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-2xl animated-gradient"
        style={{
          width: '200%',
          height: '200%',
          }}
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">Project 2025</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          Designed by Jonas Lang
        </p>
        <a
          href="/login"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Login <LinkIcon className="w-4 h-4 inline -mt-0.5" />
        </a>
      </div>
      <div className="flex flex-1 justify-end"></div>
    </div>
  )
}
