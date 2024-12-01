import { Navbar, NavbarBrand, NavbarContent, Link } from "@nextui-org/react";

// functional component
const FooterComp = () => {
	// console.log(process.env)
	return (
		<Navbar isBordered>
			<NavbarContent justify="start">
				<NavbarBrand>
					<p>&copy; 2024 AwesomeIMDB - All Rights Reserved</p>
				</NavbarBrand>

				<NavbarContent className="hidden sm:flex gap-6" justify="end">
					<Link><a href="#">Terms of Use</a></Link>
					<Link><a href="#">Privacy Policy</a></Link>
					<Link><a href="#">Sitemap</a></Link>
					<Link><a href="#">FAQs</a></Link>
				</NavbarContent>
			</NavbarContent>
		</Navbar>
	);
};

export default FooterComp;