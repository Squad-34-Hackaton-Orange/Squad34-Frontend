import { CustomModal } from "@/components/Modal";

import {
  Alert,
  Box,
  Button,
  FormControl,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { storage } from "@/lib/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Project, create } from "@/lib/api/project";
import { VOutlinedInput } from "@/components/forms/VOutlinedInput";
import { Form } from "@unform/web";
import { LoginContext } from "@/context/UserContext";

type AddprojectType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const projectSchema = yup.object({
  title: yup
    .string()
    .required("O título é obrigatório")
    .max(50, "O título deve conter no máximo cinquenta caracteres")
    .min(2, "O título deve conter no mínimo dois caracteres"),
  description: yup.string().required("A descrição é obrigatória")
    .max(255, "A descrição deve conter no máximo 255 caracteres")
    .min(2, "A descrição deve conter no mínimo dois caracteres"),
  link: yup.string().url("O link deve ser uma URL válida").required("O link é obrigatório"),
});


const AddProjectModal = ({ open, setOpen }: AddprojectType) => {
  const { user } = useContext(LoginContext);

  if (!user) {
    return;
  }
  const theme = useTheme();

  const [SubmitFlag, setSubmitFlag] = useState(true);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

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

  const [imageUpload, setImageUpload] = useState<string | ArrayBuffer | null>(
    null
  );

  const [ImageUrl, setImageUrl] = useState<string | undefined>("");

  const uploadImage = async (file: File): Promise<string | undefined> => {
    if (!file) return "";

    const maxSizeInBytes = 5 * 1024 * 1024; //5MB

    if (file.size > maxSizeInBytes) return "";

    const storageRef = await ref(storage, `projects/${file.name + v4()}`);

    const UploadConfirm = await uploadBytes(storageRef, file);

    const newUrl = await getDownloadURL(UploadConfirm.ref);

    return newUrl;
  };

  useEffect(() => {
    if (ImageUrl) setSubmitFlag(false);
  }, [ImageUrl]);

  function contarDoisSegundos(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        handleClose();
        window.location.reload();
        resolve();
      }, 2000);
    });
  }

  const handleClose = () => {
    setOpen(false);
    setImageUpload(null);
    setSubmitFlag(true);
  };

  const handleSubmit = async (data: Project) => {

    try {
      formRef.current.setErrors({});

      await projectSchema.validate(data, {
        abortEarly: false,
      });

      const formData: Project = {
        title: data.title,
        description: data.description,
        image: ImageUrl,
        projectTag: data.projectTag,
        id_user: user.id,
        link: data.link,
      };

      const resume = await create(formData);


      if (resume.status === 201) {
        setSucess(true);

        contarDoisSegundos();
        // TODO: APENAS SE DER CERTO FAZER O TRYCATCH
      }
    } catch (errors) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);

      const validationErrors = {};
      if (errors instanceof yup.ValidationError) {
        errors.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <CustomModal.Root open={open} onClose={handleClose} variant="form">
      <CustomModal.Title>
        <Typography variant="h5" color={theme.colors.neutral110}>
          Adicionar projeto
        </Typography>
      </CustomModal.Title>
      <Form
        ref={formRef}
        onSubmit={(data) => handleSubmit(data)}
        placeholder="Login"
      >
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
                order: { sm: 1 },
                display: "flex",
                flexDirection: "column",
                rowGap: "16px",
                width: "100%",
                maxWidth: "424px",
                minWidth: "266px",
              }}
            >
              <FormControl>
                <VOutlinedInput
                  id="title"
                  label="Título"
                  name="title"
                  sx={{
                    fontSize: "1.6rem",
                    color: theme.colors.neutral100,
                    height: "56px",
                    padding: "16px, 14px",

                    width: "100%",
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.primary90,
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <VOutlinedInput
                  id="projectTag"
                  label="Tags"
                  aria-describedby="my-helper-text"
                  name="projectTag"
                  sx={{
                    fontSize: "1.6rem",
                    color: theme.colors.neutral100,
                    height: "56px",
                    padding: "16px, 14px",

                    width: "100%",
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.primary90,
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <VOutlinedInput
                  id="link"
                  label="Links"
                  aria-describedby="my-helper-text"
                  name="link"
                  sx={{
                    fontSize: "1.6rem",
                    color: theme.colors.neutral100,
                    height: "56px",
                    padding: "16px, 14px",

                    width: "100%",
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.primary90,
                    },
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  height: { xs: "88px", sm: "116px" },
                }}
              >
                <VOutlinedInput
                  id="description"
                  label="Descrição"
                  aria-describedby="my-helper-text"
                  name="description"
                  sx={{
                    fontSize: "1.6rem",
                    color: theme.colors.neutral100,
                    height: "56px",
                    padding: "16px, 14px",

                    width: "100%",
                    "&.MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.primary90,
                    },
                  }}
                />
              </FormControl>
            </Box>
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
                      backgroundImage: `url('${imageUpload
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
                    name="image"
                    accept="image/*"
                    type="file"
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const file = e.target.files
                        ? e.target.files[0]
                        : undefined;

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
                        setImageUpload(fileReader.result);
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
                Cadastrar
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

          {
            error && (
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
                Erro ao cadastrar projeto. Confira os campos e tente novamente.
              </Alert>
            )
          }
        </CustomModal.Actions>
      </Form>
      {sucess ? (
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
          Projeto Cadastrado com sucesso
        </Alert>
      ) : (
        <></>
      )}
    </CustomModal.Root>
  );
};

export default AddProjectModal;
