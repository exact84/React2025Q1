import styles from './Search.module.css';

interface Props {
  onSearch: (queryString: string) => void;
  searchQuery: string;
}

export default function Search(props: Props) {
  function checkData(event: React.ChangeEvent<HTMLInputElement>) {
    props.onSearch(event.target.value);
  }

  return (
    <>
      <section className={styles.top}>
        <input
          type="text"
          value={props.searchQuery}
          onChange={checkData}
          placeholder="Enter request..."
        ></input>
      </section>
    </>
  );
}
