import { getIcon } from '../../../../lib/advancedSearch/searchHelper'

describe('searchHelper functions', () => {
  it('returns the objects icon', () => {
    expect(getIcon('item')).toEqual(
      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20stroke-linejoin='round'%20stroke-width='3'%3e%3cg%20stroke='%2300356B'%3e%3cpath%20d='M45%2011l31.18%2018v36L45%2083%2013.82%2065V29z'/%3e%3cpath%20d='M45%2083V47L13.82%2029%2045%2011l31.18%2018L45%2047z'/%3e%3c/g%3e%3cg%20stroke='%230093B0'%3e%3cpath%20d='M54%2042l8.66%205v10L54%2062l-8.66-5V47z'/%3e%3cpath%20d='M54%2062V52l-8.66-5L54%2042l8.66%205L54%2052z'/%3e%3c/g%3e%3cg%20stroke='%230093B0'%3e%3cpath%20d='M27%2047l8.66%205v10L27%2067l-8.66-5V52z'/%3e%3cpath%20d='M27%2067V57l-8.66-5L27%2047l8.66%205L27%2057z'/%3e%3c/g%3e%3cg%20stroke='%230093B0'%3e%3cpath%20d='M45%2027l8.66%205v10L45%2047l-8.66-5V32z'/%3e%3cpath%20d='M45%2047V37l-8.66-5L45%2027l8.66%205L45%2037z'/%3e%3c/g%3e%3cg%20stroke='%230093B0'%3e%3cpath%20d='M76%2065l8.66%205v10L76%2085l-8.66-5V70z'/%3e%3cpath%20d='M76%2085V75l-8.66-5L76%2065l8.66%205L76%2075z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
    )
  })

  it('returns the works icon', () => {
    expect(getIcon('work')).toEqual(
      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20stroke-linejoin='round'%20stroke-width='3'%3e%3cpath%20stroke='%2300356B'%20d='M23%2077a4%204%200%200%201-4-4V31a4%204%200%200%201%204-4h61a4%204%200%200%201%204%204v42a4%204%200%200%201-4%204h-8v11L66%2077H23z'/%3e%3cpath%20stroke='%230093B0'%20stroke-linecap='round'%20d='M33.5%2039.5h16m-16%2016h11m-11%208h20m-20-16l15.5.17m5.5-8.17h18m-22%2016h21M59%2063.67h16M54.5%2047.5h21'/%3e%3cpath%20stroke='%2300356B'%20d='M19%2058h-7a4%204%200%200%201-4-4V12a4%204%200%200%201%204-4h61a4%204%200%200%201%204%204v15'/%3e%3c/g%3e%3c/svg%3e",
    )
  })

  it('returns the people icon', () => {
    expect(getIcon('agent')).toEqual(
      '/src/resources/images/entity/people-orgs.svg',
    )
  })

  it('returns the places icon', () => {
    expect(getIcon('place')).toEqual(
      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20stroke-width='3'%20transform='translate(21%204)'%3e%3cellipse%20cx='27'%20cy='27.63'%20stroke='%2300356B'%20rx='13'%20ry='13.3'/%3e%3cpath%20stroke='%230093B0'%20stroke-linecap='round'%20d='M19.76%2072.652c-5.414%201.292-9.16%204.07-9.16%207.288%200%204.452%207.164%208.06%2016%208.06%208.837%200%2016-3.608%2016-8.06%200-3.214-3.735-5.99-9.14-7.283'/%3e%3cpath%20stroke='%2300356B'%20stroke-linejoin='round'%20d='M27%2079.808s27-28.74%2027-52.182C54%2012.368%2041.912%200%2027%200S0%2012.368%200%2027.626c0%2023.442%2027%2052.182%2027%2052.182z'/%3e%3c/g%3e%3c/svg%3e",
    )
  })

  it('returns the concepts icon', () => {
    expect(getIcon('concept')).toEqual(
      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20stroke-width='3'%20transform='translate(4%206)'%3e%3cpath%20stroke='%230093B0'%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M58.216%2054.143c7.362-5.011%2012.247-13.827%2012.247-23.865%200-15.604-11.805-28.254-26.366-28.254-14.562%200-26.367%2012.65-26.367%2028.254%200%2010.04%204.887%2018.858%2012.252%2023.869'/%3e%3crect%20width='25.43'%20height='5.69'%20x='31.86'%20y='66.94'%20stroke='%2300356B'%20rx='2.84'/%3e%3crect%20width='25.43'%20height='5.69'%20x='31.86'%20y='72.63'%20stroke='%2300356B'%20rx='2.84'/%3e%3cpath%20stroke='%2300356B'%20stroke-linejoin='round'%20d='M38.447%2078.314h11.3v.036a5.65%205.65%200%200%201-11.3%200v-.036z'/%3e%3cpath%20stroke='%230093B0'%20d='M29.972%2054.144c3.12%201.896%205.65%203.971%205.65%207.112m22.599-7.112c-3.12%201.895-5.65%203.97-5.65%207.11'/%3e%3crect%20width='25.43'%20height='5.69'%20x='31.86'%20y='61.26'%20stroke='%2300356B'%20rx='2.84'/%3e%3cpath%20stroke='%230093B0'%20stroke-linecap='round'%20d='M10.55%2030.14H0m13.199-13.794L3%2013.604M21.14%205.31L12.01%200m65.44%2030.14H88M74.801%2016.346L85%2013.604M66.86%205.31L75.99%200'/%3e%3cpath%20stroke='%2300356B'%20stroke-linecap='round'%20d='M40.061%2060.861V33.65c0-4.173-3.595-5.668-5.632-5.668-2.037%200-5.274%201.495-5.274%205.665s3.237%205.459%205.453%205.459h9.489m4.16%2021.755V33.65c0-4.173%203.595-5.668%205.633-5.668%202.037%200%205.273%201.495%205.273%205.665s-3.236%205.459-5.453%205.459h-9.488'/%3e%3c/g%3e%3c/svg%3e",
    )
  })

  it('returns the events icon', () => {
    expect(getIcon('event')).toEqual(
      "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='96'%20height='96'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20transform='translate(7%206)'%3e%3cpath%20stroke='%230093B0'%20stroke-linecap='round'%20stroke-width='3'%20d='M7.86%2042.5h65m-65%2017h65M51.5%2025.2v50m-22-50v50'/%3e%3cg%20stroke-width='3'%3e%3cpath%20stroke='%2300356B'%20stroke-linejoin='round'%20d='M1.853%2083.368A1.853%201.853%200%200%201%200%2081.516V20.379c0-1.023.83-1.853%201.853-1.853h77.81c1.023%200%201.853.83%201.853%201.853v60.99a2%202%200%200%201-2%202H1.853z'/%3e%3cpath%20stroke='%230093B0'%20stroke-linejoin='round'%20d='M9.078%2076.884a1.853%201.853%200%200%201-1.853-1.852V26.863c0-1.023.83-1.852%201.853-1.852h62.99c1.023%200%201.852.829%201.852%201.852v48.021a2%202%200%200%201-2%202H9.078z'/%3e%3crect%20width='7.41'%20height='14.82'%20x='17.15'%20stroke='%2300356B'%20stroke-linejoin='round'%20rx='3.71'/%3e%3crect%20width='7.41'%20height='14.82'%20x='56.05'%20stroke='%2300356B'%20stroke-linejoin='round'%20rx='3.71'/%3e%3cpath%20stroke='%2300356B'%20stroke-linejoin='round'%20d='M63.466%203.705h16.197c1.023%200%201.853.83%201.853%201.853v12.968H0V5.558c0-1.023.83-1.853%201.853-1.853H17.15'/%3e%3cpath%20stroke='%2300356B'%20d='M24.56%203.71h5.56m-.67%200h22.56m-1.51%200h5.55'/%3e%3c/g%3e%3crect%20width='3'%20height='3'%20x='11'%20y='29'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='11'%20y='46'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='33'%20y='29'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='33'%20y='46'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='55'%20y='29'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='55'%20y='46'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='11'%20y='63'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='33'%20y='63'%20fill='%230093B0'%20rx='1.5'/%3e%3crect%20width='3'%20height='3'%20x='55'%20y='63'%20fill='%230093B0'%20rx='1.5'/%3e%3c/g%3e%3c/svg%3e",
    )
  })
})
