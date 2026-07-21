'use client';

import React, { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: differenceInDays(targetDate, now),
          hours: differenceInHours(targetDate, now) % 24,
          minutes: differenceInMinutes(targetDate, now) % 60,
          seconds: differenceInSeconds(targetDate, now) % 60
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 mb-3">
      {[
        { val: timeLeft.days.toString(), lbl: 'Days' },
        { val: timeLeft.hours.toString(), lbl: 'Hrs' },
        { val: timeLeft.minutes.toString(), lbl: 'Min' },
        { val: timeLeft.seconds.toString(), lbl: 'Sec', color: 'text-wrc-blue' }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-lg py-3 flex flex-col items-center justify-center border border-[#d3e0ea] shadow-[0_4px_16px_rgba(59,130,246,0.12)]">
          <span className={`font-heading font-bold text-xl ${item.color || 'text-slate-800'}`}>
            {item.val}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            {item.lbl}
          </span>
        </div>
      ))}
    </div>
  );
}
