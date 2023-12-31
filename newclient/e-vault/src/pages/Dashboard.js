import React, { useEffect, useState } from "react";
import { useVault } from "../context/context";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Center,
  HStack,
  Flex,
  useColorModeValue,
  Box,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Dashboard = (props) => {
  const { account, contract, userType } = useVault();
  const navigate = useNavigate();
  const [numberOfCases, setNumberOfCases] = useState(0);
  const [numOfJudges, setNumOfJudges] = useState(0);
  const [numOfLawyers, setNumOfLawyers] = useState(0);
  const [numOfClients, setNumOfClients] = useState(0);

  const goToCases = () => {
    navigate("/Cases");
  };

  useEffect(() => {
    console.log("Account : ", account);
    console.log("Contract : ", contract);
    console.log("User Type : ", userType);

    const getDetails = async () => {

      setNumOfJudges((await contract.getJudgeList()).length)
      setNumOfLawyers((await contract.getLawyerList()).length)
      setNumOfClients((await contract.getClientList()).length)

      let cl = [];
      if (userType === "Client") {
        cl = await contract.getClientCaseIds(account);
      } else if (userType === "Judge") {
        cl = await contract.getJudgeCaseIds(account);
      } else if (userType === "Lawyer") {
        cl = await contract.getLawyerCaseIds(account);
      } else {
        cl = await contract.getAllCaseIdsAndNames();
      }

      if (userType === "Admin") {
        setNumberOfCases(cl.length - 1);
      } else {
        setNumberOfCases(cl.length);
      }
    };
    getDetails();
  }, []);

  return (
    <VStack align={"center"} justify={"center"}>
      {userType === "" && (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Box
            border="2px solid cyan"
            bgColor={"cyan.400"}
            borderRadius="50"
            m={20}
            p={10}
          >
            <HStack>
              <Heading>
                <InfoOutlineIcon />
              </Heading>
              <Heading>
                Please Contact the Admin to add you as a new member
              </Heading>
            </HStack>
          </Box>
        </Flex>
      )}

      {
          userType !== "" && (
            <>
              <HStack align={"center"} justify={"center"}>
                <Card maxW="sm" align="center">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                      alt="Court Hammer"
                      borderRadius="lg"
                      h={240}
                      w={330}
                      objectFit={"cover"}
                    />
                    <Stack mt="6" spacing="3" align="center">
                      <Heading size="md">Number of Cases </Heading>

                        <Text color="blue.600" fontSize="2xl">
                          {userType === "Admin" ? numberOfCases+1 : numberOfCases}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blue" onClick={goToCases}>
                          View Cases
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW="sm" align="center">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                      alt="Judge"
                      borderRadius="lg"
                      h={240}
                      w={330}
                      objectFit={"cover"}
                    />
                    <Stack mt="6" spacing="3" align="center">
                      <Heading size="md">Number of Judges </Heading>

                        <Text color="blue.600" fontSize="2xl">
                          {numOfJudges}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Link to='/Judge'>
                          <Button variant="solid" colorScheme="blue" isDisabled={userType !== "Admin" ? true : false}>
                            View Judges
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </CardFooter>
                </Card>
              </HStack>

              <HStack align={"center"} justify={"center"}>
                <Card maxW="sm" align="center">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Lawyer"
                      borderRadius="lg"
                      h={240}
                      w={330}
                      objectFit={"cover"}
                    />
                    <Stack mt="6" spacing="3" align="center">
                      <Heading size="md">Number of Lawyers </Heading>

                        <Text color="blue.600" fontSize="2xl">
                          {numOfLawyers}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Link to='/Lawyer'>
                          <Button variant="solid" colorScheme="blue" isDisabled={userType !== "Admin" ? true : false}>
                            View Lawyers
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW="sm" align="center">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1796&q=80"
                      alt="Client"
                      borderRadius="lg"
                      h={240}
                      w={330}
                      objectFit={"cover"}
                    />
                    <Stack mt="6" spacing="3" align="center">
                      <Heading size="md">Number of Clients </Heading>

                        <Text color="blue.600" fontSize="2xl">
                          {numOfClients}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Link to='/Client'>
                          <Button variant="solid" colorScheme="blue" isDisabled={userType !== "Admin" ? true : false}>
                            View Clients
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </CardFooter>
                </Card>
              </HStack>
            </>
          )
      }

    </VStack>
  );
};

export default Dashboard;
