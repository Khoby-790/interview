import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Layout, Text } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { schedulePushNotification } from "../../components/Notification";
import { useAppTheme } from "../../context/theme";
import { StackParamList } from "../../Root";

const { width, height } = Dimensions.get("window");

const Blog = ({ navigation, route }: StackScreenProps<StackParamList>) => {
  const blog = route.params?.blog;
  let dt = new Date();
  const { theme } = useAppTheme();
  const [readPerentage, setReadPerentage] = useState<Number>(0);
  const [day] = useState("Monday");
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime] = useState(new Date(dt.setHours(dt.getHours() + 3)));
  const [color, setColor] = useState("#26de81");

  const handleBack = () => {
    if (readPerentage < 0.7) {
      console.log("readPerentage", readPerentage);
      schedulePushNotification(
        "Reminder",
        "Read Blog",
        blog?.title,
        toTime,
        day
      )
        .then((res) => {
          Alert.alert("We will remind you to read blog");
        })
        .catch((err) => {
          console.log("err", err);
          Alert.alert("Error", "Error in scheduling notification");
        });
    }
    navigation.navigate("Home");
  };
  React.useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <TouchableOpacity onPress={handleBack} style={{ padding: 8 }}>
            <Ionicons
              name="arrow-back"
              color={theme === "light" ? "#fff" : "#1A2237"}
              size={30}
            />
          </TouchableOpacity>
          <Text>{(+readPerentage * 100).toFixed()}%</Text>
        </Layout>
      ),
    });
  }, [readPerentage]);

  return (
    <ScrollView
      bounces={false}
      onScroll={({
        nativeEvent,
      }: {
        nativeEvent: {
          contentOffset: { y: number };
          contentSize: { height: number };
        };
      }) => {
        const { contentOffset, contentSize } = nativeEvent;
        const { height } = contentSize;
        const { y } = contentOffset;
        const position = y / height;
        console.log(height, y);
        console.log(position);
        setReadPerentage(position);
      }}
      style={{ height: height - 8, paddingBottom: 20 }}
    >
      {/* <LinearGradient colors={["rgba(0,0,0,0.8)", "transparent"]}> */}

      <Layout style={{ flex: 1, position: "relative" }}>
        <SharedElement id={`item.${blog?.title}`}>
          <Image
            source={{ uri: blog?.imageUrl }}
            style={{
              height: 400,
              width,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          />
        </SharedElement>
        <Layout style={{ paddingHorizontal: 8, marginVertical: 8 }}>
          <Text category="h1">{blog?.title}</Text>
          <Text
            style={{ marginVertical: 16, lineHeight: 0, fontWeight: "200" }}
            category="h6"
          >
            {blog?.content}
          </Text>
        </Layout>
      </Layout>
      <Layout style={{ padding: 12 }}>
        <Button>Done Reading</Button>
      </Layout>

      {/* </LinearGradient> */}
    </ScrollView>
  );
};

export default Blog;

const styles = StyleSheet.create({});
