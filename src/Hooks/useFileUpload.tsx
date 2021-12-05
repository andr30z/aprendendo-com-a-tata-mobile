import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { useBoolean } from "./useBoolean";
import { useCancellablePromise } from "./useCancellablePromise";
import { baseApi, baseApiRoutes } from "../Services";
import { AxiosResponse } from "axios";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
interface UploadResponse {
  path: string;
}

/**
 * Hook that control the file upload to the baseApi.
 * @PARAM callback function to be called when upload request is successful.
 * @author andr30z
 **/
export function useFileUpload(
  callback: (
    res: AxiosResponse<UploadResponse>,
    fileFromDevice: ImageInfo
  ) => void
) {
  const { setTrue, setFalse, value: isLoadingFile } = useBoolean(false);
  const { cancellablePromise } = useCancellablePromise();
  const onSubmitUpload = useCallback(async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (file.cancelled) return;
    const formData = new FormData();
    const name = file.uri.split("/").pop();
    if (!name) return;
    formData.append("file", {
      uri: file.uri,
      name,
      type: "multipart/form-data",
    } as any);
    setTrue();
    cancellablePromise(
      baseApi.post<UploadResponse>(baseApiRoutes.FILE_UPLOAD, formData)
    )
      .then((res) => {
        console.log(res.data);
        callback(res, file);
        setFalse();
      })
      .catch((e) => {
        setFalse();
      });
  }, []);

  return { onSubmitUpload, isLoadingFile };
}
