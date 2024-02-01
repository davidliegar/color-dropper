export function debounce (func: (...params: unknown[]) => unknown, time = 300){
  let timer: ReturnType<typeof setTimeout>

  return function (event: any){
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
  };
}