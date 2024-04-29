type Props = {
  type?: string;
  title: string;
  placeholder: string | number | Boolean | Date;
  state: number | string | Boolean | Date;
  setState: (value: number | string | Boolean | Date) => void;
};

const FormField = ({ type, title, placeholder, state, setState }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
      <input
        className="form_field-input"
        type={type || "text"}
        value={state.toString()}
        placeholder={placeholder.toString()}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default FormField;
