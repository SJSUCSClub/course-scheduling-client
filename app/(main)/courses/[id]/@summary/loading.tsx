import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/button';
import { SectionLabelBox } from '@/components/section-label';
import { InfoCardBox } from '@/components/info-card';
import { TagBox } from '@/components/tag';
import clsx from 'clsx';

export default function Loading() {
    return <main className="flex flex-col gap-[10px] pb-[10px] opacity-30">
        {/** Breadcrumbs placeholder */}
        <SectionLabelBox className="mb-[10px] mt-[12px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />

        <div className="flex min-w-min gap-[10px] flex-col animate-pulse">
            {/**CourseSummary box */}
            <div
                className={clsx(
                    '-:flex -:flex-col -:rounded-lg -:bg-background -:text-text -:gap-[10px]',
                    "",
                )}
            >
                <div className="w-full flex flex-row justify-between items-start">
                    <SectionLabelBox className='h-[41px] w-[150px] flex-initial rounded-md bg-neutral p-0' />

                    <SectionLabelBox className="h-[40px] w-[111px] flex-initial rounded-md bg-neutral p-0" />
                </div>

                {/** reviews/stars */}
                <div className="flex items-center h-[22px] gap-[10px] text-primary">
                    <SectionLabelBox className='h-[22px] w-[250px] flex-initial rounded-md bg-neutral p-0' />
                </div>

                {/**Units */}
                <SectionLabelBox className='h-[15px] w-[75px] flex-initial rounded-md bg-neutral p-0' />


                {/** Full description of class */}
                <div className="py-[10px]">
                    <SectionLabelBox className='h-[44px] w-[600px] flex-initial rounded-md bg-neutral p-0' />
                </div>

                {/** Prereqs and Satisfies */}
                <div className="flex gap-[10px] items-center">
                    <SectionLabelBox className='h-[35px] w-[78px] flex-initial rounded-md bg-neutral p-0' />
                    {Array.from({ length: 5 }, (_, i) => (
                        <TagBox key={i} disabled className="h-[40px] w-[100px]" />
                    ))}
                </div>
                <div className="flex gap-[10px] items-center">
                    <SectionLabelBox className='h-[35px] w-[52px] flex-initial rounded-md bg-neutral p-0' />
                    {Array.from({ length: 2 }, (_, i) => (
                        <TagBox key={i} disabled className="h-[40px] w-[100px]" />
                    ))}
                </div>
            </div>

            <div className="flex gap-[10px] max-lg:flex-col animate-pulse">
                <InfoCardBox className="h-[125px] w-[345px] flex-initial max-lg:flex-1" />
                <InfoCardBox className="h-[125px] w-[345px] flex-initial max-lg:flex-1" />
                <InfoCardBox className="h-[125px] w-[345px] flex-initial max-lg:flex-1" />
            </div>
        </div>

        {/** Tags */}
        <div className="flex min-w-min flex-wrap justify-center gap-[10px]">
            {Array.from({ length: 15 }, (_, i) => (
                <TagBox key={i} disabled className="h-[40px] w-[100px]" />
            ))}
        </div>
        <div className="flex min-w-min flex-wrap justify-center gap-[10px] pt-[10px] text-button">
            <Button
                loading
                variant="secondary"
                postfix={<ArrowTopRightOnSquareIcon />}
            >
                Compare Course
            </Button>
        </div>

        {/**Graphs */}
        <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
        <div className="flex animate-pulse gap-[10px] max-lg:flex-col">
            <div className="flex min-h-[464px] flex-1 flex-col rounded-lg bg-border px-[32px] py-[20px] default-border">
                <div className="flex h-[50px] items-end justify-between">
                    <div className="flex h-[50px] items-center">
                        <SectionLabelBox className="h-[20px] w-[80px] flex-initial rounded-sm bg-neutral p-0" />
                    </div>
                </div>
                <div className="flex flex-1 items-end gap-[20px] p-[32px]">
                    <SectionLabelBox className="h-[120px] flex-1 rounded-md bg-neutral p-0" />
                    <SectionLabelBox className="h-[200px] flex-1 rounded-md bg-neutral p-0" />
                    <SectionLabelBox className="h-[180px] flex-1 rounded-md bg-neutral p-0" />
                    <SectionLabelBox className="h-[240px] flex-1 rounded-md bg-neutral p-0" />
                    <SectionLabelBox className="h-[160px] flex-1 rounded-md bg-neutral p-0" />
                </div>
            </div>
            <div className="flex min-h-[464px] flex-1 flex-col rounded-lg bg-border px-[32px] py-[20px] default-border">
                <div className="flex h-[50px] items-center">
                    <SectionLabelBox className="h-[20px] w-[80px] flex-initial rounded-sm bg-neutral p-0" />
                </div>
                <div className="flex flex-1 items-center justify-center text-neutral">
                    <svg width="350px" height="250px" viewBox="0 0 320 230">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={10}
                            strokeLinecap="round"
                            xmlns="http://www.w3.org/2000/svg"
                            d="M10,110 C25,10 135,10 160,110 S285,210 310,110"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </main >

}
