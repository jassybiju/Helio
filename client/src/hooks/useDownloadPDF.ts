import { useMutation } from "@tanstack/react-query";
import { apiClient,  } from "../libs/axios.config";

export const useDownloadPDF = () =>
  useMutation({
    mutationFn: (data: {
      type: string;
      resource_id?: string;
      from?: Date;
      to?: Date;
    }) => apiClient.post("pdf", data, { responseType: "blob", }),

    onSuccess(blob, variables) {
      const url = URL.createObjectURL(blob.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${variables.type}-${variables.resource_id}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    },
  });
