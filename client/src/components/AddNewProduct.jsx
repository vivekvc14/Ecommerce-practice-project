import { useState } from "react";
import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  Text,
} from "@chakra-ui/react";
import { MdDriveFolderUpload } from "react-icons/md";
import { createProduct } from "../redux/actions/adminAcctions";
import { useDispatch } from "react-redux";

const AddNewProduct = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(
      createProduct({
        brand,
        category,
        name,
        price: +price,
        stock: +stock,
        image,
        description,
        productIsNew,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Image File Name</Text>
        <Tooltip label="Set the name of your image." fontSize="sm">
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Tooltip>
      </Td>

      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          height="120px"
          width="270px"
          size="sm"
          placeholder="Description"
        />
      </Td>

      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input
          placeholder="Samsung or iPhone etc."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          size="sm"
        />

        <Text fontSize="sm">Name</Text>
        <Input
          placeholder="Samsung S30 etc."
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="sm"
        />
      </Td>

      <Td>
        <Text fontSize="sm">Category</Text>
        <Input
          placeholder="Electronics"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="sm"
        />

        <Text fontSize="sm">Price</Text>
        <Input
          placeholder="299.99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          size="sm"
        />
      </Td>

      <Td>
        <Text fontSize="sm">Stock</Text>
        <Input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="1"
          size="sm"
        />
        <Text fontSize="sm">New badge shown on the product card</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="productIsNewFlag" mb={0} fontSize="sm">
            Enable
            <Badge
              rounded="full"
              mx={1}
              px={1}
              fontSize=".8rem"
              colorScheme="green"
            >
              New
            </Badge>
            badge?
          </FormLabel>
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>

      <Td>
        <VStack>
          <Button
            colorScheme="orange"
            variant="outline"
            width="160px"
            onClick={addItem}
          >
            <MdDriveFolderUpload />
            <Text ml="5px">Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};
export default AddNewProduct;
