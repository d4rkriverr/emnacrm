/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Workspace({ name }: any) {
    return (
        <div className="">
            <div className="h-16 flex items-center px-3">
                <h2 className="text-lg select-none">WORKSPACE <span className="font-bold">({name})</span></h2>
            </div>
            <div className="border-t-2 bg-gray-500">

            </div>
        </div>
    )
}