import { forwardRef, ChangeEvent, ForwardedRef } from "react";
import { Delete, UploadFile } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, FormHelperText } from "@mui/material";

interface InputFileProps {
    fileName: string | null;
    setFileName: (name: string | null) => void;
    fileBase64: string | null;
    setFileBase64: (base64: string | null) => void;
    error?: boolean; // Adicionado
    helperText?: string; // Adicionado
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
    ({ fileName, setFileName, fileBase64, setFileBase64, error, helperText }, ref: ForwardedRef<HTMLInputElement>) => {
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                setFileName(file.name);
                convertToBase64(file);
            }
        };

        const convertToBase64 = (file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setFileBase64(reader.result);
                }
            };
            reader.onerror = (error) => {
                console.error("Erro ao converter imagem para Base64:", error);
            };
        };

        const handleRemoveFile = () => {
            setFileName(null);
            setFileBase64(null);
        };

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px dashed ${error ? "#d32f2f" : "#35BD8E"}`, // Altera a cor se houver erro
                    borderRadius: '8px',
                    padding: 3,
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                {!fileName ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<UploadFile />}
                            sx={{
                                backgroundColor: error ? "#d32f2f" : "#35BD8E",
                                color: '#fff',
                                '&:hover': { backgroundColor: error ? "#b71c1c" : "#2da576" },
                            }}
                        >
                            Anexar Arquivo
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={ref}
                            />
                        </Button>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Clique no botão acima para anexar uma imagem
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                            {fileName}
                        </Typography>
                        <IconButton onClick={handleRemoveFile} sx={{ color: '#d32f2f' }}>
                            <Delete />
                        </IconButton>
                    </Box>
                )}

                {/* Exibe a mensagem de erro abaixo do input */}
                {error && (
                    <FormHelperText sx={{ color: "#d32f2f", textAlign: "center", mt: 1 }}>
                        {helperText}
                    </FormHelperText>
                )}
            </Box>
        );
    }
);

export default InputFile;