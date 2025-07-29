import { FormClient } from './components/addClient';
import { ListClient } from './components/showClient';

export default function Customer() {
  return (
    <div className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg ">
        <FormClient />
        <ListClient />
      </div>
    </div>
  );
}
