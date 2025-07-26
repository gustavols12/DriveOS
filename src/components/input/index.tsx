import { InputProps } from '@/types/input.type';

export function Input({ id, type, placeholder, value, onChange }: InputProps) {
  return (
    <input
      id={id}
      className="w-full rounded-md h-10 text-black outline-none border border-gray-300 px-3 py-2 box-border"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
