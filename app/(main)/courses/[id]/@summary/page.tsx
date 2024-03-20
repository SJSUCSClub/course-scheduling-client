"use client"
import BarChart from "@/components/bar-chart";
import { BreadcrumbBox, BreadcrumbBoxProvider } from "@/components/breadcrumb";
import Button from "@/components/button";
import InfoCard from "@/components/info-card";
import LineChart from "@/components/line-chart";
import SectionLabel from "@/components/section-label";
import Tag from "@/components/tag";
import getEvaluation from "@/utils/get-evaluation";
import { ArrowPathIcon, ArrowTopRightOnSquareIcon, CalendarIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { DistributionType } from "@/types/general";
import { CourseSummary } from "@/app/(main)/courses/[id]/@summary/course-summary";
import Loading from "@/app/(main)/courses/[id]/@summary/loading";

export default function Page({ params, searchParams }: { params: { id: string }, searchParams: { type: string } }) {
    const name = "Advanced Algorithm Design";
    const description = "Design and analysis of data structures and algorithms. Advanced tree structures, hashing, searching and sorting. Divide-and-conquer, greedy and dynamic programming algorithm design techniques.";
    const department = "CMPE";
    const course_number = "130"
    const totalReviews = 177;
    const units = 3;
    const type = searchParams.type || "overall"
    const rating = 2.5;
    const grade = "A-"
    const takeAgain = 86;
    const prereqs = ["CMPE126", "ISE 130 or MATH 161A"]
    const satisfies = ["Area G", "Area F"]
    const tags = ["Gives Good Feedback", "Accessible Outside Class", "Group Projects", "Caring", "Amazing lectures", "Clear grading criteria", "Inspirational", "Respectful", "Participation matters", "Lots of homework", "Test heavy", "Lecture heavy"]
    const gradeDistribution: DistributionType = [30, 20, 20, 20, 10]
    const qualityDistribution: DistributionType = [30, 10, 48, 7, 5]
    const easeDistribution: DistributionType = [10, 30, 48, 7, 5]
    const overallDistribution: DistributionType = [2, 48, 38, 7, 5]
    const totalSections: number = 5;
    const openSections: number = 3;

    return <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
        <Loading></Loading>
        <BreadcrumbBoxProvider name={department + course_number}>
            <BreadcrumbBox className="flex w-full min-w-min py-[10px]" />
        </BreadcrumbBoxProvider>
        <div className="flex min-w-min gap-[10px] flex-col">
            <CourseSummary satisfies={satisfies} prequisites={prereqs} description={description} department={department} course_number={course_number} name={name} rating={rating} totalReviews={totalReviews} units={units} />


            <div className="flex gap-[10px] max-lg:flex-col">
                <InfoCard
                    type="default"
                    icon={<CalendarIcon />}
                    title={`${openSections}/${totalSections}`}
                    subtitle="Sections Open"
                />
                <InfoCard
                    type={grade ? getEvaluation(grade, 'grade') : 'default'}
                    icon={<ClipboardDocumentListIcon />}
                    title={grade ?? '-'}
                    subtitle="Average Grade"
                />
                <InfoCard
                    type={getEvaluation(takeAgain, 'percentage')}
                    icon={<ArrowPathIcon />}
                    title={`${takeAgain}%`}
                    subtitle="Would Take Again"
                />
            </div>
        </div>

        <div className="flex min-w-min flex-wrap justify-center gap-[10px]">
            {tags.map((tag) => (
                <Tag key={tag} size="lg">
                    {tag}
                </Tag>
            ))}
        </div>

        <div className="flex min-w-min flex-wrap justify-center gap-[10px] pt-[10px] text-button">
            <Button variant="secondary" postfix={<ArrowTopRightOnSquareIcon />}>
                Compare Course
            </Button>
        </div>

        <SectionLabel info="Statistics">Statistics</SectionLabel>
        <div className="flex gap-[10px] max-lg:flex-col">
            <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
                <h3 className="flex h-[50px] items-center text-heading">
                    Rating Distribution
                </h3>
                <div className="flex-1">
                    <BarChart
                        chartData={
                            type === 'quality'
                                ? qualityDistribution
                                : type === 'ease'
                                    ? easeDistribution
                                    : overallDistribution
                        }
                    />
                </div>
            </div>
            <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
                <h3 className="flex h-[50px] items-center text-heading">
                    Grading Distribution
                </h3>
                <div className="flex-1">
                    <LineChart chartData={gradeDistribution} />
                </div>
            </div>
        </div>
    </main>
}