import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

const fontAwesomeData = () => {
  let arraySelect = [];
  for (const key in fas) {
    if (arraySelect.find((el) => el.value === fas[key].iconName)) continue;
    arraySelect = [
      ...arraySelect,
      {
        value: fas[key].iconName,
        label: fas[key].iconName,
        prefix: fas[key].prefix,
      },
    ];
  }
  for (const key in fab) {
    if (arraySelect.find((el) => el.value === fab[key].iconName)) continue;
    arraySelect = [
      ...arraySelect,
      {
        value: fab[key].iconName,
        label: fab[key].iconName,
        prefix: fab[key].prefix,
      },
    ];
  }
  return arraySelect;
};

export default fontAwesomeData;
