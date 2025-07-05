import { ReactNode } from "react";

export default function AuthPage({
  children,
  title,
  href = "/",
  imageSrc,
  iconImage,
}: {
  children: ReactNode;
  title: string;
  href?: string;
  imageSrc: string;
  iconImage: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={href} className="flex gap-2 font-medium items-center">
            <span>{iconImage}</span>
            <span>{title}</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
      <div className="relative hidden h-full lg:flex justify-center items-center">
        <img
          src={imageSrc}
          alt="Image"
          className="inset-0 w-full object-contain dark:brightness-[0.5] p-10 bg-none"
        />
      </div>
    </div>
  );
}
