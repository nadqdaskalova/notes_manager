import React from 'react'
import { useNavigate } from 'react-router-dom'
import Colors from 'src/tokens/Colors'
import Spacings from 'src/tokens/Spacings'
import routePaths from '../config/RoutePaths'
import StyledBox from './StyledBox'
import styled from 'styled-components'

const TopbarLogo: React.FC = () => {
  const navigate = useNavigate()

  return (
    <StyledBox
      fullWidth
      direction="row"
      justify="flex-start"
      align="center"
      gap={Spacings.min}
      onClick={() => navigate(routePaths.entry)}
      pointer
    >
      <LogoName pointer fontSize={Spacings.medium}>
        {'Notes Manager'}
      </LogoName>
    </StyledBox>
  )
}

export default React.memo(TopbarLogo)

const LogoName = styled(StyledBox)`
  color: ${Colors.baseWhite};
`
