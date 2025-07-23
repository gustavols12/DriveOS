import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-h-screen mx-auto flex flex-col sm:flex-row">
      {children}
    </div>
  );
}
