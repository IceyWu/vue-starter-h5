import eruda from "eruda";

// eruda 初始化
export const initEruda = () => {
  const activeEruda = localStorage.getItem("active-eruda");
  if (activeEruda === "true") {
    eruda.init();
  }
};

// eruda 销毁
export const destroyEruda = () => {
  if (eruda) {
    eruda?.destroy();
  }
};
