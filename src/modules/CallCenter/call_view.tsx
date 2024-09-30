import { FormEvent, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CallsTableView = ({ data }: { data: any[] }) => {
    return (
        <div className="relative w-full overflow-auto">
            <table className="w-full text-sm border-2 rounded-lg">
                <thead className="">
                    <tr className="border-b bg-gray-200/50 font-bold">
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">ID</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">C.I.N</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Name</div>
                        </th>
                        {/* <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Phone</div>
                        </th> */}
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Requested job</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Requested Country</div>
                        </th>
                        <th className="h-10 w-max px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Notes</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Call Status</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Platform</div>
                        </th>    <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Call Date</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}>
                            <div className="text-xs">Agent</div>
                        </th>
                        <th className="h-10 px-2 text-left align-middle" colSpan={1}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => {
                            return (
                                <tr key={"item" + e.id} className="border-b hover:bg-gray-50/70" data-state="false">
                                    <td className="p-2 align-middle">
                                        <div className="text-xs font-bold">#{e.id}</div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <span className="truncate font-medium">{e.cin}</span>
                                    </td>
                                    <td className="p-2 align-middle flex flex-col">
                                        <span className="text-lg font-bold">{e.name}</span>
                                        {/* </td>
                                    <td className="p-2 align-middle"> */}
                                        <span className="font-bold text-xs text-gray-500">Phone: {e.phone}</span>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none">
                                            {e.requested_country}
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none">
                                            <p className="text-xs font-semibold">{e.requested_job}</p>
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <span className="font-bold text-xs">{e.notes}</span>
                                    </td>
                                    <td className="p-2 align-middle">
                                        {

                                            <div className={
                                                "rounded-lg py-1.5 text-xs font-semibold w-[95px] " +
                                                (e.call_status == "Voicemail" ? "bg-orange-100" :
                                                    e.call_status == "Reached" ? "bg-green-200" : "bg-red-200 ")}>
                                                <p className="text-center">{e.call_status}</p>
                                            </div>
                                        }
                                    </td>
                                    <td className="p-2 align-middle">
                                        <div className="rounded-lg py-1.5 text-xs font-semibold w-[95px] bg-gray-200">
                                            <p className="text-center">{e.platform}</p>
                                        </div>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <p className="text-xs">{(new Date(e.created_at)).toLocaleString()}</p>
                                    </td>
                                    <td className="p-2 align-middle">
                                        <span className="font-bold">{e.agent}</span>
                                    </td>
                                    <td className="p-2 align-middle text-center">
                                        <button
                                            className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-gray-100 hover:border-2 flex h-8 w-8 p-0"
                                            type="button" id="radix-:r4f:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4">
                                                <path
                                                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="sr-only">Open menu</span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddCallModel({ data, isOpen, onAdd, onExit }: any) {
    const [state, setState] = useState({ isLoad: false, message: "" })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const o = Object.fromEntries(new FormData(e.currentTarget))
        const r = await onAdd(o)
        if (!r.success) {
            setState({ isLoad: false, message: r.message })
            return;
        }
        onExit()
    }
    return !isOpen ? <></> : (
        <div className="fixed top-0 left-0 w-screen h-screen flex">
            <div onClick={onExit} className="flex-1 bg-[#00000080]"></div>
            <div className="absolute right-0 w-1/4 h-screen bg-white flex justify-center items-center">
                <form onSubmit={onSubmit} className="p-10 flex flex-col gap-4">
                    <h2 className="font-bold text-3xl text-center mb-4">Add call</h2>
                    <p className="text-center text-red-400">{state.message}</p>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">C.I.N</label>
                        <input required name="cin" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="cin" />
                    </div>
                    <div className="flex gap-3">
                        <div className="grid gap-1">
                            <label className="text-xs font-medium leading-none">Name:</label>
                            <input required name="name" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="full name" />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-xs font-medium leading-none">Phone number:</label>
                            <input required name="phone" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="phone number" />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requested job:</label>
                        <select name="requested_job" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            {data.jobs.map((e: { name: string }) => { return <option key={e.name} value={e.name}>{e.name}</option> })}
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requested Country:</label>
                        <select name="requested_country" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            {data.countries.map((e: { name: string }) => { return <option key={e.name} value={e.name}>{e.name}</option> })}

                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Status:</label>
                        <select name="call_status" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="Reached">Reached</option>
                            <option value="Voicemail">Voicemail</option>
                            <option value="Not Reached">Not Reached</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Platform:</label>
                        <select name="platform" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="whatsapp">Whatsapp</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="Telephone">Telephone</option>
                            <option value="Fix">Fix</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Notes:</label>

                        <textarea name="notes" rows={5} className="flex w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">

                        </textarea>
                    </div>
                    <button className="bg-black py-3 rounded-lg">
                        <p className="text-white">save</p>
                    </button>
                </form>
            </div>
        </div>
    )
}
