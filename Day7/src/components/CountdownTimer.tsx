import { useEffect, useState } from "react";
const Start_Time = 60;

export default function CountdownTimer() {
  const [time, setTime] = useState(Start_Time);

  useEffect(() => {
    const timerId = setInterval(() => {
     setTime((prev) => {
      if (prev <= 1) {
        clearInterval(timerId);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timerId);
  }, []);

  return (
    <div className="border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-3">
        Countdown Timer
      </h2>

      <div className="text-4xl font-bold">
        {time}
      </div>

      {time === 0 && (
        <p className="mt-3">
          Timer Completed
        </p>
      )}
    </div>
  );
}