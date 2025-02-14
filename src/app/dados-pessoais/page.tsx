'use client'
import { useContext, useState } from "react";
import { Grid2 } from "@mui/material";
import ButtonForm from "@/components/Buttons/ButtonForm";
import FormularioDadosPessoais from "@/components/Formulario/FormularioDadosPessoais";
import FormularioAutenticacao from "@/components/Formulario/FormularioAutenticacao";
import FormularioCadastroAcoes from "@/components/Formulario/FormularioCadastroAcoes";
import FormularioAprovarAcoes from "@/components/Formulario/FormularioAprovarAcoes";
import { AuthContext } from "../../../context/AuthContext";

export default function Home() {
  const { isAdmin } = useContext(AuthContext);
  const [formularioAtivo, setFormularioAtivo] = useState<string>('dados-pessoais');

  const renderFormulario = () => {
    switch (formularioAtivo) {
      case 'dados-pessoais':
        return <FormularioDadosPessoais />;
      case 'autenticacao':
        return <FormularioAutenticacao />;
      case 'cadastro-acoes':
        return <FormularioCadastroAcoes />
      case 'aprovacao-acoes':
        return isAdmin ? <FormularioAprovarAcoes /> : null;
      default:
        return null;
    }
  };

  return (
    <Grid2 container spacing={4} sx={{ mt: {xs: 0, md: 5}, flex: 1 }}>
      <Grid2
        size={{ xs: 12, md: 3 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <ButtonForm formularioAtivo={formularioAtivo} valor="dados-pessoais" titulo="Dados pessoais" changeForm={setFormularioAtivo} />
        <ButtonForm formularioAtivo={formularioAtivo} valor="autenticacao" titulo="Autenticação" changeForm={setFormularioAtivo} />
        <ButtonForm formularioAtivo={formularioAtivo} valor="cadastro-acoes" titulo="Cadastro de Ações" changeForm={setFormularioAtivo} />
        {isAdmin && <ButtonForm formularioAtivo={formularioAtivo} valor="aprovacao-acoes" titulo="Aprovação de Ações" changeForm={setFormularioAtivo} />}
      </Grid2>
      <Grid2 size={{ xs: 12, md: 9 }}>
        {renderFormulario()}
      </Grid2>
    </Grid2>
  );
}