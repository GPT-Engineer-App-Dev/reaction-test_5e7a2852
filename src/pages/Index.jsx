import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const Index = () => {
  const [status, setStatus] = useState("waiting"); // waiting, ready, click
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (status === "ready") {
      const timer = setTimeout(
        () => {
          setStatus("click");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // 1-3 seconds delay

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleStart = () => {
    setStatus("ready");
    setEndTime(null);
  };

  const handleClick = () => {
    if (status === "click") {
      setEndTime(Date.now());
      setStatus("waiting");
    } else {
      // False start, reset
      toast({
        title: "Too soon!",
        description: "Don't click before the screen turns green.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setStatus("waiting");
    }
  };

  const renderButtonMessage = () => {
    if (status === "waiting") return "Start";
    if (status === "ready") return "Wait for green...";
    if (status === "click") return "Click!";
  };

  const calculateReactionTime = () => {
    if (startTime && endTime) {
      return endTime - startTime;
    }
    return null;
  };

  return (
    <Container centerContent>
      <VStack spacing={6} mt={20}>
        <Heading>Reaction Time Test</Heading>
        <Text>
          {status === "waiting" && "Click the button to start the test."}
          {status === "ready" && "Wait for the color to change..."}
          {status === "click" && "Click as fast as you can!"}
        </Text>
        <Box width="100%" height="200px" bg={status === "click" ? "green.500" : "red.500"} transition="background-color 0.5s" />
        <Button leftIcon={<FaPlay />} colorScheme={status === "click" ? "green" : "blue"} onClick={status === "waiting" ? handleStart : handleClick} size="lg">
          {renderButtonMessage()}
        </Button>
        {calculateReactionTime() !== null && <Text fontSize="xl">Reaction Time: {calculateReactionTime()} ms</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
