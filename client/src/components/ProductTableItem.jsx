import { useState, useRef } from "react";
import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
} from "@chakra-ui/react";
import ConfirmModal from "./ConfirmModal";
import { DeleteIcon } from "@chakra-ui/icons";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { updateProduct, deleteProduct } from "../redux/actions/adminAcctions";
import { useDispatch } from "react-redux";

const ProductTableItem = ({ product }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image.substring(8));
  const [description, setDescription] = useState(product.description);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);
  const dispatch = useDispatch();

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        {
          brand,
          category,
          name,
          price,
          stock,
          image,
          description,
          productIsNew,
        },
        product._id
      )
    );
  };

  const openDeleteConfirm = () => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Tooltip label={product.image} fontSize="sm">
            <Image boxSize="100px" fit="cover" src={product.image} />
          </Tooltip>
        </Td>

        <Td>
          <Textarea
            height="120px"
            width="270px"
            value={description}
            size="sm"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Td>

        <Td>
          <Flex direction="column" gap={2}>
            <Input
              size="sm"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Input
              size="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
        </Td>

        <Td>
          <Flex direction="column" gap={2}>
            <Input
              size="sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              size="sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Flex>
        </Td>

        <Td>
          <Flex direction="column" gap={2}>
            <Input
              size="sm"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
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
          </Flex>
        </Td>

        <Td>
          <VStack>
            <Button
              colorScheme="red"
              variant="outline"
              width="160px"
              onClick={openDeleteConfirm}
            >
              <DeleteIcon mr="5px" />
              Remove Product
            </Button>

            <Button
              colorScheme="red"
              variant="outline"
              width="160px"
              onClick={onSaveProduct}
            >
              <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
      </Tr>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={product}
        deleteAction={deleteProduct}
      />
    </>
  );
};

export default ProductTableItem;
