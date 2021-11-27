import { Stack, styled } from "@mui/material"

export const StyledStack = styled(Stack)`
  min-width: 720px;
  max-width: 720px;
  ${(props:any) => props.theme.breakpoints.down('md')} {
    min-width: 100%;
    max-width: 100%;
  }

` 