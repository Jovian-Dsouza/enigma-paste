export default function TransactionModal({children, show}){
    if(!show){return <div></div>}
    return (
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 inset-30 border-2 border-black max-h-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="flex flex-col items-center justify-center space-y-4 m-5 md:m-10">
          {children}
          {/* Spinner block */}
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
}