import MyAccount from "@/components/Dashboard/MyAccount";

export default function DasboardLayout({ children }) {
  return (
    <main className=" flex ">
      <div className="fixed left-0 top-24 z-20 flex h-auto w-fit flex-col justify-between overflow-auto border-r border-r-light-2 pb-5 pt-28 max-md:hidden">
        <MyAccount />
      </div>
      <section className="main-container container  max-md:ml-0 w-full ml-60  ">
        <div className="w-full ">{children}</div>
      </section>
    </main>
  );
}
