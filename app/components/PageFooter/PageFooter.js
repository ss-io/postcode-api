import style from './PageFooter.module.scss';

export default function PageFooter() {
    return (
        <footer className={style.page_footer_wrapper}>
            <div className={style.page_footer}>
                Coding Challenge - Full-Stack (API)
            </div>
        </footer>
    )
}

