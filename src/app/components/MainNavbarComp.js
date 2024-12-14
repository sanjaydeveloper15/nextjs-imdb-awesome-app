import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { SearchIcon } from "../assets/svg/SearchIcon";

const MainNavbarComp = () => {
    return (
        <Navbar isBordered>
            <NavbarContent justify="start">
                <NavbarBrand>
                    <p className="hidden sm:block font-bold text-inherit">AwesomeIMDB</p>
                </NavbarBrand>
                <NavbarContent as="div" className="items-center">
                    <Input
                        classNames={{
                            base: "max-w-full",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search movies, web series and more..."
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-6" justify="end">
                    <NavbarItem isActive>
                        <Link color="secondary" href="#">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="#" aria-current="page" color="foreground">
                            Movies
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Web Series
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
        </Navbar>
    )
}


export default MainNavbarComp;