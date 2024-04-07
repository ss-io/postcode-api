import style from "./page.module.css";
import PageHeader from "./components/PageHeader/PageHeader";
import PageFooter from "./components/PageFooter/PageFooter";
import PostcodeWidget from "./components/PostcodeWidget/PostcodeWidget";

export default function Home() {
  return (
    <div className={style.page_wrapper}>
      <main>
        <PageHeader title="Postcode App" />
        <PostcodeWidget />
        <PageFooter />
      </main>
    </div>
  );
}
