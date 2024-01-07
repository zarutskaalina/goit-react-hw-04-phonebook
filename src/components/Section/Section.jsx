import style from './Section.module.css';

export const Section = ({ title, children }) => {
  return (
    <section className={style.section}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};
