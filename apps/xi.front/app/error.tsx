'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.log('error', error);
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
