import { reactive } from "vue";
import { Modifier } from "./modifiers";

export class GlobalModifiers {
  static globals = [
    reactive(new Modifier(1.05, "Purchase Multiplier")),
    reactive(new Modifier(1, " qBit Discount")),
    reactive(new Modifier(0, " StabilityFlat")),
    reactive(new Modifier(1, " Max qBit Multiplier")),
  ];
}
