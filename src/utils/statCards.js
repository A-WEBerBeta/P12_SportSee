import CaloriesIcon from "../assets/calories-icon.svg";
import CarbsIcon from "../assets/carbs-icon.svg";
import FatIcon from "../assets/fat-icon.svg";
import ProteinIcon from "../assets/protein-icon.svg";

/**
 * Transforme l'objet 'keyData' (API/Mocks) en 4 items prêts pour <StatCard />/
 *
 * @param {{calorieCount: number, proteinCount: number, carbohydrateCount: number, lipidCount: number}} keyData
 * @returns {Array<{ icon: string, label: string, value: number, unit: string}>}
 */

export function makeStatItems(keyData) {
  return [
    {
      icon: CaloriesIcon,
      label: "Calories",
      value: keyData.calorieCount,
      unit: "kCal",
    },
    {
      icon: ProteinIcon,
      label: "Protéines",
      value: keyData.proteinCount,
      unit: "g",
    },
    {
      icon: CarbsIcon,
      label: "Glucides",
      value: keyData.carbohydrateCount,
      unit: "g",
    },
    {
      icon: FatIcon,
      label: "Lipides",
      value: keyData.lipidCount,
      unit: "g",
    },
  ];
}
