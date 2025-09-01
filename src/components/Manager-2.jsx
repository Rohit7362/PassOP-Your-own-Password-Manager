import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        const newPassword = { ...form, id: uuidv4() }
        const updatedArray = [...passwordArray, newPassword]
        setPasswordArray(updatedArray)
        localStorage.setItem("passwords", JSON.stringify(updatedArray))
        setform({ site: "", username: "", password: "" })
        toast('Password Saved!', {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
        });
    }

    const deletePassword = (id) => {
        if (confirm("Do you really want to delete this ?")) {
            const updatedArray = passwordArray.filter(item => item.id !== id)
            setPasswordArray(updatedArray)
            localStorage.setItem("passwords", JSON.stringify(updatedArray))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 4000,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-4 md:px-20 lg:px-40 py-8">
                <h1 className='font-bold text-3xl md:text-4xl text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-base md:text-lg text-center'>
                    Your Own Password Manager
                </p>

                {/* Form Section */}
                <div className='flex flex-col p-4 items-center gap-6'>
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full p-3 md:p-4'
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            className='rounded-full border border-green-600 w-full p-3 md:p-4'
                            type="text"
                            name="username"
                            id="username"
                        />

                        <div className="relative w-full md:w-auto">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className='rounded-full border border-green-600 w-full p-3 md:p-4'
                                type="password"
                                name="password"
                                id="password"
                            />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2 w-full md:w-fit border border-green-900'
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save
                    </button>
                </div>

                {/* Passwords Section */}
                <div className='Passwords flex flex-col items-center w-full mt-6'>
                    <h2 className='text-lg md:text-xl font-bold py-3'>Your Passwords</h2>

                    {passwordArray.length === 0 &&
                        <div className="text-gray-600">No Passwords to Show</div>}

                    {/* Table for larger screens */}
                    {passwordArray.length !== 0 &&
                        <div className="hidden md:block overflow-x-auto w-full">
                            <table className="table-auto w-full rounded-md overflow-hidden min-w-[600px]">
                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th className='py-2 px-2'>Site</th>
                                        <th className='py-2 px-2'>Username</th>
                                        <th className='py-2 px-2'>Password</th>
                                        <th className='py-2 px-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-2 border border-white text-center break-words'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <a
                                                        href={item.site}
                                                        target='_blank'
                                                        rel="noopener noreferrer"
                                                        className="truncate max-w-[120px] md:max-w-none"
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <span className="truncate max-w-[120px] md:max-w-none">{item.username}</span>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-2 border border-white text-center flex justify-center gap-2'>
                                                <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: "22px", height: "22px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "22px", height: "22px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}

                    {/* Card view for mobile */}
                    {passwordArray.length !== 0 &&
                        <div className="grid gap-4 w-full md:hidden">
                            {passwordArray.map((item, index) => (
                                <div key={index} className="bg-green-100 rounded-lg p-4 shadow border border-green-300">
                                    <div className="flex justify-between items-center">
                                        <a href={item.site} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 break-all">{item.site}</a>
                                        <div className="cursor-pointer" onClick={() => copyText(item.site)}>
                                            <lord-icon
                                                style={{ width: "20px", height: "20px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span>{item.username}</span>
                                        <div className="cursor-pointer" onClick={() => copyText(item.username)}>
                                            <lord-icon
                                                style={{ width: "20px", height: "20px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span>{"*".repeat(item.password.length)}</span>
                                        <div className="cursor-pointer" onClick={() => copyText(item.password)}>
                                            <lord-icon
                                                style={{ width: "20px", height: "20px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-3">
                                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ width: "22px", height: "22px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ width: "22px", height: "22px" }}>
                                            </lord-icon>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Manager
