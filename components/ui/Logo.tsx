import Image from "next/image";

export function AppLogo() {
  return (
    <Image
      src="/AjiraNet2-svg.svg"
      alt="AjiraNet"
      width={100}
      height={40}
      priority
    />
  );
}