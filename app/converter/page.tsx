import ConverterManual from "../components/ConverterManual";

export const metadata = {
  title: "مبدل ارز دلار ↔ ریال",
  description: "تبدیل سریع بین دلار و ریال با نرخ دلخواه کاربر",
};

export default function ConverterPage() {
  return (
    <div className="bg-[url('/bg.png')] w-full h-screen p-8 justify-center items-center flex ">
      <div className="mx-auto max-w-3xl flex w-[90%]">
        <ConverterManual />
      </div>
    </div>
  );
}
