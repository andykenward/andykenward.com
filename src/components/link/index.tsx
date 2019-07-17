import css from "@emotion/css"
import { Link as GatsbyLink } from "gatsby"
import React from "react"

import { color, ColorProps, filterProps, SpaceProps } from "../../styled-system"
import styled, { StyledProps } from "../../utils/styled"

import { Body } from "../typography"

export const Link = styled(GatsbyLink, { shouldForwardProp: filterProps })<
  StyledProps & ColorProps
>`
  ${color}
`

interface LinkExternalProps extends SpaceProps {
  rel?: string
  target?: string
  href: string
  noHover?: boolean
}

export const LinkExternal: React.FC<LinkExternalProps> = ({
  children,
  noHover,
  ...props
}) => (
  <Body
    rel="noopener noreferrer"
    target="_blank"
    as="a"
    css={theme =>
      css`
        display: inline-flex;
        transition: all 0.15s linear;
        text-decoration: none;
        :visited:hover,
        :hover,
        :focus {
          color: ${noHover ? "inherit" : theme.colors.green};
        }
        :visited {
          color: ${noHover ? "inherit" : theme.colors.visited};
        }
      `
    }
    {...props}
  >
    {children}
  </Body>
)
