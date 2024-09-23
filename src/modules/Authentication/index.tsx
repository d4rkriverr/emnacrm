import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Authentication() {
    const [state, setState] = useState({ isLoad: false, message: "" })
    const { userLogin } = useAuth();
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.isLoad) return
        setState({ isLoad: true, message: "" })
        const o = Object.fromEntries(new FormData(e.currentTarget))
        const r = await userLogin(o.username.toString(), o.password.toString())
        if (r != null) {
            setState({ isLoad: false, message: "invalid credentials" })
        }
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center p-3 bg-gray-50">
            <form onSubmit={onSubmit} className="flex flex-col gap-5 p-5 w-[320px] bg-white shadow-sm rounded-lg">
                <h2 className="LoginTitle my-0 mx-auto font-sans text-3xl font-bold">LOGIN.</h2>
                <hr />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Username:</label>
                        <input
                            required
                            disabled={state.isLoad}
                            name="username"
                            className="p-2 rounded-lg border-2 outline-none text-sm"
                            placeholder="username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Password:</label>
                        <input
                            required
                            disabled={state.isLoad}
                            type="password"
                            name="password"
                            className="p-1.5 rounded-lg border-2 outline-none text-sm"
                            placeholder="•••••••••••" />
                    </div>
                    <div className="flex gap-1">
                        <input disabled={state.isLoad} type="checkbox" />
                        <label className="text-sm">Remember me</label>
                    </div>
                    <p className="text-red-500 text-center">{state.message}</p>
                    <button disabled={state.isLoad} className="bg-black disabled:bg-black/70 text-white py-3 font-bold rounded-lg">
                        {state.isLoad ? "please wait ...." : "Sign in"}
                    </button>
                </div>

                <hr />
                <p className="text-center font-bold text-xs">powerd by engima</p>
            </form>
        </div>
    )
}