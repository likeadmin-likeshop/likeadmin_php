import { ref } from 'vue';

function useLockFn(fn) {
  const isLock = ref(false);
  const lockFn = async (...args) => {
    if (isLock.value)
      return;
    isLock.value = true;
    try {
      const res = await fn(...args);
      isLock.value = false;
      return res;
    } catch (e) {
      isLock.value = false;
      throw e;
    }
  };
  return {
    isLock,
    lockFn
  };
}

export { useLockFn as u };
//# sourceMappingURL=useLockFn.da8853e7.mjs.map
