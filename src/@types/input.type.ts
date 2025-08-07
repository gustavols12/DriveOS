export interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  min?: string | number | undefined;
  max?: string | number | undefined;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
