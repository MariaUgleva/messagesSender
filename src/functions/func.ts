import {Ref, errorsType} from '../type';

export const countSizeFiles = (
  refs: Ref[]
): number | boolean => {
  let error: boolean = false;
  const size: number| boolean = refs?.reduce((acc: number, ref: Ref) => {
    if ((ref?.ref.current?.files?.[0]?.size || 0)/1048576 > 5) {
      error = true;
    }
    return acc + (ref?.ref.current?.files?.[0]?.size || 0);
  }, 0);
  return error || size;
};
export const checkValidate = (sender: string, recipient: string, size: number | boolean): errorsType => {
  return {
    senderError: !sender,
    recipientError: !recipient,
    sizeError: size === true ? true : (size || 0)/1048576 > 20 ? true : false
  }

}
export const getMonthWord = (num: number):string => {
  const arr = ['января', "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  return arr[num];
}
