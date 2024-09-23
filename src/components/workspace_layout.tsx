import { useOutlet, useParams } from "react-router-dom"

export default function WorkspaceLayout() {
    const outlet = useOutlet();
    const { id } = useParams();


    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="font-bold text-5xl">401</p>
            <p className="font-medium text-lg">unauthorized access</p>
        </div>
    )
    return (
        <>

            {id}
            {outlet}
        </>
    )
}