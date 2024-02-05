"use client";
import { CustomModal } from "@/components/Modal";
import { ProjectFormErrors, ProjectFormValues } from "@/lib/validation/project";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { storage } from "@/lib/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Project, create, getProjectById } from "@/lib/api/project";
import { VOutlinedInput } from "@/components/forms/VOutlinedInput";
import { Form } from "@unform/web";
import { LoginContext } from "@/context/UserContext";
import { User, updateImage } from "@/lib/api/user";
import { handleGoogle } from "@/lib/validation/user";

type AtualizarImageType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const projectSchema = yup.object({
  title: yup
    .string()
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/),
  description: yup.string().required(),
  link: yup.string().required(),
  ProjectTag: yup.string(),
  image: yup.string(),
});

export const HandleImage = ({ open, setOpen }: AtualizarImageType) => {
  const { user, signin } = useContext(LoginContext);
  const [error, setError] = useState(false);
  const [SubmitFlag, setSubmitFlag] = useState(true);
  if (!user) {
    return;
  }

  const theme = useTheme();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [imageUpload, setImageUpload] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const [ImageUrl, setImageUrl] = useState<string | undefined>("");

  useEffect(() => {
    if (ImageUrl) setSubmitFlag(false);
  }, [ImageUrl]);

  const uploadImage = async (file: File): Promise<string | undefined> => {
    
    if (!file) return "";

    const maxSizeInBytes = 5 * 1024 * 1024; //5MB

    if (file.size > maxSizeInBytes) return "";

    const storageRef = await ref(storage, `users/${file.name + v4()}`);

    const UploadConfirm = await uploadBytes(storageRef, file);

    const newUrl = await getDownloadURL(UploadConfirm.ref);

    console.log(newUrl)

    return newUrl;
  };

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open === true) {
      setImageUpload(user?.image);
    }
  }, [open]);

  

  const handleClose = () => {
    setOpen(false);
    setImageUpload(undefined);
  };

  const handleSubmit = async (formData: any) => {
    if (formData === undefined) {
      return;
    }

    console.log(formData)

    try {
      const form: User = {
        image: ImageUrl ? ImageUrl : user?.image,
      };

      const id = user?.id;

      if (id !== undefined) {
        await updateImage({ id, image: form.image });
      }

      console.log(form)

      const data: User = {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        image: form.image,
      };

      console.log(data)

      const verifyGoogleUser = await handleGoogle(data); //reaproveitando funcionalidaded existente
      const { token } = verifyGoogleUser;

      data.token = token;

      console.log(data)


      signin(data);


      setSuccess(true);

      handleClose()
      
    } catch (errors) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <CustomModal.Root open={open} onClose={handleClose} variant="form">
      <CustomModal.Title>
        <Typography variant="h5" color={theme.colors.neutral110}>
          Editar Imagem
        </Typography>
      </CustomModal.Title>
      <Form onSubmit={(data) => handleSubmit(data)} placeholder="EditarProjeto">
        <CustomModal.Content>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              rowGap: { xs: "8px" },
              gap: { sm: "8px", md: "24px" },
            }}
          >
            <Box
              sx={{
                order: { sm: 0 },
                display: "flex",
                flexDirection: "column",
                rowGap: "16px",
              }}
            >
              <Typography variant="subtitle1" color={theme.colors.neutral110}>
                Selecione o conteúdo que você deseja fazer upload
              </Typography>

              <FormControl>
                <Button
                  component="label"
                  sx={{
                    padding: 0,
                    width: { xs: "266px", md: "389px" },
                    height: { xs: "304px", md: "384px" },
                  }}
                >
                  <Box
                    style={{
                      objectFit: "cover",
                      backgroundImage: `url('${
                        imageUpload
                          ? `${imageUpload}`
                          : "/default-project-mobile.svg"
                      }')`,
                      backgroundSize: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {" "}
                  </Box>
                  <VisuallyHiddenInput
                    accept="image/*"
                    type="file"
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const file = e.target.files
                        ? e.target.files[0]
                        : undefined;

                      // Verifica se o tamanho do arquivo está dentro do limite desejado (por exemplo, 5 MB)
                      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

                      if (!file) return;

                      if (file && file.size > maxSizeInBytes) {
                        alert(
                          "O tamanho do arquivo excede o limite permitido (5 MB)."
                        );
                        return;
                      }

                      const fileReader = new FileReader();

                      fileReader.onloadend = function () {
                        setImageUpload(fileReader?.result);
                      };
                      fileReader.readAsDataURL(file);

                      const getUrl = await uploadImage(file);

                      setImageUrl(getUrl);
                    }}
                  />
                </Button>
                <VOutlinedInput
                  id="image"
                  aria-describedby="my-helper-text"
                  name="image"
                  sx={{
                    fontSize: "1.6rem",
                    color: theme.colors.neutral100,
                    height: "56px",
                    padding: "16px, 14px",
                    visibility: "hidden",

                    width: "100%",
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.primary90,
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          {error && (
            <Alert
              variant="filled"
              severity="error"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: 2,
              }}
            >
              Erro ao editar a imagem. Confira os campos e tente novamente.
            </Alert>
          )}
        </CustomModal.Content>
        <CustomModal.Actions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "16px",
            }}
          >
            <Typography variant="subtitle1" color={theme.colors.neutral110}>
              Visualizar publicação
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
              }}
            >
              <Button
                variant="contained"
                size="large"
                disabled={SubmitFlag}
                sx={{
                  color: theme.colors.neutral60,
                  backgroundColor: theme.colors.secondary100,
                  margin: ".8rem 0",
                }}
                type="submit"
              >
                Editar
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: theme.colors.neutral60,
                  backgroundColor: theme.colors.neutral100,
                  opacity: 0.6,
                  margin: ".8rem 0",
                }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </CustomModal.Actions>
      </Form>
      {success ? (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 2,
          }}
        >
          Imagem Atualizada com sucesso
        </Alert>
      ) : (
        <></>
      )}
    </CustomModal.Root>
  );
};
