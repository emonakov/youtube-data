import React from 'react'
import styled from 'styled-components'

import { ErrorInterface } from '../../../interfaces/ErrorInterface'

const Code = styled.code`
  color: red;
`

const Error: React.FC<{ error?: ErrorInterface }> = ({ error }) =>
  error ? (
    <pre data-testid="error">
      <Code>{JSON.stringify(error, null, 2)}</Code>
    </pre>
  ) : null

export default Error
