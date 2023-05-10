import PageButton from "components/buttons/PageButton";

interface PagenationProps {
  current: number;
  total: number;
  onSelect: () => void;
}

const Pagenation: React.FC<PagenationProps> = ({ total, current }) => {
  return (
    <div className="w-full flex justify-around">
      <div className="flex items-center gap-[7px]">
        <PageButton value="<" onClick={() => {}} />
        <PageButton value="2" onClick={() => {}} />
        <PageButton value="3" onClick={() => {}} />
        <PageButton value="..." onClick={() => {}} variant={true} />
        <PageButton value="5" onClick={() => {}} />
        <PageButton value=">" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Pagenation;
