import Link from "next/link";
import Image from "next/image";

export default function Escudo() {
  return (
    <>
      <Link href="/">
        <Image
          src="/Escudo_Aunar.png"
          width={350}
          height={350}
          alt="Picture of the author"
        />
      </Link>
    </>
  );
}
