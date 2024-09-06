import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Box, Button, HStack, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import { useProductStore } from "../store/product";
import { useState } from "react";


function ProductCard({product}) {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);

        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }   
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                isClosable: true
            });
        }
    }

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        
    >
        <Image src={product.image} alt={product.title} h={56} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.title}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color='gray.600'>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<MdModeEditOutline />} colorScheme='blue' onClick={onOpen}/>
                <IconButton
                    icon={<MdDelete />}
                    onClick={() => handleDeleteProduct(product._id)}
                    colorScheme='red'
                />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='title'
                            value={updatedProduct.title}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })}
                            />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}
                    onClick={()=>handleUpdateProduct(product._id, updatedProduct)}
                    >Update</Button>
                    <Button colorScheme='red'  onClick={onClose}>Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard