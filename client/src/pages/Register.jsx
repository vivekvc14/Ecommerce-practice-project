import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  useToast,
  Container,
  Text,
  Heading,
  HStack,
  Stack,
  FormControl,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../components/TextField";
import { register, resetUpdateSuccess } from "../redux/actions/userActions";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });
  const { loading, error, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!userInfo) {
      dispatch(resetUpdateSuccess());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Your Full Name is required."),
        email: Yup.string()
          .email("Enter a valid email.")
          .required("Email is required."),
        password: Yup.string()
          .min(8, "Password's length should be at least 8 characters.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(8, "Password's length should be at least 8 characters.")
          .required("Password is required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match."),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
        navigate("/login");
        toast({
          description: "Account created successfully!",
          status: "success",
          isClosable: true,
        });
      }}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: 12, md: 24 }}
          px={{ base: 0, md: 8 }}
          minH="4xl"
        >
          <Stack spacing={8}>
            <Stack spacing={6}>
              <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
                <Heading size={headingBR}>Create an account</Heading>
                <HStack spacing={1} justify="center">
                  <Text color="muted">Already have an account?</Text>
                  <Button
                    style={{ textDecoration: "none" }}
                    as={RouterLink}
                    to="/login"
                    colorScheme="orange"
                    variant="link"
                  >
                    Sign In
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: 0, md: 8 }}
              px={{ base: 4, md: 10 }}
              bg={boxBR}
              boxShadow={{ base: "none", md: "xl" }}
            >
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
                    <TextField
                      name="password"
                      type="password"
                      placeholder="Your Password"
                      label="Password"
                    />
                    <TextField
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    isLoading={loading}
                    colorScheme="orange"
                    fontSize="md"
                    type="submit"
                    size="lg"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default Register;
