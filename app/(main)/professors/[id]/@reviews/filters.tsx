import { TagCheckbox, TagCheckboxGroup } from '@/components/forms/tag-checkbox';
import { ProfessorReviewsRouteResponse } from '@/utils/types';
import SectionLabel from '@/components/section-label';

interface FiltersProps {
  handleSetFilters: (
    type: 'tags' | 'courses' | 'sort',
  ) => (value: string[] | string) => void;
  loading: boolean;
  paginatedItems: ProfessorReviewsRouteResponse | null;
}

const Filters: React.FC<FiltersProps> = ({
  handleSetFilters,
  loading,
  paginatedItems,
}) => (
  <>
    <SectionLabel>Filters</SectionLabel>
    <TagCheckboxGroup
      onChange={handleSetFilters('tags')}
      label="Tags"
      disabled={loading}
    >
      {paginatedItems?.filters.tags.map((tag) => (
        <TagCheckbox key={tag.tag} value={tag.tag} count={tag.count}>
          {tag.tag}
        </TagCheckbox>
      ))}
    </TagCheckboxGroup>
    <TagCheckboxGroup
      onChange={handleSetFilters('courses')}
      label="Courses"
      disabled={loading}
    >
      {paginatedItems?.filters.courses.map((tag) => (
        <TagCheckbox key={tag.course} value={tag.course} count={tag.count}>
          {tag.course}
        </TagCheckbox>
      ))}
    </TagCheckboxGroup>
  </>
);

export default Filters;
