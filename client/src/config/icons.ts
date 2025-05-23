import config from './config'
import {
  archivalMaterialIcon,
  audioIcon,
  cartographyIcon,
  clothingIcon,
  furnitureIcon,
  journalsAndNewpapersIcon,
  numismaticsIcon,
  objectIcon,
  photographyIcon,
  scoresNotationIcon,
  softwareElectronicMediaIcon,
  specimensIcon,
  textualWorksIcon,
  videoIcon,
  visualWorksIcon,
} from './resources'

export interface IIcons {
  [key: string]: Array<string>
}

export const iconAats: Map<string, Array<string>> = new Map([
  [
    'http://vocab.getty.edu/aat/300417622',
    [scoresNotationIcon, 'scores and notation'],
  ],
  ['http://vocab.getty.edu/aat/300054225', [photographyIcon, 'photograph']],
  ['http://vocab.getty.edu/aat/300389795', [photographyIcon, 'photograph']],
  ['http://vocab.getty.edu/aat/300046300', [photographyIcon, 'photograph']],
  ['http://vocab.getty.edu/aat/300128695', [photographyIcon, 'photograph']],
  ['http://vocab.getty.edu/aat/300127121', [photographyIcon, 'photograph']],
  ['http://vocab.getty.edu/aat/300037680', [furnitureIcon, 'furniture']],
  [
    'http://vocab.getty.edu/aat/300026739',
    [journalsAndNewpapersIcon, 'journals and newspapers'],
  ],
  [
    'http://vocab.getty.edu/aat/300026656',
    [journalsAndNewpapersIcon, 'journals and newspapers'],
  ],
  ['http://vocab.getty.edu/aat/300209263', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300209261', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300238962', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300178802', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300266810', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300055811', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300266639', [clothingIcon, 'clothing']],
  ['http://vocab.getty.edu/aat/300054419', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300037222', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300037316', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300191324', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300192906', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300037277', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300037266', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300037254', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300191357', [numismaticsIcon, 'numismatics']],
  ['http,//vocab.getty.edu/aat/300191372', [numismaticsIcon, 'numismatics']],
  ['http://vocab.getty.edu/aat/300028094', [cartographyIcon, 'cartography']],
  ['http://vocab.getty.edu/aat/300028053', [cartographyIcon, 'cartography']],
  ['http://vocab.getty.edu/aat/300263857', [videoIcon, 'video']],
  ['http://vocab.getty.edu/aat/300028682', [videoIcon, 'video']],
  ['http://vocab.getty.edu/aat/300028689', [videoIcon, 'video']],
  ['http://vocab.getty.edu/aat/300265849', [audioIcon, 'audio']],
  ['http://vocab.getty.edu/aat/300056060', [audioIcon, 'audio']],
  ['http://vocab.getty.edu/aat/300054146', [audioIcon, 'audio']],
  ['http://vocab.getty.edu/aat/300417584', [audioIcon, 'audio']],
  [
    'http://vocab.getty.edu/aat/300312038',
    [softwareElectronicMediaIcon, 'software and electronic media'],
  ],
  [
    'http,//vocab.getty.edu/aat/300028566',
    [softwareElectronicMediaIcon, 'software and electronic media'],
  ],
  [
    'http,//vocab.getty.edu/aat/300380194',
    [softwareElectronicMediaIcon, 'software and electronic media'],
  ],
  [
    'http,//vocab.getty.edu/aat/300028543',
    [softwareElectronicMediaIcon, 'software and electronic media'],
  ],
  ['http://vocab.getty.edu/aat/300041273', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300190536', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041341', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300053829', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041340', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300264388', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300191086', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300033973', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300054031', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300054196', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300389895', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300078925', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041338', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041379', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300033618', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300053796', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300161986', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300027221', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041365', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300264383', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300047090', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300311925', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300015637', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300404114', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300027354', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300034787', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300054197', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300188975', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300256621', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300417511', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300108127', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300041412', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300015636', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300132294', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300008626', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300178376', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300069193', [visualWorksIcon, 'visual work']],
  ['http://vocab.getty.edu/aat/300028051', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300027087', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300028028', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300312076', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300028029', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300312077', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300389863', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300028569', [textualWorksIcon, 'textual work']],
  ['http://vocab.getty.edu/aat/300265421', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300010331', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300197197', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300045611', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300122283', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300231565', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300162391', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300014063', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300199800', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300199794', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300209286', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300022238', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300117130', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300404591', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300257245', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300043180', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300036743', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300036745', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300036746', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300037581', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300195552', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300203596', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300195548', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300117132', [objectIcon, 'object']],
  ['http://vocab.getty.edu/aat/300037592', [objectIcon, 'object']],
  [config.aat.animalSpecimens, [specimensIcon, 'specimen']],
  [config.aat.plantSpecimens, [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300206571', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300011068', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300266061', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300132360', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300266776', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300259074', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300011829', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310135', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300266510', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265691', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265683', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300249701', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300249702', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265689', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310504', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300024198', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300024825', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265707', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310314', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300072696', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310468', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310470', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265687', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300249395', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300249525', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300011078', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300258570', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300375639', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310503', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300375484', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300011132', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310217', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310315', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310321', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265958', [specimensIcon, 'specimen']],
  [config.aat.fossil, [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300265973', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300311097', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310465', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300310170', [specimensIcon, 'specimen']],
  ['http://vocab.getty.edu/aat/300380087', [specimensIcon, 'specimen']],
  [
    'http://vocab.getty.edu/aat/300379505',
    [archivalMaterialIcon, 'archival material'],
  ],
])

// Currently unused but could be useful in the future
export const icons: IIcons = {
  archivalMaterial: ['http://vocab.getty.edu/aat/300379505'],
  audio: [
    'http://vocab.getty.edu/aat/300265849',
    'http://vocab.getty.edu/aat/300056060',
    'http://vocab.getty.edu/aat/300054146',
    'http://vocab.getty.edu/aat/300417584',
  ],
  cartography: [
    'http://vocab.getty.edu/aat/300028094',
    'http://vocab.getty.edu/aat/300028053',
  ],
  clothing: [
    'http://vocab.getty.edu/aat/300209263',
    'http://vocab.getty.edu/aat/300209261',
    'http://vocab.getty.edu/aat/300238962',
    'http://vocab.getty.edu/aat/300178802',
    'http://vocab.getty.edu/aat/300266810',
    'http://vocab.getty.edu/aat/300055811',
    'http://vocab.getty.edu/aat/300266639',
  ],
  fossil: [
    config.aat.fossil,
    'http://vocab.getty.edu/aat/300265973',
    'http://vocab.getty.edu/aat/300311097',
    'http://vocab.getty.edu/aat/300310465',
    'http://vocab.getty.edu/aat/300310170',
    'http://vocab.getty.edu/aat/300380087',
  ],
  furniture: ['http://vocab.getty.edu/aat/300037680'],
  journalsAndNewspapers: [
    'http://vocab.getty.edu/aat/300026739',
    'http://vocab.getty.edu/aat/300026656',
  ],
  numismatics: [
    'http://vocab.getty.edu/aat/300037222',
    'http://vocab.getty.edu/aat/300037316',
    'http://vocab.getty.edu/aat/300191324',
    'http://vocab.getty.edu/aat/300192906',
    'http://vocab.getty.edu/aat/300037277',
    'http://vocab.getty.edu/aat/300037266',
    'http://vocab.getty.edu/aat/300037254',
    'http://vocab.getty.edu/aat/300191357',
    'http://vocab.getty.edu/aat/300191372',
  ],
  specimen: [
    config.aat.animalSpecimens,
    config.aat.plantSpecimens,
    'http://vocab.getty.edu/aat/300206571',
    'http://vocab.getty.edu/aat/300011068',
    'http://vocab.getty.edu/aat/300266061',
    'http://vocab.getty.edu/aat/300132360',
    'http://vocab.getty.edu/aat/300266776',
    'http://vocab.getty.edu/aat/300259074',
    'http://vocab.getty.edu/aat/300011829',
    'http://vocab.getty.edu/aat/300310135',
    'http://vocab.getty.edu/aat/300266510',
    'http://vocab.getty.edu/aat/300265691',
    'http://vocab.getty.edu/aat/300265683',
    'http://vocab.getty.edu/aat/300249701',
    'http://vocab.getty.edu/aat/300249702',
    'http://vocab.getty.edu/aat/300265689',
    'http://vocab.getty.edu/aat/300310504',
    'http://vocab.getty.edu/aat/300024198',
    'http://vocab.getty.edu/aat/300024825',
    'http://vocab.getty.edu/aat/300265707',
    'http://vocab.getty.edu/aat/300310314',
    'http://vocab.getty.edu/aat/300072696',
    'http://vocab.getty.edu/aat/300310468',
    'http://vocab.getty.edu/aat/300310470',
    'http://vocab.getty.edu/aat/300265687',
    'http://vocab.getty.edu/aat/300249395',
    'http://vocab.getty.edu/aat/300249525',
    'http://vocab.getty.edu/aat/300011078',
    'http://vocab.getty.edu/aat/300258570',
    'http://vocab.getty.edu/aat/300375639',
    'http://vocab.getty.edu/aat/300310503',
    'http://vocab.getty.edu/aat/300375484',
    'http://vocab.getty.edu/aat/300011132',
    'http://vocab.getty.edu/aat/300310217',
    'http://vocab.getty.edu/aat/300310315',
    'http://vocab.getty.edu/aat/300310321',
    'http://vocab.getty.edu/aat/300265958',
  ],
  object: [
    'http://vocab.getty.edu/aat/300265421',
    'http://vocab.getty.edu/aat/300010331',
    'http://vocab.getty.edu/aat/300197197',
    'http://vocab.getty.edu/aat/300045611',
    'http://vocab.getty.edu/aat/300122283',
    'http://vocab.getty.edu/aat/300231565',
    'http://vocab.getty.edu/aat/300162391',
    'http://vocab.getty.edu/aat/300014063',
    'http://vocab.getty.edu/aat/300199800',
    'http://vocab.getty.edu/aat/300199794',
    'http://vocab.getty.edu/aat/300209286',
    'http://vocab.getty.edu/aat/300022238',
    'http://vocab.getty.edu/aat/300117130',
    'http://vocab.getty.edu/aat/300404591',
    'http://vocab.getty.edu/aat/300257245',
    'http://vocab.getty.edu/aat/300043180',
    'http://vocab.getty.edu/aat/300036743',
    'http://vocab.getty.edu/aat/300036745',
    'http://vocab.getty.edu/aat/300036746',
    'http://vocab.getty.edu/aat/300037581',
    'http://vocab.getty.edu/aat/300195552',
    'http://vocab.getty.edu/aat/300203596',
    'http://vocab.getty.edu/aat/300195548',
    'http://vocab.getty.edu/aat/300117132',
    'http://vocab.getty.edu/aat/300037592',
  ],
  photography: [
    'http://vocab.getty.edu/aat/300054225',
    'http://vocab.getty.edu/aat/300389795',
    'http://vocab.getty.edu/aat/300046300',
    'http://vocab.getty.edu/aat/300128695',
    'http://vocab.getty.edu/aat/300127121',
  ],
  scoresNotation: ['http://vocab.getty.edu/aat/300417622'],
  softwareElectronicMedia: [
    'http://vocab.getty.edu/aat/300312038',
    'http://vocab.getty.edu/aat/300028566',
    'http://vocab.getty.edu/aat/300380194',
    'http://vocab.getty.edu/aat/300028543',
  ],
  textualWorks: [
    'http://vocab.getty.edu/aat/300028051',
    'http://vocab.getty.edu/aat/300027087',
    'http://vocab.getty.edu/aat/300028028',
    'http://vocab.getty.edu/aat/300312076',
    'http://vocab.getty.edu/aat/300028029',
    'http://vocab.getty.edu/aat/300312077',
    'http://vocab.getty.edu/aat/300389863',
    'http://vocab.getty.edu/aat/300028569',
  ],
  visualWorks: [
    'http://vocab.getty.edu/aat/300041273',
    'http://vocab.getty.edu/aat/300190536',
    'http://vocab.getty.edu/aat/300041341',
    'http://vocab.getty.edu/aat/300053829',
    'http://vocab.getty.edu/aat/300041340',
    'http://vocab.getty.edu/aat/300264388',
    'http://vocab.getty.edu/aat/300191086',
    'http://vocab.getty.edu/aat/300033973',
    'http://vocab.getty.edu/aat/300054031',
    'http://vocab.getty.edu/aat/300054196',
    'http://vocab.getty.edu/aat/300389895',
    'http://vocab.getty.edu/aat/300078925',
    'http://vocab.getty.edu/aat/300041338',
    'http://vocab.getty.edu/aat/300041379',
    'http://vocab.getty.edu/aat/300033618',
    'http://vocab.getty.edu/aat/300053796',
    'http://vocab.getty.edu/aat/300161986',
    'http://vocab.getty.edu/aat/300027221',
    'http://vocab.getty.edu/aat/300041365',
    'http://vocab.getty.edu/aat/300264383',
    'http://vocab.getty.edu/aat/300047090',
    'http://vocab.getty.edu/aat/300311925',
    'http://vocab.getty.edu/aat/300015637',
    'http://vocab.getty.edu/aat/300015637',
    'http://vocab.getty.edu/aat/300404114',
    'http://vocab.getty.edu/aat/300027354',
    'http://vocab.getty.edu/aat/300034787',
    'http://vocab.getty.edu/aat/300054197',
    'http://vocab.getty.edu/aat/300188975',
    'http://vocab.getty.edu/aat/300256621',
    'http://vocab.getty.edu/aat/300417511',
    'http://vocab.getty.edu/aat/300108127',
    'http://vocab.getty.edu/aat/300041412',
    'http://vocab.getty.edu/aat/300015636',
    'http://vocab.getty.edu/aat/300132294',
    'http://vocab.getty.edu/aat/300008626',
    'http://vocab.getty.edu/aat/300178376',
    'http://vocab.getty.edu/aat/300069193',
  ],
}
