export const error = (message: string) => (
  <>
    -- <span className='error'>{message}</span>
  </>
);
export const CannotPreviewError = ({ type }: { type: string }) => (
  <>Cannot preview {type} right now, there was an error! Check if you have filled all required fields of your form!</>
);
