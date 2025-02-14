import { Box } from "@mui/material";


export default function GreenCardText({ children }: any) {
    return (
        <Box component="section" sx={{ p: 2, backgroundColor: 'var(--background-color-green-dark)', textAlign: 'center' }}>
            { children }
        </Box>
    )
}