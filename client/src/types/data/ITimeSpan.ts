import IDimension from './IDimension'
import IEntity from './IEntity'

export default interface ITimeSpan extends IEntity {
  begin_of_the_begin?: string
  end_of_the_begin?: string
  begin_of_the_end?: string
  end_of_the_end?: string
  duration?: IDimension
  _seconds_since_epoch_begin_of_the_begin?: number
  _seconds_since_epoch_end_of_the_end?: number
}
