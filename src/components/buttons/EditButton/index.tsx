import {DeletarProjeto} from "@/components/forms/DeletarProjeto";
import { ConfirmacaoDeletarProjeto } from "@/components/forms/DeletarProjeto/ConfirmaçãoModal";
import EditarProjeto from "@/components/forms/EditarProjeto";
import { Project } from "@/lib/api/project";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

type EditButtonType = {
  projectId:any
  project: Project
}

const EditButton = ({projectId, project}:EditButtonType) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false)

  //HANDLE THE BUTTON
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [confirmação, setconfirmação] = useState<boolean>(false)

  const [status, setStatus] = useState<boolean>(false)

  const [editarProjeto, setEditarProjeto] = useState<boolean>(false)
  

  return (
    <>      
      <Tooltip title="Menu" sx={{
       position: 'absolute',
       backgroundColor: theme.colors.secondary70,
       width: 28,
       height: 28,
       right: 16,
       top: 16,
       zIndex: 1000,
       '&:hover': {
        backgroundColor: theme.colors.neutral70
       }
      }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <EditIcon
              sx={{
                color: theme.colors.neutral120,
              }}
            />
          </ListItemIcon>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            position: "absolute",
            ml: 1,
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{
            width: 208
        }}
        onClickCapture={() => {
          handleClose();
          console.log(editarProjeto)
          setEditarProjeto(!editarProjeto)
        }}>
          
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" } }}
            >
              Editar
            </Typography>
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); setOpenModal(true)}} sx={{
            width: 208
        }}>
          
            <Typography
              sx={{ fontSize: { xs: "16px" }, lineHeight: { xs: "16px" }, color: theme.colors.primary90 }}
            >
              Excluir
            </Typography>
        </MenuItem>        
      </Menu>
      <DeletarProjeto open={openModal} setOpen={setOpenModal} projectId={projectId} />
      <EditarProjeto open={editarProjeto} setOpen={setEditarProjeto} project={project} />
      <ConfirmacaoDeletarProjeto status={status} open={confirmação} setOpen={setconfirmação} />
    </>
  );
};

export default EditButton;
