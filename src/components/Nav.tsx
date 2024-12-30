"use client";
import { useAppSelector } from "@/app/hooks";
import { useLogUser } from "@/utils/login";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const userData = useAppSelector((state) => state.user);
  const isSignedIn = useAppSelector((state) => state.user.loggedIn);
  const router = useRouter();
  const { logoutUser } = useLogUser();

  const login = () => {
    router.push("/");
  };

  const logout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <Navbar className="bg-0a0a0a">
      <NavbarBrand>
        <Link color="foreground" href="/">
          <p className="font-bold text-xl text-inherit">taxMe</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/receipt">
            <p className="text-lg">Cart</p>
          </Link>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform bg-gradient-to-r from-stone-500 to-pink-500"
              color="default"
              name=""
              size="sm"
              aria-label="User profile"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {isSignedIn ? (
              <>
                <DropdownItem
                  aria-label="User Progile"
                  key="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as:</p>
                  <p className="font-semibold">{userData.userName}</p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  onPress={() => {
                    router.push("/dashboard");
                  }}
                  aria-label="Dashboard"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  aria-label="Logout"
                  key="logout"
                  color="danger"
                  onPress={logout}
                >
                  Log Out
                </DropdownItem>
              </>
            ) : (
              <DropdownItem
                key="login"
                aria-label="login"
                className="h-14 gap-2"
                onPress={login}
              >
                <p className="font-semibold">Sign In</p>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
