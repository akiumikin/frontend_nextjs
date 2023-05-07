/*****************************************************************************************
 * notistackを使ったnotifyの共通処理
 ****************************************************************************************/

import { VariantType, OptionsObject } from 'notistack'

export const notify = (
  enqueueSnackbar: (message: React.ReactNode, options?: OptionsObject) => React.ReactText,
  message: string | React.ReactNode,
  variant: VariantType
) => {
  enqueueSnackbar(message, { variant })
}
