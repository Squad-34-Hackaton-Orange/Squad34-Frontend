import { VSelectInput } from "@/components/forms/VSelectInput";
import { LoginContext } from "@/context/UserContext";
import { Tag, list } from "@/lib/api/tag";
import { Form } from "@unform/web";
import React, { useContext, useEffect, useState } from "react";


export default function TagSearch() {
  const { user } = useContext(LoginContext);
  const [tagOptions, setTagOptions] = useState<Partial<Tag>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tags: Tag[] = await list({ id: user?.id });
        setTagOptions(tags);
      } catch (error) {
        console.error('Erro ao obter opções de tags:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={(data) => handleSubmit(data)} placeholder="Adicionar">
      <VSelectInput
        options={tagOptions}
        id="tags"
        name="tags"
        sx={{
          maxWidth: "300",
          minWidth: '280px',
          borderRadius: '4px',
        }}
      />
    </Form>
  );
}