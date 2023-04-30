import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField, Field } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { useState } from "react";

const PasswordTextField = ({ label, type, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb={6}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          {...field}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordTextField;
