const curlCommand = "curl https://gateway.pinata.cloud/ipfs/<ipfs_file_hash>";

export default function APIPage() {
  return (
    <div className="flex flex-col h-screen justify-start items-center py-20 px-10">
      <div className="">
        <div className="text-4xl font-bold ">API 📍</div>
        <p className="text-lg mt-5">
          Retrieve IPFS content directly to your terminal using this command.
        </p>
        <div class="w-full mt-8">
          <div
            class="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800  pb-6 rounded-lg leading-normal overflow-hidden"
          >
            <div class="top mb-2 flex">
              <div class="h-3 w-3 bg-red-500 rounded-full"></div>
              <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
              <div class="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div class="mt-4 flex">
              <span class="text-green-400">computer:~$</span>
              <p class="flex-1 typing items-center pl-2">{curlCommand}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
