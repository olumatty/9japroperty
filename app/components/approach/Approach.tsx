import { labelClass } from "@/app/lib/styles";

export function Approach() {
  return (
    <section id="approach" className="w-full bg-surface">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-5 lg:px-6 lg:py-24">
        <p className={`${labelClass} reveal`}>The 9jaPropertyChic approach</p>

        <h2 className="reveal mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-[64px]">
          From wherever you are, to Nigeria.
        </h2>

        <p className="reveal mt-7 max-w-[640px] text-[16px] font-medium leading-7">
          Live in the UK, US, Canada or Europe? Get guidance on land, homes and
          investment in Nigeria, and a smooth landing when you come home.
        </p>
      </div>
    </section>
  );
}
