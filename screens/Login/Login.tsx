import { StackScreenProps } from "@react-navigation/stack";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import React from "react";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../context/auth";
import { StackParamList } from "../../Root";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ILoginInputs {
  email: string;
  password: string;
}

type Props = StackScreenProps<StackParamList, "Login">;

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = ({ navigation, route }: Props) => {
  const blog = route.params?.blog;
  const { setIsAuthenticated } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(schema),
  });
  const authenticate = () => {
    setIsAuthenticated(true);
    navigation.navigate("Blog", {
      blog,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <Layout
          style={{
            flex: 1,
            padding: 16,
            justifyContent: "space-between",
          }}
        >
          <Layout>
            <Image
              style={{ height: 350, width: 350 }}
              source={require("../../assets/login.png")}
            />
            <Layout style={{ marginVertical: 8 }}>
              <Text category="h6">Email </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={{ marginTop: 3 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
              {errors.email && <Text>This is required.</Text>}
            </Layout>
            <Layout>
              <Text category="h6">Password </Text>
              {/* <Input /> */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={{ marginTop: 3 }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry
                    value={value}
                  />
                )}
                name="password"
              />
              {errors.password && <Text>This is required.</Text>}
            </Layout>
          </Layout>
          <Layout style={{ flexDirection: "row" }}>
            <Button
              appearance="ghost"
              status="disabled"
              style={{ flex: 1, marginRight: 3 }}
            >
              Back
            </Button>
            <Button
              onPress={handleSubmit(authenticate)}
              style={{ flex: 1, marginLeft: 3 }}
            >
              Next
            </Button>
          </Layout>
        </Layout>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
