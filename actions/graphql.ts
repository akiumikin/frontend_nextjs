import { AxiosError } from 'axios';
import { axiosPost }   from './axios';
import { VariantType, OptionsObject } from 'notistack';
import CONST from '@/constants'

export default async function graphqlQuery(
  query: string,
  enqueueSnackbar?: ((message: React.ReactNode, options?: OptionsObject) => React.ReactText),
) {
  try {
    const apiEndPoint = `${CONST.API.SERVER_HOST}/graphql`
    { console.info(`query: ${query}`) } // クエリの内容をコンソールに表示する

    const res = await axiosPost(apiEndPoint, {query: query})

    const errorArray = getGraphqlErrors(res.data)
    if (errorArray) {
      const variant = 'error' as VariantType
      errorArray.forEach((e) => {
        console.error(e)
        if (enqueueSnackbar != undefined) enqueueSnackbar(e, { variant })
      })
    }

    { console.info(`res data: ${JSON.stringify(res.data.data,null,'\t')}`) } // クエリの内容をコンソールに表示する
    return res.data.data

  } catch (error: any) {
    const variant = 'error' as VariantType
    console.error(getAxiosError(error))
    if (enqueueSnackbar != undefined) enqueueSnackbar(getAxiosError(error), { variant })
  }
}

const getAxiosError = (error: AxiosError) => {
  const code = error.code
  let targetError = {} as {no: string, code: string} | undefined

  if(error.code == undefined) return '' // error構造が異なる場合にはreturn

  // 通常(= ネットワーク問題以外)のAxiosエラー
  const axiosStandardErrors = [
    {no: '001', code: "ERR_FR_TOO_MANY_REDIRECTS"},
    {no: '002', code: "ERR_BAD_OPTION_VALUE"},
    {no: '003', code: "ERR_BAD_OPTION"},
    {no: '004', code: "ERR_DEPRECATED"},
    {no: '005', code: "ERR_BAD_RESPONSE"},
    {no: '006', code: "ERR_BAD_REQUEST"},
    {no: '007', code: "ERR_CANCELED"},
    {no: '008', code: "ECONNABORTED"}
  ]

  targetError = axiosStandardErrors.find((e) => { return e.code == code})
  if(targetError) {
    return `${targetError.no}：通信に失敗しました。運営事務局に問い合わせください`
  }

  const axiosNetworkErros = [
    {no: '010', code: "ERR_NETWORK"},
    {no: '011', code: "ETIMEDOUT"}
  ]

  targetError = axiosNetworkErros.find((e) => { return e.code == code})
  if(targetError) {
    return `${targetError.no}：通信に失敗しました。時間をおいて再度実行してください`
  }

  return `通信に失敗しました。運営事務局に問い合わせください`
}

const getGraphqlErrors = (resData: any) => {
  if(resData.errors == undefined) return
  const errorArray = [] as string[]

  const graphqlErrors = [
    {no: '201', code: 'argumentLiteralsIncompatible'},
    {no: '202', code: 'defaultValueInvalidType'},
    {no: '203', code: 'selectionMismatch'},
    {no: '204', code: 'directiveNotUniqueForLocation'},
    {no: '205', code: 'validationTimeout'},
    {no: '206', code: 'missingQueryConfiguration'},
    {no: '207', code: 'anonymousFragment'},
    {no: '208', code: 'missingSubscriptionConfiguration'},
    {no: '209', code: 'missingMutationConfiguration'},
    {no: '210', code: 'queryContainsSchemaDefinitions'},
    {no: '211', code: 'undefinedType'},
    {no: '212', code: 'undefinedDirective'},
    {no: '213', code: 'inputFieldNotUnique'},
    {no: '214', code: 'infiniteLoop'},
    {no: '215', code: 'variableNotUnique'},
    {no: '216', code: 'fragmentNotUnique'},
    {no: '217', code: 'directiveNotUniqueForLocation'},
    {no: '218', code: 'useAndDefineFragment'},
    {no: '219', code: 'fragmentOnNonCompositeType'},
    {no: '220', code: 'uniquelyNamedOperations'},
    {no: '221', code: 'directiveCannotBeApplied'},
    {no: '222', code: 'variableRequiresValidType'},
    {no: '223', code: 'undefinedField'},
    {no: '224', code: 'missingRequiredArguments'},
    {no: '225', code: 'argumentNotAccepted'},
    {no: '226', code: 'cannotSpreadFragment'},
    {no: '227', code: 'variableMismatch'},
    {no: '228', code: 'fieldConflict'},
    {no: '229', code: 'missingRequiredInputObjectAttribute'},
    {no: '230', code: 'argumentLiteralsIncompatible'}
  ]

  resData.errors.forEach((e: any) => {
    const errorHash = graphqlErrors.find((g) => { return g.code == e.extensions.code })
    errorArray.push(`${errorHash ? errorHash.no : '-'}：通信に失敗しました。運営事務局に問い合わせください`)
  })

  return errorArray
}
