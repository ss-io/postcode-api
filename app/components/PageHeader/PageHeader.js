import style from './PageHeader.module.scss';

export default function PageHeader(props) {
    return (
        <header className={style.page_header_wrapper}>
            <div className={style.page_header}>
                <h1>{ props.title }</h1>
            </div>
        </header>
    )
}

