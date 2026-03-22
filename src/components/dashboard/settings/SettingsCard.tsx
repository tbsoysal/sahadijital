type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SettingsCard({ title, children }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-[#181D27]">{title}</h2>
      {children}
    </div>
  );
}
