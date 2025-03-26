import './index.css';
export default function EmptyItems() {
  return (
    <div className={'w-full flex justify-center items-center top-[-100px]'}>
      <div className="loader_empty">
        <span></span>
      </div>
    </div>
  );
}
