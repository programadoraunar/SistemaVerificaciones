import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/NavBar";
import { Toaster } from "react-hot-toast";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col gap-12 items-center">{children}</div>
      <Toaster />
      <Footer />
    </>
  );
}
