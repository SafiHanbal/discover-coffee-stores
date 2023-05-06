import styles from './card.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

const Card = ({ name, imgUrl, href }) => {
  return (
    <Link className={styles.cardLink} href={href}>
      <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt={`${name} image`}
            width={260}
            height={200}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
