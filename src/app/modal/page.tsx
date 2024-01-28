"use client";

import { SuccessIcon } from "@/components/Icons/Success";
import { WarningModal } from "@/components/WarningModal";
import { SuccessModal } from "@/components/SuccessModal";

export default function Modal() {
  return (
    <>
      <WarningModal
        title="Deseja Excluir?"
        content="Se você prosseguir irá excluir o projeto do seu portfólio"
      />

      <WarningModal
        title="Deseja editar?"
        content="Se você prosseguir irá editar o projeto do seu portfólio"
      />

      <SuccessModal
        title="Projeto deletado com sucesso!"
        content={<SuccessIcon />}
      />

      <SuccessModal
        title="Edição concluída com sucesso!"
        content={<SuccessIcon />}
      />
    </>
  )
};