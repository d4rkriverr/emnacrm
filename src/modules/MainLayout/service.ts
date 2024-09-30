import { icons } from "../../constants"


const GetLinks = async () => {
    return [
        // { name: "Overview", icon: icons.overview, link: '/dashboard/overview' },
        // { name: "Employees", icon: icons.groups, link: '/dashboard/employees' },
        // { name: "Expenses", icon: icons.expanses, link: '/dashboard/expenses' },
        { name: "call center", icon: icons.overview, link: '/dashboard/call-center' }
    ]
}

const GetWorkspaces = async () => {
    return []
    return [
        { name: "Poland", icon: icons.country },
        { name: "Romania", icon: icons.country },
        { name: "Malta", icon: icons.country },
        { name: "Malta1", icon: icons.country },
        { name: "Malta2", icon: icons.country },
        { name: "Malta3", icon: icons.country },
        { name: "Malta4", icon: icons.country },
    ]

}


export const service = { GetLinks, GetWorkspaces }