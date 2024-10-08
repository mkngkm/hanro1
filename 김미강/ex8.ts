function debounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// function throttle...

function throttle<T>(cb: (arg: T) => void, delay: number): (arg: T) => void {
  let lastCall = 0;

  return (arg: T): void => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      cb(arg);
    }
  };
}

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
