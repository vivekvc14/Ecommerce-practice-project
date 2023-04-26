import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { products } from "../products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <Wrap spacing={"30px"} minHeight={"100vh"} justify={"center"}>
      {products.map((product) => (
        <WrapItem key={product._id}>
          <Center w="250px" h="550px">
            <ProductCard product={product} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Products;
