
import Button, { ButtonBox, ButtonBoxProvider } from '@/components/button';
import { InfoCardBox } from '@/components/info-card';
import { RatingSummaryBox } from '@/components/rating-summary';
import { SectionLabelBox } from '@/components/section-label';
import { TagBox } from '@/components/tag';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <main className="flex flex-col gap-[10px] pb-[10px] opacity-30">
      <SectionLabelBox className="mb-[10px] mt-[12px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
      <div className="flex min-w-min animate-pulse gap-[10px] max-lg:flex-col">
        <RatingSummaryBox className="flex-1 bg-border">
          <div className="flex flex-1 lg:hidden" />
          <div className="min-w-[100px] flex-1 max-lg:hidden">
            <SectionLabelBox className="h-[20px] w-[80px] flex-initial rounded-sm bg-neutral p-0" />
          </div>
          <div className="flex h-full flex-auto flex-col items-center justify-center gap-[10px]">
            <SectionLabelBox className="h-[32px] w-[300px] flex-initial rounded-sm bg-neutral p-0" />
            <SectionLabelBox className="h-[68px] w-[100px] flex-initial rounded-sm bg-neutral p-0" />
            <SectionLabelBox className="h-[48px] w-[300px] flex-initial rounded-sm bg-neutral p-0" />
          </div>
          <div className="flex flex-1 justify-end gap-[5px] max-lg:hidden">
            <ButtonBoxProvider disabled variant={<EnvelopeIcon />}>
              <ButtonBox className="text-neutral" />
            </ButtonBoxProvider>
            <ButtonBoxProvider disabled variant={<ShareIcon />}>
              <ButtonBox className="text-neutral" />
            </ButtonBoxProvider>
            <ButtonBoxProvider disabled variant={<BookmarkIcon />}>
              <ButtonBox className="text-neutral" />
            </ButtonBoxProvider>
          </div>
          <div className="relative flex flex-1 items-start justify-end gap-[5px] lg:hidden">
            <ButtonBoxProvider disabled variant={<EllipsisVerticalIcon />}>
              <ButtonBox className="text-neutral" />
            </ButtonBoxProvider>
          </div>
        </RatingSummaryBox>
        <div className="flex gap-[10px] lg:flex-col">
          <InfoCardBox className="h-[130px] w-[265px] flex-initial max-lg:flex-1" />
          <InfoCardBox className="h-[130px] w-[265px] flex-initial max-lg:flex-1" />
        </div>
      </div>

      <div className="flex min-w-min animate-pulse flex-wrap justify-center gap-[10px]">
        {Array.from({ length: 15 }, (_, i) => (
          <TagBox key={i} disabled className="h-[40px] w-[100px]" />
        ))}
      </div>

      <div className="flex min-w-min animate-pulse flex-wrap justify-center gap-[10px] pt-[10px] text-button">
        <Button loading variant="primary" postfix={<ChevronRightIcon />}>
          Rate
        </Button>
        <Button
          loading
          variant="secondary"
          postfix={<ArrowTopRightOnSquareIcon />}
        >
          Compare Professor
        </Button>
      </div>

      <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
      <div className="flex animate-pulse gap-[10px] max-lg:flex-col">
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg bg-border px-[32px] py-[20px] default-border">
          <div className="flex h-[50px] items-end justify-between">
            <div className="flex h-[50px] items-center">
              <SectionLabelBox className="h-[20px] w-[80px] flex-initial rounded-sm bg-neutral p-0" />
            </div>
            <SectionLabelBox className="h-[40px] w-[111px] flex-initial rounded-md bg-neutral p-0" />
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
    </main>
  );
}
