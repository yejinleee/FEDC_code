import { request } from "./api.js";

export default function SyncTasksManager() {
  let tasks = [];

  this.addTask = (task) => {
    tasks.push(task);
    console.log(tasks);
  };

  this.removeTasks = (urlPattern) => {
    tasks = tasks.filter((task) => !task.url.includes(urlPattern));
    console.log(tasks);
  };

  this.run = async () => {
    if (tasks.length > 0) {
      const task = tasks.shift();

      await request(task.url, {
        method: task.method || "GET",
      });

      this.run(); // 태스크 이어서 실행되야하니까!!!
    }
  };
}
