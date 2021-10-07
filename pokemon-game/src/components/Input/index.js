
import s from './style.module.css'
const Input = ({value, label, type = "text", name, onChange, required}) => {
  
  return (
    <div className={s.root}>
    <input onChange = {onChange} type={type} value = {value} className={s.input} {...required}/>
    <span className={s.highlight}></span>
    <span className={s.bar}></span>
    <label name = {name} className={s.label}>{label}</label>
  </div>
  );
};

export default Input;
