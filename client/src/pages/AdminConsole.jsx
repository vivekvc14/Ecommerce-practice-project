import {
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, redirect } from "react-router-dom";
import UsersTab from "../components/UsersTab";

const AdminConsole = () => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo && userInfo.isAdmin ? (
    <Box p="20px" minH="100vh">
      <Stack
        align={{ lg: "flex-start" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Stack
          pr={{ base: 0, md: 14 }}
          spacing={{ base: 8, md: 10 }}
          mb={{ base: 12, md: "none" }}
          flex="1.5"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Admin Console
          </Heading>
          <Tabs size="md" variant="encolsed">
            <TabList>
              <Tab>Users</Tab>
              <Tab>Products</Tab>
              <Tab>Reviews</Tab>
              <Tab>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : userInfo && !userInfo.isAdmin ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminConsole;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }
  return null;
};
