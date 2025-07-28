import { useNavigate } from 'react-router-dom'

export const onAddRequest = (
  alertMessage: string,
  alertVariant: string,
  pathname: string,
  search?: string,
): void => {
  const navigate = useNavigate()

  return navigate(
    {
      pathname,
      search,
    },
    {
      state: {
        showAlert: true,
        alertMessage,
        alertVariant,
      },
    },
  )
}
