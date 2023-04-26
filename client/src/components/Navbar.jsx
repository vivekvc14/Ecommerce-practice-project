import {
  Box,
  HStack,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Flex,
  Text,
  Stack,
  IconButton,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { GiTechnoHeart } from "react-icons/gi";

const links = [
  { linkName: "Products", path: "/products" },
  { linkName: "Shopping Cart", path: "/cart" },
];

const ReactLink = ({ path, children }) => (
  <Link
    as={NavLink}
    to={path}
    px={2}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={NavLink} to={"/"}>
            <Flex alignItems={"center"}>
              <Icon as={GiTechnoHeart} h={6} w={6} color="orange.400"></Icon>
              <Text fontWeight={"extrabold"}>TechCommerce</Text>
            </Flex>
          </Link>

          <HStack as="nav" spacing={4} display={{ md: "flex", base: "none" }}>
            {links.map((link) => (
              <ReactLink key={link.linkName} path={link.path}>
                {link.linkName}
              </ReactLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"}>
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf={"center"}
              onClick={() => toggleColorMode()}
            />
          </NavLink>

          <Button
            display={{ md: "inline-flex", base: "none" }}
            as={NavLink}
            to="/login"
            fontSize={"sm"}
            variant={"light"}
            fontWeight={400}
            py={2}
          >
            Sign In
          </Button>
          <Button
            display={{ md: "inline-flex", base: "none" }}
            as={NavLink}
            to="/registration"
            fontSize={"sm"}
            fontWeight={600}
            m={2}
            bg={"orange.500"}
            _hover={{ bg: "orange.400" }}
            color="white"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box display={{ md: "none" }} pb={4}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <ReactLink key={link.linkName} path={link.path}>
                {link.linkName}
              </ReactLink>
            ))}
            <ReactLink key={"sign up"} path={"/registration"}>
              Sign Up
            </ReactLink>
            <ReactLink key={"sign up"} path={"/login"}>
              Sign In
            </ReactLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
