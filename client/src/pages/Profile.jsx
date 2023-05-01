import {
  Box,
  useToast,
  Text,
  Heading,
  HStack,
  Stack,
  FormControl,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";
import * as Yup from "yup";
import { Formik } from "formik";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved.",
        status: "success",
        isClosable: true,
      });
    }
  }, [updateSuccess, toast]);

  return (
    <>
      {!userInfo ? (
        navigate("/login")
      ) : (
        <Formik
          initialValues={{
            name: userInfo.name,
            email: userInfo.email,
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Your Full Name is required."),
            email: Yup.string()
              .email("Enter a valid email.")
              .required("Email is required."),
            password: Yup.string().min(
              8,
              "Password's length should be at least 8 characters."
            ),
            confirmPassword: Yup.string()
              .min(8, "Password's length should be at least 8 characters.")
              .oneOf([Yup.ref("password"), null], "Passwords must match."),
          })}
          onSubmit={(values) => {
            dispatch(resetUpdateSuccess());
            dispatch(
              updateProfile(
                userInfo.id,
                values.name,
                values.email,
                values.password
              )
            );
          }}
        >
          {(formik) => (
            <Box
              minH="100vh"
              maxW={{ base: "3xl", lg: "7xl" }}
              mx="auto"
              px={{ base: 4, md: 8, lg: 12 }}
              py={{ base: 6, md: 8, lg: 12 }}
            >
              <Stack
                spacing={6}
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack flex={1.5} mb={{ base: "2", md: "none" }}>
                  <Heading fontSize="2xl" fontWeight="extrabold">
                    Profile
                  </Heading>
                  <Stack spacing={6}>
                    <Stack spacing={6} as="form" onSubmit={formik.handleSubmit}>
                      {error && (
                        <Alert
                          status="error"
                          justifyContent="center"
                          alignItems="center"
                          textAlign="center"
                          flexDirection="column"
                        >
                          <AlertIcon />
                          <AlertTitle>Try again</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Stack spacing={5}>
                        <FormControl>
                          <TextField
                            name="name"
                            type="text"
                            placeholder="Your Full Name"
                            label="Full Name"
                          />
                          <TextField
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            label="Email"
                          />
                          <PasswordTextField
                            name="password"
                            type="password"
                            placeholder="Your Password"
                            label="Password"
                          />
                          <PasswordTextField
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            label="Confirm Password"
                          />
                        </FormControl>
                      </Stack>
                      <Stack spacing={6}>
                        <Button
                          colorScheme="orange"
                          size="lg"
                          fontSize="md"
                          type="submit"
                          isLoading={loading}
                        >
                          Save
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Flex
                  direction="column"
                  _dark={{ bg: "gray.900" }}
                  align="center"
                  flex={1}
                >
                  <Card>
                    <CardHeader>
                      <Heading size="md">User Report</Heading>
                    </CardHeader>
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing={4}>
                        <Box fontSize="sm" pt={2}>
                          Registered on{" "}
                          {new Date(userInfo.createdAt).toDateString()}
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </Flex>
              </Stack>
            </Box>
          )}
        </Formik>
      )}
    </>
  );
};

export default Profile;

export const loader = () => {
  const isUser = JSON.parse(localStorage.getItem("userInfo"));
  if (!isUser) {
    return redirect("/login");
  }
  return null;
};
