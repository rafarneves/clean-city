import { Box } from "@mui/material";

export default function Content({children}: Readonly<{children: React.ReactNode}>) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingY: 3,
          px: {xs: '12px', sm: '24px'},
          maxWidth: {lg: '1200px'},
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      >
        {children}
      </Box>
    )
}