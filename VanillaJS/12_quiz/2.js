/*
즉시 실행 함수는 전역을 오염시키지 않는다.
private 효과가 있다.
*/

const logger = (function () {
  let logCount = 0;
  function log(message) {
    console.log(message);
    logCount = logCount + 1;
  }
  function getLogCount() {
    return logCount;
  }
  return {
    log: log,
    getLogCount: getLogCount,
  };
})();

logger.log("hi bye hey"); //hi bye hey
logger.log("bye"); //bye

console.log(logger.getLogCount()); //2
console.log(logger.logCount); //undefined
