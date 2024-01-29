"use client";

import { SuccessIcon } from "@/components/Icons/Success";
import { CustomModal } from "@/components/Modal";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Modal() {
  const [exlude, setExclude] = useState(false);
  const [edit, setEdit] = useState(false);
  const [icon, setIcon] = useState(false);
  const [editIcon, setEditIcon] = useState(false);

  return (
    <>
      <Button onClick={() => setExclude(!exlude)}>Excluir</Button>
      <CustomModal.Modal
        open={exlude}
        onClose={() => setExclude(false)}
        title="Deseja Excluir?"
        content="Se você prosseguir irá excluir o projeto do seu portfólio"
        actions={
          <>
            <CustomModal.Action
              text="Excluir"
              color="primary"
              action="warning"
            />
            <CustomModal.Action
              text="Cancelar"
              color="secondary"
              action="warning"
            />
          </>
        }
      />

      <Button onClick={() => setEdit(!edit)}>Editar</Button>
      <CustomModal.Modal
        open={edit}
        onClose={() => setEdit(false)}
        title="Deseja Editar?"
        content="Se você prosseguir irá editar o projeto do seu portfólio"
        actions={
          <>
            <CustomModal.Action
              text="Editar"
              color="primary"
              action="warning"
            />
            <CustomModal.Action
              text="Cancelar"
              color="secondary"
              action="warning"
            />
          </>
        }
      />

      <Button onClick={() => setIcon(!icon)}>Excluir ícone</Button>
      <CustomModal.Modal
        open={icon}
        onClose={() => setIcon(false)}
        title="Projeto deletado com sucesso!"
        content={<SuccessIcon />}
        actions={
          <CustomModal.Action
            text="Voltar ao projeto"
            color="primary"
            action="success"
          />
        }
      />

      <Button onClick={() => setEditIcon(!editIcon)}>Editar ícone</Button>
      <CustomModal.Modal
        open={editIcon}
        onClose={() => setEditIcon(false)}
        title="Projeto editado com sucesso!"
        content={<SuccessIcon />}
        actions={
          <CustomModal.Action
            text="Voltar ao projeto"
            color="primary"
            action="success"
          />
        }
      />
    </>
  )
};