import { Box, Button, Modal, Typography } from "@mui/material"
import Link from "next/link"

interface ModalProps {
    isOpenModal: boolean
    onClose: () => void
}

const SuccessModal = ({ isOpenModal, onClose }: ModalProps) => {
    return (
        <Modal
            open={isOpenModal}
            onClose={onClose}
            aria-labelledby="modal-confirm-title"
            aria-describedby="modal-confirm-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "#ffffff",
                    boxShadow: 24,
                    pt: 4,
                    px: 4
                }}
            >
                <Typography
                    id="modal-confirm-title"
                    variant="h6"
                    component="h2"
                >
                    Purchase made successfully
                </Typography>
                <Typography id="modal-confirm-description" sx={{ mt: 2 }}>
                    Would you like to see your new contract?
                </Typography>

                <Box
                    display={"flex"}
                    justifyContent="end"
                    sx={{
                        mt: 4,
                        pb: 3
                    }}
                >
                    <Button onClick={onClose}>Close</Button>
                    <Button variant="contained" color="success">
                        <Link href="/drawer">Go to Drawer</Link>
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default SuccessModal
