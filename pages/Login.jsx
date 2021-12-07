import React, { useState, useContext } from "react";
import Title from "../components/Title";
import { Container } from "../components/Container";
import "react-native-gesture-handler";
import axios from 'axios';

import { 
  Text, 
  Button, 
  Input,
  Alert,
  IconButton,
  HStack,
  VStack,
  CloseIcon,
  Collapse,
  Link
} from "native-base";
import { UsuarioContext } from "../context";

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [mostrarMensagemErro, setMostrarMensagemErro]= useState(false);
  const{usuario,setUsuario} = useContext(UsuarioContext);

    const efetuarLogin = () =>{
    axios.post ('https://secret-headland-69654.herokuapp.com/logar', {
      email,
      senha
    }). then(result =>{
      setUsuario(result.data);
    })
    .catch((erro)=>{
      setMostrarMensagemErro(true);
    });
  };
  
  return (
    <Container>
      <Title> Serratec App</Title>
      <Text style={{ color: "chocolate" }}>
        Até aqui, tudo indo, continua tudo ok! ops
      </Text>
      <Collapse isOpen = {mostrarMensagemErro}> 
          <Alert w="100%" status={"error"}mt="5">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {'Usuário ou senha incorretos'}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                  onPress={()=>{setMostrarMensagemErro(false)}}
                />
              </HStack>
            </VStack>
          </Alert>
          </Collapse>       
            <Input
        mx="3"
        placeholder="Digite seu e-mail"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setEmail}
        value={email}
        keyboardType="default"
      />
      <Input
        mx="3"
        placeholder="Digite sua senha"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ margin: 20 }}
        onChangeText={setSenha}
        value={senha}
        type="password"
      />
      <Button
        size="lg"
        //variant="outline"
        onPress={() => efetuarLogin()}
      >
        Logar
      </Button>
      <Text
      mt = "5"
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            Quer ser um novo Usuário?{" "}
          </Text>
          
          <Button
          mt = "5"
        size="lg"
        //variant="outline"
        onPress={()=>navigation.navigate("Novo Usuário")}
      >
        Clique aqui
      </Button>
     
    </Container>
  );
};
export default Login;

