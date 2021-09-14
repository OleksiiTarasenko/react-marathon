import cn from "classnames";

import style from "./style.module.css";

const Layout = ({ title, urlBg, colorBg, children }) => {
  const layoutStyle = {
    backgroundImage: urlBg ? `url(${urlBg})` : `none`,
    backgroundColor: colorBg ? `${colorBg}` : `none`,
  };
  return (
    <section style={layoutStyle} className={style.root}>
      <div className={style.wrapper}>
        <article>
          <div className={style.title}>
            <h3>{title}</h3>
            <span className={style.separator}></span>
          </div>
          <div className={cn(style.desc, style.full)}>{children}</div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
