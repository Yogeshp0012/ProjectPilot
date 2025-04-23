export default function Button({message}: {message: string}) {
    return (
      <>
      <button
        type="button"
        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
      >
        {message}
      </button>
      </>
    )
  }
