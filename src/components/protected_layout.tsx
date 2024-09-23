import { FormEvent, useState } from "react";
import { Navigate, NavLink, useOutlet } from "react-router-dom";
import { icons } from "../constants";
import { useAuth } from "../hooks/useAuth";


export default function ProtectedLayout() {
    const outlet = useOutlet();
    const { isAuthed } = useAuth();

    const [openWSModel, setOpenWSModel] = useState(false);

    const [menuItems] = useState([
        { name: "Overview", icon: icons.overview, link: '/dashboard/overview' },
        { name: "Employees", icon: icons.groups, link: '/dashboard/employees' },
        { name: "Expenses", icon: icons.expanses, link: '/dashboard/expenses' },
        { name: "documents", icon: icons.overview, link: '/dashboard/documents' }
    ])
    const [workspace] = useState([
        { name: "Poland", icon: icons.country },
        { name: "Romania", icon: icons.country },
        { name: "Malta", icon: icons.country }
    ])

    const onAddWorkspace = (obj: unknown) => {
        console.log(obj);

    }
    if (!isAuthed) return <Navigate to="/" />;
    return (
        <div className={`flex w-screen h-screen`} >
            {/* SIDE BAR */}
            <div className="w-72 border-r-2 flex flex-col">
                <div className="flex items-center justify-center p-3 h-16">
                    <button className="flex justify-between items-center p-2 w-full hover:outline outline-2 outline-blue-400 border rounded-md">
                        <span className="flex justify-between items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5">
                                <path d="M18 21a8 8 0 0 0-16 0"></path>
                                <circle cx="10" cy="8" r="5"></circle>
                                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                            </svg>
                            <span className="text-sm">Hamza</span>
                        </span>
                    </button>
                </div>
                <div className="flex-1 flex flex-col py-3 border-y-2 p-3">
                    <MenuTab data={menuItems} />
                    <WorkspaceTab data={workspace} onOpenCreate={() => setOpenWSModel(true)} />
                </div>
                <div className="p-3">
                    <button className="flex justify-center items-center p-3 w-full bg-black border rounded-md">
                        <span className="text-white text-sm font-bold">logout</span>
                    </button>
                </div>
            </div>
            <div className="flex-1">{outlet}</div>
            <AddWorkspaceModel isOpen={openWSModel} onSave={onAddWorkspace} onClose={() => setOpenWSModel(false)} />
        </div>
    )
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuTab = ({ data }: any) => {
    return (
        <div data-collapsed="false" className="group flex flex-col">
            <nav className="text-sm">
                {data.map((e: { name: string; link: string; icon: JSX.Element }) => {
                    return (
                        <NavLink key={e.name} to={e.link} className="navLink flex gap-1 items-center stroke-black hover:bg-gray-50 data-[state=true]:bg-gray-50 data-[state=true]:border-black p-2">
                            <div className="w-4 h-4 ">{e.icon}</div>
                            <p>{e.name}</p>
                        </NavLink>
                    )
                })}
            </nav>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WorkspaceTab = ({ data, onOpenCreate }: any) => {
    return (
        <div className="group flex flex-col">
            <div className="flex flex-col font-medium">
                <div className="flex items-center select-none py-2">
                    <p className="flex-1 text-sm text-gray-500 mx-1 font-bold">WORKSPACE</p>
                    <button onClick={onOpenCreate} className="stroke-black hover:stroke-white hover:bg-black">
                        <svg className="w-6 h-6" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                            <path d="M9 12H12M15 12H12M12 12V9M12 12V15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <nav className="text-sm data-[hidden=true]:hidden bg-gray-50">
                    {data.map((x: { name: string; icon: JSX.Element }) => {
                        return (
                            <NavLink key={x.name} to={`/dashboard/workspaces/${x.name}`} className="navLink flex justify-between items-center gap-1 hover:bg-black hover:text-white hover:stroke-white stroke-black data-[state=true]:bg-gray-50 data-[state=true]:border-black p-2">
                                <div className="w-5 h-5">{x.icon}</div>
                                <p className="flex-1">{x.name}</p>
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddWorkspaceModel = ({ isOpen, onSave, onClose }: { isOpen: boolean, onSave: any, onClose: any }) => {
    const [state, setState] = useState({ isLoad: false, message: "" })
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.isLoad) return;
        const obj = Object.fromEntries(new FormData(e.currentTarget));
        setState({ isLoad: true, message: "" })
        const r = await onSave({
            name: obj.name.toString(),
            target_country: obj.target_country.toString(),
            contract_price: Number(obj.contract_price),
            is_passport_required: obj.is_passport_required != undefined,
            is_b3_required: obj.is_b3_required != undefined,
            is_cv_required: obj.is_cv_required != undefined,
            is_cnss_required: obj.is_cnss_required != undefined,
            is_adt_required: obj.is_adt_required != undefined,
            is_diploma_required: obj.is_diploma_required != undefined
        })
        if (r.success) return setState({ isLoad: false, message: "" });
        setState({ isLoad: false, message: r.message })
    }

    if (!isOpen) return <></>;
    return (
        <div className="fixed top-0 w-screen h-screen bg-black/65 flex justify-center items-center">
            <div className="bg-white w-[450px] rounded border-2">
                <div className="flex justify-between items-center p-3">
                    <h2 className="font-bold text-xl">add workspace</h2>
                    <button disabled={state.isLoad} onClick={onClose} className="border rounded-md p-1 text-sm hover:bg-red-500 bg-red-600 stroke-white disabled:hidden">
                        <svg className="w-4 h-4" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <hr />
                <form onSubmit={onSubmit} className="grid gap-4 p-4">
                    <p className="text-center text-red-500">{state.message}</p>
                    <div className="grid gap-1">
                        <label className="text-sm">Name:</label>
                        <input type="text" required name="name" className="flex w-full rounded-md border bg-transparent p-3 text-sm shadow-sm" />
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm">Country:</label>
                        <select required name="target_country" className="flex w-full rounded-md border bg-transparent p-3 text-sm shadow-sm">
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua & Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia (Plurinational State of)">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia & Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cabo Verde">Cape Verde</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo - Brazzaville</option>
                            <option value="Congo, Democratic Republic of the">Congo - Kinshasa</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curaçao">Curaçao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czechia</option>
                            <option value="Côte d'Ivoire">Côte d’Ivoire</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Eswatini (Swaziland)">Eswatini</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Islas Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard & McDonald Islands</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, North">North Korea</option>
                            <option value="Korea, South">South Korea</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia North">North Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Curaçao</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn Islands">Pitcairn Islands</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Réunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy">St. Barthélemy</option>
                            <option value="Saint Helena">St. Helena</option>
                            <option value="Saint Kitts and Nevis">St. Kitts & Nevis</option>
                            <option value="Saint Lucia">St. Lucia</option>
                            <option value="Saint Martin">St. Martin</option>
                            <option value="Saint Pierre and Miquelon">St. Pierre & Miquelon</option>
                            <option value="Saint Vincent and the Grenadines">St. Vincent & Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">São Tomé & Príncipe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Serbia and Montenegro">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">South Georgia & South Sandwich Islands</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard & Jan Mayen</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad & Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey (Türkiye)">Türkiye</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks & Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="U.S. Outlying Islands">U.S. Outlying Islands</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City Holy See">Vatican City</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands, British">British Virgin Islands</option>
                            <option value="Virgin Islands, U.S">U.S. Virgin Islands</option>
                            <option value="Wallis and Futuna">Wallis & Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>

                        </select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-sm">Contract Price:</label>
                        <input type="text" required name="contract_price" className="flex w-full rounded-md border bg-transparent p-3 text-sm shadow-sm" placeholder="20,000 TND" />
                    </div>
                    <div className="grid gap-1">
                        <fieldset className="border p-2">
                            <legend>required docs:</legend>
                            <div className="flex justify-between px-2">
                                <div className="flex-1">
                                    <div className="flex gap-1 items-center">
                                        <input name="is_passport_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">Passport</label>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <input name="is_b3_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">B3</label>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <input name="is_cv_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">C.V</label>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex gap-1 items-center">
                                        <input name="is_cnss_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">CNSS</label>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <input name="is_adt_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">attestation de travail</label>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <input name="is_diploma_required" type="checkbox" className="p-2 border" />
                                        <label htmlFor="">diploma</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <button disabled={state.isLoad} className="bg-black py-3 rounded-md hover:bg-black/80 disabled:bg-black/60">
                        <p className="text-white">{state.isLoad ? "please wait ..." : "save"}</p>
                    </button>
                </form>
            </div>
        </div>
    )
}