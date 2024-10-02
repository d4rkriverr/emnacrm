import { FormEvent, useState } from "react"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddCallModel({ data, isOpen, onAdd, onExit }: any) {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditCallModel({ data, old, isOpen, onEdit, onExit }: any) {
    const [state, setState] = useState({ isLoad: false, message: "" })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const o = Object.fromEntries(new FormData(e.currentTarget))

        const r = await onEdit({
            id: old.id,
            cin: o.cin,
            name: o.name,
            phone: o.phone,
            requested_job: o.requested_job,
            requested_country: o.requested_country,
            call_status: o.call_status,
            platform: o.platform,
            notes: o.notes,
        })
        if (!r.success) {
            setState({ isLoad: false, message: r.message })
            return;
        }
        onExit()
    }
    return !isOpen ? <></> : (
        <div className="z-40 fixed top-0 left-0 w-screen h-screen flex">
            <div onClick={onExit} className="flex-1 bg-[#00000080]"></div>
            <div className="absolute right-0 w-1/4 h-screen bg-white flex justify-center items-center">
                <form onSubmit={onSubmit} className="p-10 flex flex-col gap-4">
                    <h2 className="font-bold text-3xl text-center mb-4">Edit call</h2>
                    <p className="text-center text-red-400">{state.message}</p>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">C.I.N</label>
                        <input required name="cin" defaultValue={old.cin} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="cin" />
                    </div>
                    <div className="flex gap-3">
                        <div className="grid gap-1">
                            <label className="text-xs font-medium leading-none">Name:</label>
                            <input required name="name" defaultValue={old.name} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="full name" />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-xs font-medium leading-none">Phone number:</label>
                            <input required name="phone" defaultValue={old.phone} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="phone number" />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requested job:</label>
                        <select name="requested_job" defaultValue={old.requested_job} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            {data.jobs.map((e: { name: string }) => { return <option key={e.name} value={e.name}>{e.name}</option> })}
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requested Country:</label>
                        <select name="requested_country" defaultValue={old.requested_country} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            {data.countries.map((e: { name: string }) => { return <option key={e.name} value={e.name}>{e.name}</option> })}

                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Status:</label>
                        <select name="call_status" defaultValue={old.call_status} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="Reached">Reached</option>
                            <option value="Voicemail">Voicemail</option>
                            <option value="Not Reached">Not Reached</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Platform:</label>
                        <select name="platform" defaultValue={old.platform} className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="whatsapp">Whatsapp</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="Telephone">Telephone</option>
                            <option value="Fix">Fix</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Notes:</label>
                        <textarea name="notes" defaultValue={old.notes} rows={5} className="flex w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">

                        </textarea>
                    </div>
                    <button className="bg-black py-4 rounded-lg">
                        <p className="text-white text-xs font-bold">EDIT</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export function Pagination({ onChange, arrLength, startAt, pageSize }: { onChange: (index: number) => void, arrLength: number, startAt: number, pageSize: number }) {
    const PageNubmer = (Math.ceil(arrLength / pageSize));
    const [currentPage, setCurrentPage] = useState(startAt);
    const [endEntities, setEndEntities] = useState(pageSize)
    const onPageChange = (i: number) => {
        setCurrentPage(i)
        onChange(i)
        const x = (i * pageSize) + pageSize
        setEndEntities(x > arrLength ? arrLength : x)
    }

    return (
        <div className="flex justify-between py-3">
            <div className="text-sm">
                <p>Showing <b>{(currentPage * pageSize) + 1}</b> to <b>{endEntities}</b> of <b>{arrLength}</b> entries.</p>
            </div>
            <div className="flex gap-1">
                {Array.from(Array(PageNubmer).keys()).map((e) => {
                    return (
                        <button key={e} data-state={currentPage == e} onClick={() => onPageChange(e)} className="w-9 h-9 rounded data-[state=true]:bg-gray-100">{e + 1}</button>
                    )
                })}
            </div>
        </div>
    )
}