import { ChangeEvent, useEffect, useState } from "react"
import { service } from "./service"
import { icons } from "../../constants"
import AddCallModel from "./call_view"


interface CallLog {
    id: string;
    cin: string,
    name: string,
    phone: string,
    requested_job: string,
    requested_country: string,
    call_status: string,
    platform: string,
    notes: string,
    agent: string,
    created_at: string
}

export default function CallCenter() {
    const config = { pageSize: 10 }
    const [state, setState] = useState({ isLoad: true, message: "" });
    const [openAddModel, setOpenAddModel] = useState(false);

    const [currentDate, setCurrentDate] = useState((new Date()))
    const [currentPage, setCurrentPage] = useState({ page: 0, start: 0, end: 10 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [calls, setCalls] = useState<any>({})

    useEffect(() => { initialState(currentDate) }, [])

    const initialState = async (currentDate: Date) => {
        setState({ isLoad: true, message: "" })
        const r = await service.getCallsData(currentDate)
        setCurrentPage({ page: 0, start: 0, end: 10 })
        setCalls(r)
        setState({ isLoad: false, message: "" })
    }

    const onPageChange = (index: number) => {
        setCurrentPage({
            page: 0,
            start: index * config.pageSize,
            end: index * config.pageSize + config.pageSize
        })
    }
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const d = e.currentTarget.valueAsDate;
        if (d == null) return;
        setCurrentDate(d);
        initialState(d);
    }
    const onAdd = async (val: CallLog) => {
        const r = await service.addNewCall(val)
        if (r.success) {
            initialState(currentDate);
        }
        return r;
    }


    return (state.isLoad)
        ? (<div className="h-full flex flex-col justify-center items-center font-bold text-xl"><div className="stroke-black w-8 h-8 animate-spin">{icons.refresh}</div></div>)
        : (
            <div className="w-full h-full flex flex-col px-6">
                <div className="flex justify-between items-center py-3">
                    <h3 className="font-bold text-3xl">Call Center</h3 >
                </div>
                <div className="flex-1 justify-center items-center">
                    <div className="py-3">
                        <div className="flex justify-between items-center gap-1 text-end mb-2">
                            <div>
                                <p className="text-gray-500">N°Client: <b className="text-black">{calls.calls.length}</b></p>
                            </div>
                            <div className="flex gap-1">
                                <input type="date" onChange={onChangeDate} defaultValue={(currentDate).toLocaleDateString('en-CA')} className="border-2 border-black rounded-md p-2" />
                                <button onClick={() => setOpenAddModel(true)} className="bg-black rounded-md py-3 px-6 text-white">
                                    <p className="text-white text-xs">New Call</p>
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full text-sm border-2 rounded-lg">
                                <thead className="">
                                    <tr className="border-b bg-gray-200/50 font-bold text-xs">
                                        <th className="h-10 px-2 text-left align-middle"><div>ID</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>C.I.N</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Personal info</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Requested job</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Requested Country</div></th>
                                        <th className="h-10 w-max px-2 text-left align-middle"><div>Notes</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Call Status</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Platform</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Call Date</div></th>
                                        <th className="h-10 px-2 text-left align-middle"><div>Agent</div></th>
                                        <th className="h-10 px-2 text-left align-middle"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (calls.calls).slice(currentPage.start, currentPage.end).map((e: CallLog) => {
                                            const callStatusBg = (e.call_status == "Voicemail" ? "bg-orange-100" : e.call_status == "Reached" ? "bg-green-200" : "bg-red-200 ");
                                            const dateFormat = (new Date(e.created_at)).toLocaleString();
                                            return (
                                                <tr key={`item-${e.id}`} className="border-b hover:bg-gray-50/70">
                                                    <td className="p-2 align-middle"><div className="text-xs font-bold">#{e.id}</div></td>
                                                    <td className="p-2 align-middle"><span className="truncate font-medium text-sm">{e.cin}</span></td>
                                                    <td className="p-2 align-middle flex flex-col text- font-bold">
                                                        <span>{e.name}</span>
                                                        <span className="text-xs text-gray-500">Phone: {e.phone}</span>
                                                    </td>
                                                    <td className="p-2 align-middle">
                                                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none">{e.requested_country}</div>
                                                    </td>
                                                    <td className="p-2 align-middle">
                                                        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none">{e.requested_job}</div>
                                                    </td>
                                                    <td className="p-2 align-middle"><span className="font-bold text-xs">{e.notes}</span></td>
                                                    <td className="p-2 align-middle"><div className={`rounded-lg py-1.5 text-xs font-semibold w-[95px] text-center ${callStatusBg}`}>{e.call_status}</div></td>
                                                    <td className="p-2 align-middle"><div className="rounded-lg py-1.5 text-xs font-semibold w-[95px] bg-gray-200 text-center">{e.platform}</div></td>
                                                    <td className="p-2 align-middle"><p className="text-xs">{dateFormat}</p></td>
                                                    <td className="p-2 align-middle"><span className="font-bold">{e.agent}</span></td>
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
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination onChange={onPageChange} arrLength={calls.calls.length} startAt={currentPage.page} pageSize={config.pageSize} />
                        </div>
                    </div>
                </div>
                <AddCallModel data={calls} isOpen={openAddModel} onAdd={onAdd} onExit={() => setOpenAddModel(false)} />
            </div>
        )
}


function Pagination({ onChange, arrLength, startAt, pageSize }: { onChange: (index: number) => void, arrLength: number, startAt: number, pageSize: number }) {
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
                        <button data-state={currentPage == e} onClick={() => onPageChange(e)} className="w-9 h-9 rounded data-[state=true]:bg-gray-100">{e + 1}</button>
                    )
                })}
            </div>
        </div>
    )
}