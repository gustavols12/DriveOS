import { FormClient } from './components/addClient';

export default function Customer() {
  return (
    <div className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <FormClient />
    </div>
  );
}
