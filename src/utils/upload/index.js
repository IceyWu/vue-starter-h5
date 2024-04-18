import axios from "axios";
import Queue from "promise-queue-plus";
import { taskInfo, initTask, preSignUrl, merge } from "@/api/upload";
import md5 from "./md5";
import { showLoadingToast, showToast } from "vant";

const DEFAULT_SIZE = 5 * 1024 * 1024;

/**
 * 获取一个上传任务，没有则初始化一个
 */
const getTaskInfo = async (file, chunkSize = DEFAULT_SIZE) => {
  let task;
  const identifier = await md5(file, chunkSize);
  const { code, data, msg } = await taskInfo(identifier);
  if (code === 200) {
    task = data;
    if (!data) {
      const initTaskParams = {
        identifier,
        fileName: file.name,
        totalSize: file.size,
        chunkSize,
      };
      const initTaskData = await initTask(initTaskParams);
      if (initTaskData.code === 200) {
        task = initTaskData.data;
      } else {
        console.log("初始化上传任务失败", initTaskData.msg);
      }
    } else {
      // console.log("🍪-----已经有上传任务了-----", data);
    }
  } else {
    console.log("获取上传任务失败", msg);
  }
  return task;
};

/**
 * 上传逻辑处理，如果文件已经上传完成（完成分块合并操作），则不会进入到此方法中
 */
const handleUpload = (file, taskRecord, options, callback = (res) => {}) => {
  let lastUploadedSize = 0; // 上次断点续传时上传的总大小
  let uploadedSize = 0; // 已上传的大小
  const totalSize = file.size || 0; // 文件总大小
  let startMs = new Date().getTime(); // 开始上传的时间
  const { exitPartList, chunkSize, chunkNum, fileIdentifier } = taskRecord;

  // 获取从开始上传到现在的平均速度（byte/s）
  const getSpeed = () => {
    // 已上传的总大小 - 上次上传的总大小（断点续传）= 本次上传的总大小（byte）
    const intervalSize = uploadedSize - lastUploadedSize;
    const nowMs = new Date().getTime();
    // 时间间隔（s）
    const intervalTime = (nowMs - startMs) / 1000;

    return intervalSize / intervalTime;
  };

  const uploadNext = async (partNumber) => {
    const start = new Number(chunkSize) * (partNumber - 1);
    const end = start + new Number(chunkSize);
    const blob = file.slice(start, end);
    const { code, data, msg } = await preSignUrl({
      identifier: fileIdentifier,
      partNumber: partNumber,
    });
    if (code === 200 && data) {
      await axios.request({
        url: data,
        method: "PUT",
        data: blob,
        headers: { "Content-Type": "application/octet-stream" },
      });
      return Promise.resolve({
        partNumber: partNumber,
        uploadedSize: blob.size,
      });
    }
    return Promise.reject(`分片${partNumber}， 获取上传地址失败`);
  };

  /**
   * 更新上传进度
   * @param increment 为已上传的进度增加的字节量
   */
  const updateProcess = (increment) => {
    increment = new Number(increment);
    const { onProgress = () => {} } = ({} = options);
    let factor = 1000; // 每次增加1000 byte
    let from = 0;
    // 通过循环一点一点的增加进度
    while (from <= increment) {
      from += factor;
      uploadedSize += factor;
      const percent = Math.round((uploadedSize / totalSize) * 100).toFixed(2);
      onProgress({ percent: percent });
    }

    const speed = getSpeed();
    // console.log("剩余大小：", (totalSize - uploadedSize) / 1024 / 1024, "mb");
    // console.log("当前速度：", (speed / 1024 / 1024).toFixed(2), "mbps");
    // console.log("预计完成：", remainingTime);
    // 剩余时间
    const remainingTime =
      speed != 0 ? Math.ceil((totalSize - uploadedSize) / speed) + "s" : "未知";
    // 当前速度
    const speedMb = (speed / 1024 / 1024).toFixed(2);
    // 剩余大小
    const remainingSize = (totalSize - uploadedSize) / 1024 / 1024;
    callback({
      percent: Math.round((uploadedSize / totalSize) * 100).toFixed(2),
      speed: speedMb,
      remainingTime: remainingTime,
      remainingSize,
    });
  };

  return new Promise((resolve) => {
    const failArr = [];
    const queue = Queue(5, {
      retry: 3, //Number of retries
      retryIsJump: false, //retry now?
      workReject: function (reason, queue) {
        failArr.push(reason);
      },
      queueEnd: function (queue) {
        resolve(failArr);
      },
    });

    for (let partNumber = 1; partNumber <= chunkNum; partNumber++) {
      const exitPart = (exitPartList || []).find(
        (exitPart) => exitPart.partNumber == partNumber
      );
      if (exitPart) {
        // 分片已上传完成，累计到上传完成的总额中,同时记录一下上次断点上传的大小，用于计算上传速度
        lastUploadedSize += new Number(exitPart.size);
        updateProcess(exitPart.size);
      } else {
        queue.push(() =>
          uploadNext(partNumber).then((res) => {
            // 单片文件上传完成再更新上传进度
            updateProcess(res.uploadedSize);
          })
        );
      }
    }
    if (queue.getLength() == 0) {
      // 所有分片都上传完，但未合并，直接return出去，进行合并操作
      resolve(failArr);
      return;
    }
    queue.start();
  });
};

// 返回值格式化
const formatResponse = (res) => {
  const { taskRecord = {} } = res;
  return {
    ...taskRecord,
  };
};

/**
 * el-upload 自定义上传方法入口
 */
export const uploadFile = async (
  data,
  {
    isOnlyFile = true,
    isNeedLoading = true,
    maxSize,
    chunkSize = DEFAULT_SIZE,
  },
  callback
) => {
  let tempOption;
  let loadingInstance;

  if (isOnlyFile) {
    tempOption = {
      file: data,
      onProgress: () => {},
    };
  } else {
    tempOption = data;
  }
  // return
  const file = tempOption.file;

  // 文件大小限制
  if (maxSize) {
    const { size } = file;
    if (size / 1024 / 1024 > maxSize) {
      showToast(`文件大小不能超过${maxSize}M`);
      return;
    }
  }
  // 分片大小限制（max为5120* 1024 * 1024，min为5* 1024 * 1024）
  if (chunkSize > 5120 * 1024 * 1024) {
    showToast(`文件分片大小不能超过5G`);
    return;
  }
  if (chunkSize < 5 * 1024 * 1024) {
    showToast(`文件分片大小不能低于5M`);
    return;
  }

  // 是否需要loading
  if (isNeedLoading) {
    loadingInstance = showLoadingToast({
      message: "上传中...",
      forbidClick: true,
      duration: 0,
    });
  }
  const task = await getTaskInfo(file, chunkSize);
  if (task) {
    const { finished, path, taskRecord } = task;
    const { fileIdentifier: identifier } = taskRecord;
    if (finished) {
      console.log("文件已经上传完成，无需再次上传", task);
      isNeedLoading && loadingInstance.close();
      return formatResponse(task);
    } else {
      const errorList = await handleUpload(
        file,
        taskRecord,
        tempOption,
        (res) => {
          if (isNeedLoading) {
            const { percent, speed, remainingTime } = res;
            loadingInstance.message = `文件上传中...${percent}%，剩余${remainingTime}，速度${speed}mb/s`;
          }
          callback(res);
        }
      );

      if (errorList.length > 0) {
        console.log("部分分片上次失败，请尝试重新上传文件", errorList);
        isNeedLoading && loadingInstance.close();
        return;
      }
      const { code, data, msg } = await merge(identifier);
      if (code === 200) {
        isNeedLoading && loadingInstance.close();
        return formatResponse(task);
      } else {
        isNeedLoading && loadingInstance.close();
        console.log("合并分片失败", msg);
      }
    }
  } else {
    isNeedLoading && loadingInstance.close();
    console.log("获取上传任务失败", task);
  }
};
