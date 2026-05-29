import { Dialog } from "radix-ui";

const Modal = ({ open, setOpen, title, message, labelAccept, labelCancel, onAccept }) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlay-show fixed inset-0 bg-black/50" />

      <Dialog.Content className="data-[state=open]:animate-content-show fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none">
        <Dialog.Title className="m-0 text-lg font-semibold text-slate-900">
          {title}
        </Dialog.Title>

        <Dialog.Description className="mb-5 mt-2 leading-normal text-slate-500">
          {message}
        </Dialog.Description>

        <div className="mt-6 flex justify-end gap-x-2">
          <Dialog.Close asChild>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-lime-300 px-4 font-medium leading-none text-black transition-colors hover:bg-lime-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2" onClick={onAccept}>
              {labelAccept}
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-300 px-4 font-medium leading-none text-black transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2">
              {labelCancel}
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
