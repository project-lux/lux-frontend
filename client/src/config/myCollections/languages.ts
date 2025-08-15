import config from '../config'

export const englishLanguageUuid = `${config.env.dataApiBaseUrl}data/concept/dfa53b96-4eda-4c9a-b091-10008a726c38`

export const commonLanguages: Record<string, string> = {
  [englishLanguageUuid]: 'English (Default)',
  [`${config.env.dataApiBaseUrl}data/concept/4839f816-732d-4d43-935d-297c4696ec09`]:
    'Spanish',
  [`${config.env.dataApiBaseUrl}data/concept/436c4c60-3478-440d-bb51-c67512ecff66`]:
    'German',
  [`${config.env.dataApiBaseUrl}data/concept/7a1eb4fd-029e-4f0e-87eb-b7f402deaa17`]:
    'Japanese',
  [`${config.env.dataApiBaseUrl}data/concept/c9204606-c7c4-4c46-9390-092597ec73f7`]:
    'Hebrew',
  [`${config.env.dataApiBaseUrl}data/concept/571751a1-f12b-4418-8774-bbf30b7b663c`]:
    'Arabic',
  [`${config.env.dataApiBaseUrl}data/concept/6af4c153-46f3-4ee3-8c3a-36bc210f5a2e`]:
    'Chinese',
  [`${config.env.dataApiBaseUrl}data/concept/a995fc45-9c9b-424d-80ae-d9e645b822e7`]:
    'Hindi',
  [`${config.env.dataApiBaseUrl}data/concept/ae981401-8fb9-46ba-ad96-f0552135efb9`]:
    'French',
}
