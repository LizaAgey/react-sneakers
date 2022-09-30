import React from "react";
import styles from "./EmptyContentScreem.module.scss"


const EmptyContentScreen = ({image, title, text}) => {
return (
    <div className={'d-flex align-center justify-between flex-column mt-45 mb-45'}>
        <img className={styles.emojiImg} src={image} alt="emoji"/>
        <h3 className={'m-5'}>{title}</h3>
        <p className={styles.emptyParagraph}>{text}</p>
    </div>
)

}

export default EmptyContentScreen