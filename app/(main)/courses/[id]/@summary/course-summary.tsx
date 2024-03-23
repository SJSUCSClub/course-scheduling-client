import React from "react";
import Stars from "star-power";

import ChangeTypeDropdown from "@/app/(main)/professors/[id]/@summary/change-type-dropdown";
import Icon from "@/components/icon";
import Tag from "@/components/tag";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";

interface CourseSummaryProps {
    courseNumber: string
    name: string,
    rating: number,
    totalReviews: number,
    department: string,
    units: number,
    description: string,
    prequisites: string[],
    satisfies: string[],

}

export const CourseSummary: React.FC<CourseSummaryProps> = ({ satisfies, prequisites, description, units, department, courseNumber, name, rating, totalReviews }) => {
    return <div className="flex flex-col rounded-lg bg-background text-text gap-[10px]">
        <div className="w-full flex flex-row justify-between items-start gap-[20px]">
            <div className="flex flex-col justify-start gap-[3px]">
                <h1 className="text-title">{department}{courseNumber}</h1>
                <p className="text-neutral text-heading">
                    {name}
                </p>
            </div>

            <ChangeTypeDropdown />
        </div>

        <div className="flex items-center h-[22px] gap-[10px] text-primary">
            <p className="text-heading">{rating}</p>
            <div className="w-[130px] h-[22px]">
                <Stars rating={rating} />
            </div>
            <p className="text-caption">{totalReviews} reviews</p>
        </div>

        <div className="flex gap-[5px] items-center text-neutral text-caption">
            <Icon icon={<Square3Stack3DIcon />} h="15px" w="15px" />
            <p>Units: {units}</p>
        </div>

        <p className="text-body py-[10px]">
            {description}
        </p>

        <div className="flex gap-[10px] items-center">
            <p className="text-caption">Prequisites:</p>
            {prequisites.map((value, index) => <Tag key={index} size="sm">{value}</Tag>)}
        </div>
        <div className="flex gap-[10px] items-center">
            <p className="text-caption">Satisfies:</p>
            {satisfies.map((value, index) => <Tag key={index} size="sm">{value}</Tag>)}
        </div>

    </div>
}