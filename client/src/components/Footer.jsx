import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiTechnoHeart } from "react-icons/gi";

const Footer = () => (
  <Box w="100%" bg={useColorModeValue("gray.100", "gray.900")}>
    <Container w="100%" as="footer" role="contentinfo" maxW={"7xl"}>
      <Stack
        w="100%"
        spacing="8"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        py={{ base: "12", md: "16" }}
      >
        <Stack spacing={{ base: "6", md: "8" }} align="start">
          <Flex alignItems="center" spacing={2}>
            <Icon as={GiTechnoHeart} h={10} w={10} color="orange.400" />
            <Text fontSize="2xl" fontWeight="extrabold">
              TechCommerce
            </Text>
          </Flex>
          <Text color="muted">Remarkable Tech products.</Text>
        </Stack>
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">How it works</Button>
                <Button variant="link">Pricing</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              maxW={{ lg: "360px" }}
            >
              <Button variant="primary" type="submit" flexShrink={0}>
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} TechCommerce, Inc. All rights
          reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            target="_blank"
            href="https://www.linkedin.com/in/vivek-c-8660a3270/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://github.com/vivekkk-01"
            target="_blank"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            target="_blank"
            as="a"
            href="https://twitter.com/_Vivek01"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
