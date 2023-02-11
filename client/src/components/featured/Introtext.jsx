import React from "react"
import poolicon from '../../photo/poolicon.png'
import rating from '../../photo/rating.png'
import callcenter from '../../photo/call-center.png'
import team from '../../photo/team.png'
const Introtext = () => {
    return (
        <div className="container mx-auto mt-32">
            <div className="lg:flex justify-between gap-2">
                <div className="flex my-2 bg-white shadow-lg rounded-md p-5">
                    <img src={poolicon} className="object-scale-down w-32" alt="poolicon" />
                    <div className="flex-col mx-4 my-auto">
                        <p className="xl:text-4xl font-bold">50+</p>
                        <p className="xl:text-xl text-gray-500">บ้านพักพูลวิลล่า</p>
                    </div>
                </div>
                <div className="flex my-2 bg-white rounded-md  shadow-lg p-5">
                <img src={callcenter} className="object-scale-down w-32" alt="poolicon" />
                    <div className="flex-col mx-4 my-auto">
                        <p className="xl:text-4xl font-bold">10 ปี</p>
                        <p className=" xl:text-xl text-gray-500">ประสบการณ์ในการบริการ</p>
                    </div>
                </div>
                <div className="flex my-2 bg-white shadow-lg rounded-md  p-5">
                <img src={rating} className="object-scale-down w-32" alt="poolicon" />
                    <div className="flex-col mx-4 my-auto">
                        <p className="xl:text-4xl font-bold">2,010 ท่าน</p>
                        <p className="text-gray-500 xl:text-xl">จำนวนผู้ใช้บริการ</p>
                    </div>
                </div>
                <div className="flex my-2 bg-white shadow-lg rounded-md  p-5">
                <img src={team} className="object-scale-down w-32" alt="poolicon" />
                    <div className="flex-col mx-4 my-auto">
                        <p className="xl:text-4xl font-bold">38 คน</p>
                        <p className="text-gray-500 xl:text-xl">ทีมงานพร้อมให้บริการ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introtext 