import Logo from "./Logo";

export default function Header() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Logo className="text-foreground" />
      <p className="text-lg text-gray-600">AI-Powered Slide Generation</p>
    </div>
  );
}
