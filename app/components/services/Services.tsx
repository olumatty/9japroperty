import { services } from "@/app/data/services";
import { labelClass } from "@/app/lib/styles";

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 py-20 sm:px-5 lg:px-6"
    >
      <p className={`${labelClass} reveal`}>Everything we do</p>

      <h2 className="reveal mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-[64px]">
        Your plans. Our local connection.
      </h2>

      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <li
            key={service.title}
            style={{ "--i": i % 3 } as React.CSSProperties}
            className="reveal card-hover flex min-h-[196px] flex-col gap-4 rounded-[28px] border border-white/10 bg-surface p-6"
          >
            <span className="font-display text-[11px] font-bold tracking-widest text-white/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[26px] font-extrabold leading-tight tracking-tight">
              {service.title}
            </h3>
            <p className="max-w-[300px] text-[15px] font-medium leading-6 text-white/90">
              {service.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
