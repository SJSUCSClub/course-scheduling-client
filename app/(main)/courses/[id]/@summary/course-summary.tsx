import { ButtonBox, ButtonBoxProvider } from "@/components/button";
import { DropdownBox, DropdownBoxProvider } from "@/components/forms/dropdown";
import Icon from "@/components/icon";
import { Popover, PopoverBox, PopoverTrigger } from "@/components/popover";
import { ArchiveBoxIcon, RectangleStackIcon, ServerStackIcon, Square2StackIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import Stars from "star-power";
import Tag from "@/components/tag";
import ChangeTypeDropdown from "@/app/(main)/professors/[id]/@summary/change-type-dropdown";

interface CourseSummaryProps {
    course_number: string
    name: string,
    rating: number,
    totalReviews: number,
    department: string,
    units: number,
    description: string,
    prequisites: string[],
    satisfies: string[],

}

export const CourseSummary: React.FC<CourseSummaryProps> = ({ satisfies, prequisites, description, units, department, course_number, name, rating, totalReviews }) => {
    return <div
        className={clsx(
            '-:flex -:flex-col -:rounded-lg -:bg-background -:text-text -:gap-[10px]',
            "",
        )}
    >
        <div className="w-full flex flex-row justify-between items-start">
            <div className="flex flex-col justify-start">
                <h1 className="text-title">{department}{course_number}</h1>
                <p className="text-neutral text-heading">
                    {name}
                </p>
            </div>

            <ChangeTypeDropdown />
        </div>

        {/** TODO - In the future, this should only be h-22 */}
        <div className="flex items-center h-[50px] gap-[10px] text-[#fc9f1e]">
            <p className="text-heading">{rating}</p>
            <Stars rating={rating} />
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