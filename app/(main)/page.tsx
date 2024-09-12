import Link from 'next/link';

import {
  BreadcrumbMenu,
  Btn,
  CheckboxInput,
  LinkBtn,
  Select,
  Tag,
  TextInput,
  Textarea,
} from '@/components/atoms';
import {
  FilterGroup,
  NavSearchBar,
  ParamSelect,
  SearchBar,
} from '@/components/molecules';

export default function Page() {
  return (
    <main>
      <div className="">
        <Btn variant="primary">Rate</Btn>
        <CheckboxInput />
        <LinkBtn variant="primary" href="/professors">
          Back to Professors
          <span>test</span>
        </LinkBtn>
        <Select>
          <option value="quality">Qualityweoinfweifowoinfwe</option>
          <option value="ease">Ease</option>
          <option value="overall">Overall</option>
        </Select>
        <Tag type="button">test</Tag>
        <TextInput placeholder="test" />
        <Textarea placeholder="test" />
        <SearchBar param="test" />
        <ParamSelect param="sort">
          <option value="quality">Quality</option>
          <option value="ease">Ease</option>
          <option value="overall">Overall</option>
        </ParamSelect>
        <NavSearchBar />
        <Tag type="radio" name="answer" value="one" defaultChecked>
          one
        </Tag>
        <Tag type="radio" name="answer" value="two">
          two
        </Tag>
        <Tag type="radio" name="answer" value="three">
          three
        </Tag>
        <Tag type="radio" name="answer" value="four">
          four
        </Tag>
        <FilterGroup
          variant="checkbox"
          values={['one', 'two', 'three', 'four']}
          shouldResetPageOnChange={false}
        />
        <BreadcrumbMenu>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/professors">Professors</Link>
          </li>
          <li>test</li>
        </BreadcrumbMenu>
      </div>
    </main>
  );
}
