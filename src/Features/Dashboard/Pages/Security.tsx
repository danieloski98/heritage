import React from "react";
import { View, Pressable, TextInput } from "react-native";
import Container from "../../../globalcomponents/Container";
import { theme } from "../../../utils/theme";
import Button from "../../../globalcomponents/Button";
import Text from "../../../globalcomponents/Text";
import { Feather, Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";


export default function Security() {
    const [showing, setShowing] = React.useState(false);
  return (
    <View style={{ backgroundColor: 'white'}}>
        <Navbar />
      <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: 'white' }}>
      <Text color="black" fontSize="23px" fontWeight="bold">
        Change Password
      </Text>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          Old Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
          <Pressable onPress={() => setShowing((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
      </Container>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          New Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
          <Pressable onPress={() => setShowing((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
      </Container>

      <Container
        width="100%"
        height="15%"
        justifyContent="center"
        alignItems="flex-start"
        marginTop="30px"
        bgColor="white"
      >
        <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
          Confirm Password
        </Text>
        <Container
          flexDirection="row"
          width="100%"
          borderRadius="5px"
          justifyContent="flex-start"
          alignItems="center"
          bgColor={theme.textInputBgColor}
          height="50px"
          marginTop="10px"
          paddingLeft="10px"
          paddingRight="10px"
        >
          <Ionicons name="lock-closed" size={25} color={theme.color} />
          <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
          <Pressable onPress={() => setShowing((prev) => !prev)}>
            <Text fontSize="16px" color="grey" fontWeight="bold">
              {showing ? "SHOW" : "HIDE"}
            </Text>
          </Pressable>
        </Container>
      </Container>

      <Container width="50%" height="55px" marginTop="30px"  bgColor="white">
        <Button>
          <Text color="white" fontSize="16px">
            Update
          </Text>
        </Button>
      </Container>
      </View>
    </View>
  );
}
