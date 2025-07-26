import Scrim from "@/components/Scrim";
import { useOptionsStore } from "@/stores/useOptionsStore";

const DropdownOptions = () => {
  const { options, setOptions } = useOptionsStore();

  if (!options) return null;
  return (
    <Scrim
      opacity={0}
      onClick={() => {
        setOptions(null);
      }}
    >
      <ul>
        {options.list.map((option) => (
          <li
            key={option.value}
            onClick={() => {
              options.callback(option.value);
              setOptions(null);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </Scrim>
  );
};

export default DropdownOptions;
