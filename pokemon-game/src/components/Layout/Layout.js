import style from "./style.module.css";
const Layout = ({ title, descr, urlBg, colorBg }) => {
 /*  const bg = urlBg ? `url(${urlBg})` : `${colorBg}`; */
  
  const layoutStyle = {
    backgroundImage: urlBg?`url(${urlBg})`: `none`,
    backgroundColor: colorBg?`${colorBg}`: `none`,
  };
  return (
    <section style={layoutStyle} className={style.root}>
      <div className={style.wrapper}>
        <article>
          <div className={style.title}>
            <h3>{title}</h3>
            <span className={style.separator}></span>
          </div>
          <div className={style.desc.full}>
            <p>{descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
