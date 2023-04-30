import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField, Field } from "formik";

const TextField = ({ label, type, name, placeholder }) => {
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb={6}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field
        as={Input}
        type={type}
        placeholder={placeholder}
        name={name}
        {...field}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
