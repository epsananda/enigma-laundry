import React from "react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const FooterBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      className="border-t-1 border-abu-muda mt-44"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="justify">
        <NavbarItem>
          <p className="text-abu-muda text-xs text-center">
            Copyright 2024 All Rights Reserved Enigma Laundry.
          </p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default FooterBar;
