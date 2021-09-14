import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoundButton from "./RoundButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "1rem",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    padding: theme.spacing(0.75),
    color: "#fff",
    backgroundColor: "rgba(15, 20, 25, 0.75)",
    "&:hover": {
      backgroundColor: "rgba(39,44,48,.75)",
    },
  },
  modal: {
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    maxWidth: "50rem",
    width: "100%",
    borderRadius: "1rem",
  },
}));

export default function Image({
  src,
  removeImage = null,
  contain = true,
  showModal = true,
  ...props
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      {src && (
        <>
          <Box position="relative" {...props}>
            <img
              src={src}
              alt="Twitter Image..."
              className={classes.image}
              onClick={showModal ? handleOpenModal : null}
              style={{ maxHeight: contain ? "18rem" : "auto" }}
            />
            {removeImage && (
              <RoundButton
                className={classes.closeButton}
                variant="contained"
                onClick={removeImage}
              >
                <CloseIcon fontSize="small" />
              </RoundButton>
            )}
          </Box>

          {showModal && (
            <Modal
              open={open}
              onClose={handleCloseModal}
              BackdropProps={{
                style: { backgroundColor: "rgba(91, 112, 131, 0.4)" },
              }}
              className={classes.modal}
            >
              <Box position="relative" m="auto">
                <img
                  src={src}
                  alt="Twitter Image..."
                  className={classes.modalImage}
                  onClick={handleOpenModal}
                />
                <RoundButton
                  className={classes.closeButton}
                  variant="contained"
                  onClick={handleCloseModal}
                >
                  <CloseIcon />
                </RoundButton>
              </Box>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
