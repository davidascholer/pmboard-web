import PageContainer from "@/app/components/PageContainer";

export default function AuthContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="bg-[url(/mountains-twilight.webp)] bg-fixed bg-cover bg-center w-full h-full text-bee-neutral overflow-scroll themed-scrollbar">
      <div className="bg-white/80 p-6 rounded-lg shadow-lg max-w-md w-11/12 mx-auto mt-2">
        {children}
      </div>
    </PageContainer>
  );
}
