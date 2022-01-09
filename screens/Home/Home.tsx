import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Platform, StyleSheet, View } from "react-native";
import { useAppTheme } from "../../context/theme";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../../Root";
import { useAuth } from "../../context/auth";

const blogData = require("../../src/data/blogData.json");

const Home = ({ navigation }: StackScreenProps<StackParamList>) => {
  const apptheme = useAppTheme();
  const { isAuthenticated } = useAuth();
  return (
    <Layout
      style={{
        flex: 1,
        backgroundColor: apptheme.theme === "light" ? "#fff" : "#000",
        marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
      }}
    >
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <Text
          // style={{ color: apptheme.theme === "light" ? "#000" : "#fff" }}
          category="h2"
        >
          Home
        </Text>
        <TouchableOpacity onPress={apptheme.toggleTheme}>
          <Ionicons
            name={apptheme.theme === "light" ? "ios-sunny" : "ios-moon"}
            color={apptheme.theme === "light" ? "#fff" : "#000"}
            size={24}
          />
        </TouchableOpacity>
      </Layout>
      <Layout style={{ paddingHorizontal: 8 }}>
        <FlatList
          data={blogData?.blogs}
          keyExtractor={(item) => item.imageUrl}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push(isAuthenticated ? "Blog" : "Login", {
                  blog: item,
                })
              }
              activeOpacity={0.8}
              style={styles.blogContainer}
            >
              <SharedElement id={`item.${item?.title}`}>
                <Image
                  source={{ uri: item?.imageUrl }}
                  style={styles.blogImage}
                />
              </SharedElement>
              <Layout
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text category="h4">{item?.title}</Text>
                <Ionicons
                  name="bookmark"
                  color={apptheme.theme === "light" ? "#fff" : "#1A2237"}
                  size={20}
                />
              </Layout>
            </TouchableOpacity>
          )}
        />
      </Layout>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  blogContainer: {
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  blogImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
});
