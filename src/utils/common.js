import { asyncTaskApi } from "@/api/common";
import { getAsyncTask as getAsyncTaskFunc } from "@iceywu/utils";

export const getAsyncTask = async (id) => {
  const rules = [
    {
      keys: "code",
      val: 200,
    },
    {
      keys: ["data", "complete"],
      val: true,
    },
  ];
  const params = { id };
  const { task } = getAsyncTaskFunc(asyncTaskApi, { rules, params });
  return task;
};
