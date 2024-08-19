import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, Input, Tabs, Tab } from "@nextui-org/react";
import { z } from 'zod';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/react";
import bgImage from '../image/bg2.jpg';
import { axiosInstance } from '../lib/axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../component/ButtonPrimary";


const LoginFormSchema = z.object({
  username: z.string().min(4, "Username harus mengandung setidaknya 4 karakter"),
  password: z.string().min(8, "Password harus mengandung setidaknya 8 karakter")
    // .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
    // .regex(/[0-9]/, "Password harus mengandung angka")
    // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung simbol"),
});

const SignUpFormSchema = z.object({
  name: z.string().min(4, "Nama harus mengandung setidaknya 4 karakter"),
  email: z.string().email("Email tidak valid"),
  username: z.string().min(4, "Username harus mengandung setidaknya 4 karakter"),
  password: z.string().min(8, "Password harus mengandung setidaknya 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung huruf kapital")
    .regex(/[0-9]/, "Password harus mengandung angka")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung simbol"),
});

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(isLogin ? LoginFormSchema : SignUpFormSchema),
  });

  const [selected, setSelected] = useState("login");
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setSelected(isLogin ? "sign-up" : "login");
    reset(); // reset form ketika toggle
  };

  const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      // const result = await axios.post("http://localhost:5173/api/v1/auth/login", {
      //   username: data.username,
      //   password: data.password,

      // })
      // console.log(result)
      // reset();
      const token = response.data.data.token

      if(response.status === 201){
        console.log(token)
        toast.success("Login berhasil");
        localStorage.setItem("nilai token", token)
        navigate("/mainmenu")
      }
      
    
    } catch (error) {
      console.log('Error:', error);
      toast.error("Login gagal, silakan coba lagi");
    }
  };

  const registerUser = async (data) => {
    try {
      const userData = { ...data, role: "employee" }
      const response = await axiosInstance.post("/auth/register", userData);
      // reset();
      console.log(response)
      if(response.status === 201){
        toast.success("Pendaftaran berhasil");
        reset()
      }
     
    } catch (error) {
      console.log('Error:', error);
      toast.error("Pendaftaran gagal, silakan coba lagi");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <section
        className="absolute top-0 left-0 w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
        }}
      ></section>

      <Card className="w-[300px]">
        <CardHeader className="font-semibold text-lg flex items-center justify-between">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleToggle}
          >
            <Tab key="login" title="Login"></Tab>
            <Tab key="sign-up" title="Sign Up"></Tab>
          </Tabs>
        </CardHeader>
        <Divider />
        <CardBody>
          {selected === "login" ? (
            <form
              onSubmit={handleSubmit(loginUser)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="username"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="current-password"
                  />
                )}
              />
              {/* <Button className="bg-[#8c7851] text-white" type="submit">Login</Button> */}
              <ButtonPrimary type="submit" text={"Login"} className="mb-4 w-full"/>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(registerUser)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Name"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="name"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="email"
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="username"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    autoComplete="new-password"
                  />
                )}
              />
              {/* <Button className="bg-[#8c7851] text-white" type="submit">Sign Up</Button> */}
              <ButtonPrimary type="submit" text={"Login"} className="mb-4 w-full"/>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
