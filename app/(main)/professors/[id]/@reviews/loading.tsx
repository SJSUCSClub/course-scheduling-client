import { ButtonBox } from '@/components/button';
import { DropdownBox } from '@/components/forms/dropdown';
import { TextInputBox } from '@/components/forms/text-input';
import { ReviewBox } from '@/components/review';
import { SectionLabelBox } from '@/components/section-label';
import { TagBox } from '@/components/tag';

export default function Loading() {
  return (
    <main className="flex items-stretch gap-[10px]">
      <div className="w-[250px] max-lg:hidden">
        <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
          <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
          <SectionLabelBox className="h-[40px] w-[230px] flex-initial animate-pulse rounded-md bg-border p-0" />
          <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
          <div className="flex min-w-min animate-pulse flex-wrap gap-[10px]">
            <TagBox disabled className="h-[20px] w-[50px]" />
            <TagBox disabled className="h-[20px] w-[60px]" />
            <TagBox disabled className="h-[20px] w-[70px]" />
            <TagBox disabled className="h-[20px] w-[70px]" />
            <TagBox disabled className="h-[20px] w-[60px]" />
          </div>
          <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
          <div className="flex min-w-min animate-pulse flex-wrap gap-[10px]">
            <TagBox disabled className="h-[20px] w-[60px]" />
            <TagBox disabled className="h-[20px] w-[70px]" />
            <TagBox disabled className="h-[20px] w-[50px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
        <div className="flex justify-between">
          <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
          <SectionLabelBox className="mt-[20px] h-[40px] w-[100px] flex-initial animate-pulse rounded-md bg-border p-0" />
        </div>
        <div className="flex gap-[10px]">
          <SectionLabelBox className="h-[80px] flex-1 animate-pulse rounded-md bg-border p-0" />
          <SectionLabelBox className="h-[80px] w-[60px] animate-pulse rounded-md bg-border p-0" />
        </div>
        {Array.from({ length: 4 }, (_, i) => (
          <ReviewBox key={i} className="h-[400px] border-0 bg-border" />
        ))}
      </div>
    </main>
  );
}
