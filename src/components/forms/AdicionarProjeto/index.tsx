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
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/),
  description: yup.string().required(),
  link: yup.string().required(),
  ProjectTag: yup.string(),
  image: yup.string(),
});

const AddProjectModal = ({ open, setOpen }: AddprojectType) => {
  const { user } = useContext(LoginContext);

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

  const [formValues, setFormValues] = useState<ProjectFormValues>({
    title: "",
    description: "",
    link: "",
    projectTag: [],
    image: "",
  });

  const [formErrors, setFormErrors] = useState<ProjectFormErrors>({
    title: "",
    description: "",
    link: "",
    projectTag: [],
    image: "",
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

  const [SubmitFlag, setSubmitFlag] = useState(true);

  const [sucess, setSucess] = useState(false);

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
    setFormValues({
      title: "",
      description: "",
      link: "",
      projectTag: [],
      image: "",
    });
    setSubmitFlag(true);
  };

  //TODO: PRIMEIRO CHAMAR A FUNÇÃO DE UPLOAD DE IMAGEM E DEPOIS CHAMAR A FUNÇÃO DE INTEGRAÇÃO DO BACKEND

  const handleSubmit = async (data: Project) => {
    if (data === undefined) {
      return;
    }

    try {
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
      if (errors instanceof yup.ValidationError) {
        const validationErrors: ProjectFormErrors = {
          title: "",
          description: "",
          link: "",
          projectTag: [],
          image: "",
        };

        errors.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        setFormErrors(validationErrors);
        console.error("Erro de validação:", errors);
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
      <Form onSubmit={(data) => handleSubmit(data)} placeholder="Login">
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
        </CustomModal.Actions>
      </Form>
      {sucess ? (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            left: "50%",
            top: "5%",
            transform: "translate(-50%, -50%)",
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
