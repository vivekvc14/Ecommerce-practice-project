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
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { GiTechnoHeart } from "react-icons/gi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { CgProfile } from "react-icons/cg";
import { MdLocalShipping, MdLogout } from "react-icons/md";

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
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: "You have been logged out successfully!",
      status: "success",
      isClosable: true,
    });
  };

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
          <Link
            as={NavLink}
            to={"/"}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems={"center"}>
              <Icon
                as={GiTechnoHeart}
                h={6}
                w={6}
                color={isHovering ? "cyan.400" : "orange.400"}
                mr={1}
              ></Icon>
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
              mx={2}
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf={"center"}
              onClick={() => toggleColorMode()}
            />
          </NavLink>

          {userInfo ? (
            <Menu>
              <MenuButton px={4} py={2} transition="all .3s" as={Button}>
                {userInfo.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={NavLink} to="/profile">
                  <CgProfile />
                  <Text ml={2}>Profile</Text>
                </MenuItem>
                <MenuItem as={NavLink} to="/your-orders">
                  <MdLocalShipping />
                  <Text ml={2}>Your Orders</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml={2}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
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
            </>
          )}
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
