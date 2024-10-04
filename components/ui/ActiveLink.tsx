import { useRouter } from "next/router";
import React, { ReactNode } from "react";
// Definir las props con tipos
interface ActiveLinkProps {
  children: ReactNode; // Tipo para 'children'
  href: string; // Tipo para 'href'
}
const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default ActiveLink;
