export interface NavigationItem {
  name: string;
  href: string;
  icon: "Home" | "Package" | "Settings";
}

export interface NavbarProps {
  className?: string;
}
