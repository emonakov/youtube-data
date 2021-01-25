import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.paddingMd};
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1199px) {
    box-sizing: border-box;
    padding: ${({ theme }) => theme.paddingContent};
  }
`

const Input = styled.input`
  box-sizing: border-box;
  min-width: 320px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.paddingStd} ${({ theme }) => theme.paddingMd};
  margin-bottom: ${({ theme }) => theme.paddingStd};
`

const ButtonReset = styled.button`
  appearance: none;
  background: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.paddingStd} ${({ theme }) => theme.paddingContent};
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    pointer-events: none;
  }
`

const ButtonSubmit = styled(ButtonReset)`
  background: ${({ theme }) => theme.colors.buttonBackgroundSecondary};

  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundSecondaryHover};
  }
`

type FormData = {
  q: string
}

interface Props {
  onSearch: (searchToken: string) => void
  onReset: () => void
}

const Search: React.FC<Props> = ({
  onSearch,
  onReset,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitted },
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const q = watch('q')

  useEffect(() => {
    if (!q) {
      reset()

      if (isSubmitted) {
        onReset()
      }
    }
  }, [q, reset, isSubmitted, onReset])

  const onSubmit = ({ q }: FormData) => onSearch(q)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name="q" ref={register} />
      <ButtonReset
        disabled={!isDirty}
        type="button"
        onClick={() => {
          reset()
          if (isSubmitted) {
            onReset()
          }
        }}
      >
        RESET
      </ButtonReset>
      <ButtonSubmit disabled={!isDirty} type="submit">
        SEARCH
      </ButtonSubmit>
    </Form>
  )
}

export default Search
