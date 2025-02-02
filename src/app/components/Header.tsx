import Link from "next/link";
import React from "react";

function Header() {
  const links = [
    { id: 1, href: "/", title: "Home", icon: "house" },
    { id: 3, href: "/todos", title: "Todos", icon: "list-check" },
    { id: 2, href: "/sites", title: "Sites", icon: "geo-alt" },
  ];
  return (
    <div className="shadow-sm py-3 px-2">
      <div className="d-flex gap-2 mx-1">
        {links.map((link) => (
          <Link key={link.id} className="nav-link" href={link.href}>
            <i className={`bi bi-${link.icon} me-1`}></i>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
