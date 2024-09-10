import Link from "next/link";
import Image from "next/image";

export default function DeployButton() {
  return (
    <>
      <Link href="/">
        <Image
          src="/Escudo_Aunar.png"
          width={300}
          height={300}
          alt="Picture of the author"
        />
      </Link>
    </>
  );
}
