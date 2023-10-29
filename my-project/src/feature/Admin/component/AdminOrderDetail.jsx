import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allOrdersAsync, allOrdersInfos, updateOrderAsync, deleteOrderAsync } from '../../Orders/OrderSlice';
import { AiFillEye } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

const AdminOrderDetail = () => {


    const ordersInfo = useSelector(allOrdersInfos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allOrdersAsync());
    }, [dispatch])

    const [status, setStatus] = useState(-1);

    const handleEditAdminOrder = (id) => {
        setStatus(id)
    }


    const chooseColor = (status) => {

        switch (status) {
            case 'pending':
                return 'text-orange-500'
            case 'cancel':
                return 'text-red-500'
            case 'complete':
                return 'text-green-500'
            default:
                return 'text-black';
        }
    }

    const handleStatus = (e, item) => {
        console.log(e.target.value)
        console.log(item)

        const updateItems = { ...item }
        updateItems.status = e.target.value
        dispatch(updateOrderAsync(updateItems))
        dispatch(allOrdersAsync());

        setStatus(-1)
    }

   



    const handleDeleteAdminOrder = (id) => {
        dispatch(deleteOrderAsync(id))
        dispatch(allOrdersAsync());

        console.log(id)
    }


    return (
        <div><>
            {/* component */}
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
            />
            <link
                rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
            />
            {!!ordersInfo && <section className="relative py-16 bg-blueGray-50">
                {ordersInfo?.map((item) => {
                    return <div className="w-full mb-12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
            bg-white text-black"
                        >
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                        <h3 className="font-semibold text-lg text-black">Card Tables</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto ">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                #
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Budget
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Status
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Images
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Address
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left" >Actions</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                {item.id}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                ${item.totalPrice}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                <i className={`fas fa-circle ${chooseColor(item.status)}  mr-2`} />
                                                {status === item.id ?
                                                    <select onChange={(e) => handleStatus(e, item)}>
                                                        <option value="status" > Set Status </option>
                                                        <option value="complete">complete</option>
                                                        <option value="cancel">cancel</option>
                                                        <option value="pending">pending</option>
                                                    </select>
                                                    :
                                                    item.status
                                                }
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex">
                                                    {item?.products?.map((img) => {

                                                        return <img
                                                            src={img.thumbnail}
                                                            alt="..."
                                                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                                        />




                                                    })}


                                                </div>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <div className="relative w-full">
                                                        {item?.address?.streatAddress} - {item?.address?.city} -{item?.address?.country}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right flex ">
                                                <AiFillEye size={20} />
                                                <FiEdit size={20} className='ms-1 cursor-pointer' onClick={() => handleEditAdminOrder(item.id)} />
                                                <AiFillDelete size={20} className='ms-1 cursor-pointer' onClick={() => handleDeleteAdminOrder(item.id)} />
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                })}

            </section>}
        </>

        </div>
    )
}

export default AdminOrderDetail