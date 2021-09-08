import React from "react";
import { View, Pressable, TextInput } from "react-native";
import Button from "../../../globalcomponents/Button";
import Container from "../../../globalcomponents/Container";
import Text from "../../../globalcomponents/Text";
import { theme } from "../../../utils/theme";
import { ScrollView} from 'react-native-gesture-handler'

export default function Signup(props: any) {
  const [showing, setShowing] = React.useState(false);
  return (
    <View style={{ width: theme.screenWidth, height: theme.screenHeight, backgroundColor: 'gold' }}>
      <ScrollView
        alwaysBounceVertical
        style={{
          height: theme.screenHeight,
          backgroundColor: "white",
        }}
        horizontal={false}
        scrollEnabled
      >
        <Container
          width="100%"
          height="150px"
          bgColor="white"
          justifyContent="center"
          alignItems="flex-start"
          paddingLeft="20px"
          paddingRight="20px"
        >
          <Text fontWeight="bold" fontSize="30px" color="black">
            HX
          </Text>
        </Container>
        <Container
          width="100%"
          height="50px"
          bgColor="white"
          alignItems="flex-start"
          paddingLeft="20px"
          paddingRight="20px"
        >
          <Text color="black" fontSize="24px" fontWeight="bold">
            Create Your Account
          </Text>
          <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
            Create Your Account To Continue
          </Text>
        </Container>

        <Container
          height={`${theme.screenWidth/100 * 190}px`}
          width="100%"
          justifyContent="flex-start"
          bgColor="white"
          paddingLeft="20px"
          paddingRight="20px"
          marginTop="20px"
        >
          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Firstname
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="55px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <TextInput style={{ flex: 1 }} />
            </Container>
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Lastname
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <TextInput style={{ flex: 1 }} />
            </Container>
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Phone
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <TextInput style={{ flex: 1 }} />
            </Container>
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Email
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <TextInput style={{ flex: 1 }} />
            </Container>
          </Container>

          <Container
            width="100%"
            height="60px"
            justifyContent="center"
            alignItems="flex-start"
            marginTop="30px"
          >
            <Text color="gray" fontSize="16px" fontWeight="500" marginTop="6px">
              Password
            </Text>
            <Container
              flexDirection="row"
              width="100%"
              borderRadius="5px"
              justifyContent="flex-start"
              alignItems="center"
              bgColor="#32797C1E"
              height="50px"
              marginTop="10px"
              paddingLeft="10px"
              paddingRight="10px"
            >
              <TextInput style={{ flex: 1 }} secureTextEntry={showing} />
              <Pressable onPress={() => setShowing((prev) => !prev)}>
                <Text fontSize="18px" color="grey" fontWeight="bold">
                  {showing ? "SHOW" : "HIDE"}
                </Text>
              </Pressable>
            </Container>
          </Container>

          <Container
            width="100%"
            height="100px"
            justifyContent="flex-start"
            marginTop="50px"
          >
           <Pressable
           onPress={() => props.navigation.navigate('verifyemail')}
           style={{ width: '100%'}}
           >
            <Button>
                <Text>Create Account</Text>
                </Button>
           </Pressable>
          </Container>

          <Container
            width="100%"
            height="40px"
            justifyContent="center"
            alignItems="flex-end"
            flexDirection="row"
            paddingBottom="10px"
          >
            <Pressable
              onPress={() => props.navigation.navigate("resetpassword")}
            >
              <Text
                textAlign="center"
                color="grey"
                fontSize="16px"
                fontWeight="600"
              >
                Already Have An Account?
              </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("login")}>
              <Text
                textAlign="center"
                color={theme.primaryBackgroundColor}
                fontSize="16px"
                fontWeight="600"
              >
                {" "}
                Login
              </Text>
            </Pressable>
          </Container>
        </Container>
      </ScrollView>
    </View>
  );
}
