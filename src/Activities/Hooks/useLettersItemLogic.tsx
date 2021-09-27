import { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import { DraxDragWithReceiverEventData } from "react-native-drax";
import { ACTIVITY_CONSTANTS } from "../../Constants/index";
import { replaceAt } from "../../Utils";
import { WordsToCompleteItem } from "../Interfaces";
interface OnDragReceiveParamsInterface {
  index: number;
  setCompleteWords: Dispatch<SetStateAction<Array<string>>>;
  keyLetterFormatter?: (payload: any) => string;
  positionToReplace?: number;
}
/**
 *
 * @author andr3z0
 **/
export function useLettersItemLogic(
  word: string | undefined,
  wordInfo: WordsToCompleteItem
) {
  const splitWord = () => word?.split("");
  const letters = useMemo(() => splitWord(), [word]);
  const onDragReceive = useCallback(
    ({
        index,
        setCompleteWords,
        keyLetterFormatter,
        positionToReplace,
      }: OnDragReceiveParamsInterface) =>
      ({ dragged: { payload } }: DraxDragWithReceiverEventData) => {
        const keyLetter = keyLetterFormatter
          ? keyLetterFormatter(payload)
          : wordInfo.keyLetter;

        if (payload.option !== keyLetter || payload.index !== index)
          return console.log("errou");

        setCompleteWords((past) => {
          const list = [...past];
          if (positionToReplace)
            list[index] = replaceAt(
              positionToReplace,
              list[index],
              payload.option
            );
          else
            list[index] = list[index].replace(
              ACTIVITY_CONSTANTS.ACTIVITY_WORD_RECEPTIVE_BOX_FLAG,
              payload.option
            );
          return list;
        });
      },
    [wordInfo]
  );

  const hasCompleted = useMemo(
    () =>
      letters
        ? letters?.filter(
            (x) => x == ACTIVITY_CONSTANTS.ACTIVITY_WORD_RECEPTIVE_BOX_FLAG
          ).length === 0
        : false,
    [letters]
  );
  return { letters, onDragReceive, hasCompleted };
}
