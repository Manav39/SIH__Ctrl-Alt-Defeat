import React, { useEffect } from 'react'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Textarea,
    Toast,
    useToast,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { useVault } from '../context/context'

const AddNewLawyer = ({ onSuccess }) => {

    const toast = useToast();

    const { account, contract } = useVault();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const add_lawyer = async() => {
        try {
            await contract.addLawyer(address, name)
            toast({
                position: "top",
                title: "New Lawyer Added Successfully",
                status: "success",
                duration: 1500,
                isClosable: true,
            });
            onSuccess();
        }
        catch(err) {
            toast({
                position: "top",
                title: "Error While Adding Lawyer",
                status: "error",
                duration: 1500,
                isClosable: true,
            });
            console.log(err);
        }
    }

    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                Add A New Lawyer
            </Heading>
            
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            >
            <Stack spacing={4}>
                <HStack>
                
                    <FormControl id="title" isRequired>
                        <FormLabel>Lawyer Name</FormLabel>
                        <Input type="text" onChange={(e) => setName(e.target.value)}/>
                    </FormControl>
                
                </HStack>
                <FormControl id="desc" isRequired>
                    <FormLabel>Lawyer Address</FormLabel>
                    <Input type="text" onChange={(e) => setAddress(e.target.value)}/>
                </FormControl>

                <Stack spacing={10} pt={2}>
                <Button
                    onClick={add_lawyer}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Add
                </Button>
                </Stack>
                <Stack pt={6}>
                
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
    )
}

export default AddNewLawyer;